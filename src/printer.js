"use strict";

const {
  concat,
  join,
  line,
  lineSuffix,
  lineSuffixBoundary,
  group,
  conditionalGroup,
  indent,
  dedent,
  ifBreak,
  hardline,
  softline
} = require("prettier").doc.builders;
const { willBreak } = require("prettier").doc.utils;
const { makeString, isNextLineEmpty } = require("prettier").util;
const comments = require("./comments");

const {
  getNodeListProperty,
  getLast,
  isControlStructureNode,
  isFirstNodeInParentProgramNode,
  isFirstNodeInParentNode,
  isPrevNodeInline,
  isNextNodeInline,
  isLastStatement,
  lineShouldHaveStartPHPTag,
  lineShouldEndWithSemicolon,
  lineShouldHaveEndPHPTag,
  printNumber,
  shouldFlatten,
  shouldRemoveLines,
  removeNewlines,
  maybeStripLeadingSlashFromUse,
  fileShouldEndWithHardline,
  hasDanglingComments,
  docShouldHaveTrailingNewline
} = require("./util");

function shouldPrintComma(options) {
  switch (options.trailingComma) {
    case "all":
      return true;
    // fallthrough
    case "none":
    default:
      return false;
  }
}

function genericPrint(path, options, print) {
  const node = path.getValue();
  if (!node) {
    return "";
  } else if (typeof node === "string") {
    return node;
  }
  const isProgramNode = node.kind === "program";
  if (isProgramNode && node.children.length === 0) {
    return concat([
      "<?php",
      hardline,
      comments.printDanglingComments(path, options, /* sameIndent */ true)
    ]);
  }
  const printed = printNode(path, options, print);
  if (node.kind === "inline") {
    const parentNode = path.getParentNode();
    return concat([
      parentNode &&
      parentNode.kind === "declare" &&
      parentNode.children.indexOf(node) === 0
        ? "?>"
        : "",
      printed
    ]);
  }
  if (node.kind === "block") {
    const nodeBody = getNodeListProperty(node);
    if (nodeBody.length !== 0) {
      return concat([
        nodeBody[0].kind === "inline" ? "?>" : "",
        printed,
        nodeBody[nodeBody.length - 1].kind === "inline" ? "<?php" : ""
      ]);
    }
  }
  return concat([
    lineShouldHaveStartPHPTag(path)
      ? concat([
          "<?php",
          isFirstNodeInParentProgramNode(path) ||
          (!isNextNodeInline(path) && !isControlStructureNode(node))
            ? hardline
            : " "
        ])
      : "",
    shouldRemoveLines(path) ? removeNewlines(printed) : printed,
    lineShouldEndWithSemicolon(path) ? ";" : "",
    lineShouldHaveEndPHPTag(path)
      ? concat([
          isFirstNodeInParentNode(path) || !isPrevNodeInline(path)
            ? hardline
            : " ",
          "?>"
        ])
      : ""
  ]);
}

// special layout for "chained" function calls, i.e.
// $foo = a()
//     ->b()
//     ->c();
function printMemberChain(path, options, print) {
  // First step: Linearize and reorder the AST.
  //
  // Example:
  //   a()->b->c()->d()
  // has the AST structure
  //   Call (PropertyLookup d (
  //     Call (PropertyLookup c (
  //       PropertyLookup b (
  //         Call (Identifier a)
  //       )
  //     ))
  //   ))
  // and we transform it into (notice the reversed order)
  //   [Identifier a, Call, PropertyLookup b, PropertyLookup c, Call,
  //    PropertyLookup d, Call]
  const printedNodes = [];

  function traverse(path) {
    const node = path.getValue();
    if (node.kind === "call") {
      printedNodes.unshift({
        node,
        printed: concat([printArgumentsList(path, options, print)])
      });
      path.call(what => traverse(what), "what");
    } else if (node.kind === "propertylookup") {
      printedNodes.unshift({
        node,
        printed: concat([
          "->",
          wrapPropertyLookup(node, path.call(print, "offset"))
        ])
      });
      path.call(what => traverse(what), "what");
    } else {
      printedNodes.unshift({
        node,
        printed: path.call(print)
      });
    }
  }
  traverse(path);

  // create groups from list of nodes, i.e.
  //   [Identifier a, Call, PropertyLookup b, PropertyLookup c, Call,
  //    PropertyLookup d, Call]
  // will be grouped as
  //   [
  //     [Identifier a, Call],
  //     [PropertyLookup b, PropertyLookup c, Call],
  //     [PropertyLookup d, Call]
  //   ]
  // so that we can print it as
  //   a()
  //     ->b->c()
  //     ->d()
  const groups = [];
  let currentGroup = [];
  let hasSeenCall = false;
  printedNodes.forEach(printedNode => {
    if (hasSeenCall && printedNode.node.kind === "propertylookup") {
      groups.push(currentGroup);
      currentGroup = [printedNode];
      hasSeenCall = false;
    } else {
      currentGroup.push(printedNode);
    }

    if (printedNode.node.kind === "call") {
      hasSeenCall = true;
    }
  });
  groups.push(currentGroup);

  function printGroup(printedGroup) {
    return concat(printedGroup.map(tuple => tuple.printed));
  }
  function printIndentedGroup(groups) {
    if (groups.length === 0) {
      return "";
    }
    return indent(
      group(concat([hardline, join(hardline, groups.map(printGroup))]))
    );
  }

  const printedGroups = groups.map(printGroup);
  if (groups.length <= 2) {
    return group(concat(printedGroups));
  }

  const expanded = concat([
    printGroup(groups[0]),
    printIndentedGroup(groups.slice(1))
  ]);
  return expanded;
}

function printArgumentsList(path, options, print, argumentsKey = "arguments") {
  const args = path.getValue()[argumentsKey];
  const printed = path
    .map(print, argumentsKey)
    .map(argument => group(argument));
  if (printed.length === 0) {
    return "()";
  }
  const breakingIndex = printed.findIndex(willBreak);
  const breakingInTheMiddle =
    printed.length > 2 &&
    breakingIndex !== 0 &&
    breakingIndex !== printed.length - 1;

  const shouldGroupLast = getLast(args).kind === "array";
  const shouldGroupFirst = !shouldGroupLast && args[0].kind === "array";
  const shortForm = concat(["(", join(", ", printed), ")"]);
  const mediumForm = shouldGroupFirst
    ? concat([
        "(",
        group(printed[0], { shouldBreak: true }),
        printed.length > 1 ? ", " : "",
        join(concat([",", line]), printed.slice(1)),
        ")"
      ])
    : concat([
        "(",
        join(concat([",", line]), printed.slice(0, -1)),
        printed.length > 1 ? ", " : "",
        group(getLast(printed), { shouldBreak: true }),
        ")"
      ]);
  const longForm = group(
    concat([
      "(",
      indent(concat([softline, join(concat([",", line]), printed)])),
      softline,
      ")"
    ])
  );
  const formsToConsider = [
    !breakingInTheMiddle ? shortForm : null,
    shouldGroupFirst || shouldGroupLast ? mediumForm : null,
    longForm
  ];
  return conditionalGroup(formsToConsider.filter(Boolean));
}

function wrapPropertyLookup(node, doc) {
  const addCurly =
    node.kind === "propertylookup" &&
    (node.offset.kind !== "constref" || typeof node.offset.name !== "string");

  return addCurly ? concat(["{", doc, "}"]) : doc;
}

function isPropertyLookupChain(node) {
  if (node.kind !== "propertylookup") {
    return false;
  }
  if (node.what.kind === "variable") {
    return true;
  }
  return isPropertyLookupChain(node.what);
}

// so this is a bit hacky, but for anonymous classes, there's a chance that an
// assumption core to prettier will break - that child nodes will not overlap. In
// this case, if we have something like this:
//   $test = new class($arg1, $arg2) extends TestClass {};
// we end up with a parent "new" node, which has children "arguments", and "what"
// the "what" is a "class" node, but it overlaps with the "arguments". To solve this,
// we use this variable to store off the printed arguments when the "new" node is printing,
// so that the "class" node can then access them later
let anonymousClassesNewArguments = null;

const expressionKinds = [
  "array",
  "variable",
  "constref",
  "yield",
  "yieldfrom",
  "variable",
  "propertylookup",
  "staticlookup",
  "offsetlookup",
  "pre",
  "post",
  "bin",
  "parenthesis",
  "unary",
  "cast",
  "boolean",
  "string",
  "number",
  "inline",
  "magic",
  "nowdoc",
  "encapsed",
  "variadic"
];
function printExpression(path, options, print) {
  const node = path.getValue();
  const lookupKinds = ["propertylookup", "staticlookup", "offsetlookup"];
  function printLookup(node) {
    switch (node.kind) {
      case "propertylookup": {
        const canBreak = path.stack.indexOf("left") === -1;
        return group(
          concat([
            path.call(print, "what"),
            "->",
            indent(
              concat([
                canBreak ? softline : "",
                wrapPropertyLookup(node, path.call(print, "offset"))
              ])
            )
          ])
        );
      }
      case "staticlookup":
        return concat([
          path.call(print, "what"),
          "::",
          path.call(print, "offset")
        ]);
      case "offsetlookup": {
        const isOffsetNumberNode = node.offset && node.offset.kind === "number";
        return group(
          concat([
            path.call(print, "what"),
            "[",
            node.offset
              ? group(
                  concat([
                    indent(
                      concat([
                        isOffsetNumberNode ? "" : softline,
                        path.call(print, "offset")
                      ])
                    ),
                    isOffsetNumberNode ? "" : softline
                  ])
                )
              : "",
            "]"
          ])
        );
      }
      default:
        return `Have not implemented lookup kind ${node.kind} yet.`;
    }
  }
  if (lookupKinds.includes(node.kind)) {
    return printLookup(node);
  }

  const operationKinds = ["pre", "post", "bin", "parenthesis", "unary", "cast"];
  function printOperation(node) {
    switch (node.kind) {
      case "pre":
        return concat([node.type + node.type, path.call(print, "what")]);
      case "post":
        return concat([path.call(print, "what"), node.type + node.type]);
      case "bin": {
        // general idea here is that we are continually checking nested
        // binary expressions to see if we should be starting a new group
        // or not (based on operator precedence)
        const printBinaryExpression = (
          path,
          print,
          options,
          isNested = false
        ) => {
          const node = path.getValue();
          if (node.kind !== "bin") {
            return path.call(print);
          }

          const shouldGroupLeft = !(
            node.left.kind === "bin" && shouldFlatten(node.type, node.left.type)
          );
          const printedLeft = path.call(
            left => printBinaryExpression(left, print, options, true),
            "left"
          );

          const shouldGroupRight = !(
            node.right.kind === "bin" &&
            shouldFlatten(node.type, node.right.type)
          );
          const printedRight = path.call(
            right => printBinaryExpression(right, print, options, true),
            "right"
          );

          const printedExpression = concat([
            shouldGroupLeft ? group(printedLeft) : printedLeft,
            " ",
            node.type,
            line,
            shouldGroupRight ? group(printedRight) : printedRight
          ]);
          return isNested ? printedExpression : group(printedExpression);
        };
        return printBinaryExpression(path, print, options);
      }
      case "parenthesis": {
        const parentNode = path.getParentNode();
        if (parentNode && parentNode.kind === "parenthesis") {
          return path.call(print, "inner");
        }
        const shouldPrintParenthesis =
          parentNode.kind !== "print" &&
          parentNode.kind !== "echo" &&
          parentNode.kind !== "include";
        const shouldBeInlined =
          node.inner.kind === "new" || node.inner.kind === "clone";
        const dangling = comments.printDanglingComments(path, options, true);
        const printedInner = concat([
          shouldBeInlined || !shouldPrintParenthesis ? "" : softline,
          dangling ? concat([dangling, hardline]) : "",
          path.call(print, "inner")
        ]);
        return group(
          concat([
            shouldPrintParenthesis ? "(" : "",
            shouldBeInlined ? printedInner : indent(printedInner),
            shouldPrintParenthesis
              ? concat([shouldBeInlined ? "" : softline, ")"])
              : ""
          ])
        );
      }
      case "unary":
        return concat([node.type, path.call(print, "what")]);
      case "cast":
        return concat(["(", node.type, ") ", path.call(print, "what")]);
      default:
        return `Have not implemented operation kind ${node.kind} yet.`;
    }
  }
  if (operationKinds.includes(node.kind)) {
    return printOperation(node);
  }

  const literalKinds = [
    "boolean",
    "string",
    "number",
    "inline",
    "magic",
    "nowdoc",
    "encapsed"
  ];
  function printLiteral(node) {
    function getEncapsedQuotes(node, { opening = true } = {}) {
      if (node.type === "heredoc") {
        return opening ? `<<<${node.label}` : node.label;
      }
      const quotes = {
        string: '"',
        shell: "`"
      };
      if (quotes[node.type]) {
        return quotes[node.type];
      }
      return `Unimplemented encapsed type ${node.type}`;
    }

    switch (node.kind) {
      case "boolean":
        return node.value ? "true" : "false";
      case "string": {
        // @TODO: for now just reusing double/single quote preference from doc. could eventually
        // use setting from options. need to figure out how this works w/ complex strings and interpolation
        // also need to figure out splitting long strings
        const quote = node.isDoubleQuote ? '"' : "'";
        let prefix = "";
        let stringValue = node.raw;
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/147
        if (stringValue[0] === "b") {
          prefix = "b";
          stringValue = stringValue.slice(1);
        }
        // we need to strip out the quotes from the raw value
        if (['"', "'"].includes(stringValue[0])) {
          stringValue = stringValue.substr(1);
        }
        if (['"', "'"].includes(stringValue[stringValue.length - 1])) {
          stringValue = stringValue.substr(0, stringValue.length - 1);
        }
        return concat([prefix, makeString(stringValue, quote, false)]);
      }
      case "number":
        return printNumber(node.value);
      case "encapsed":
        if (node.type === "offset") {
          return group(concat(path.map(print, "value")));
        }
        return concat([
          getEncapsedQuotes(node),
          // Respect `indent` for `heredoc` nodes
          node.type === "heredoc" ? "\n" : "",
          concat(
            path.map(valuePath => {
              const node = valuePath.getValue();
              if (node.kind === "string") {
                return node.raw;
              } else if (node.kind === "variable") {
                if (typeof node.name === "object") {
                  return concat(["${", path.call(print, "name"), "}"]);
                } else if (node.curly) {
                  return `{$${node.name}}`;
                }
                return print(valuePath);
              }
              return concat(["{", print(valuePath), "}"]);
            }, "value")
          ),
          getEncapsedQuotes(node, { opening: false }),
          node.type === "heredoc" && docShouldHaveTrailingNewline(path)
            ? hardline
            : ""
        ]);
      case "inline":
        return node.raw;
      case "magic":
        // for magic constant we prefer upper case
        return node.value.toUpperCase();
      case "nowdoc":
        // Respect `indent` for `nowdoc` nodes
        return concat([
          "<<<'",
          node.label,
          "'",
          "\n",
          node.value,
          "\n",
          node.label,
          docShouldHaveTrailingNewline(path) ? "\n" : ""
        ]);
      default:
        return `Have not implemented literal kind ${node.kind} yet.`;
    }
  }
  if (literalKinds.includes(node.kind)) {
    return printLiteral(node);
  }

  switch (node.kind) {
    case "variable":
      return concat([
        node.byref ? "&" : "",
        "$",
        node.curly ? "{" : "",
        path.call(print, "name"),
        node.curly ? "}" : ""
      ]);
    case "constref":
      if (typeof node.name === "object") {
        return path.call(print, "name");
      }
      return node.name;
    case "array": {
      const open = node.shortForm ? "[" : "array(";
      const close = node.shortForm ? "]" : ")";
      if (node.items.length === 0) {
        if (!hasDanglingComments(node)) {
          return concat([open, close]);
        }
        return group(
          concat([
            open,
            comments.printDanglingComments(path, options),
            softline,
            close
          ])
        );
      }
      return group(
        concat([
          open,
          indent(
            concat([
              softline,
              join(concat([",", line]), path.map(print, "items"))
            ])
          ),
          ifBreak(shouldPrintComma(options) ? "," : ""),
          comments.printDanglingComments(path, options, true),
          softline,
          close
        ])
      );
    }
    case "yield":
      return concat([
        "yield ",
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value")
      ]);
    case "yieldfrom":
      return concat(["yield from ", path.call(print, "value")]);
    case "variadic":
      return concat(["...", path.call(print, "what")]);
    default:
      return `Have not implemented expression kind ${node.kind} yet.`;
  }
}

const statementKinds = [
  "eval",
  "exit",
  "halt",
  "clone",
  "declare",
  "global",
  "static",
  "include",
  "assign",
  "retif",
  "if",
  "do",
  "while",
  "for",
  "foreach",
  "switch",
  "goto",
  "silent",
  "try",
  "catch",
  "throw",
  "call",
  "closure",
  "new",
  "usegroup",
  "useitem",
  "block",
  "program",
  "namespace",
  "echo",
  "list",
  "print",
  "isset",
  "unset",
  "empty",
  "declaration",
  "class",
  "interface",
  "trait",
  "constant",
  "classconstant",
  "function",
  "method",
  "parameter",
  "property"
];
function printLines(path, options, print, childrenAttribute = "children") {
  return concat(
    path.map(childPath => {
      const canPrintBlankLine =
        !isLastStatement(childPath) &&
        childPath.getValue().kind !== "inline" &&
        !isNextNodeInline(childPath);
      return concat([
        print(childPath),
        canPrintBlankLine ? hardline : "",
        canPrintBlankLine &&
        isNextLineEmpty(options.originalText, childPath.getValue(), options)
          ? hardline
          : ""
      ]);
    }, childrenAttribute)
  );
}
function printStatement(path, options, print) {
  const node = path.getValue();
  const blockKinds = ["block", "program", "namespace"];
  function printBlock(path, options, print) {
    switch (node.kind) {
      case "block":
        return concat([
          printLines(path, options, print),
          comments.printDanglingComments(path, options, true)
        ]);
      case "program": {
        return concat([
          printLines(path, options, print),
          fileShouldEndWithHardline(path) ? hardline : ""
        ]);
      }
      case "namespace": {
        const printed = printLines(path, options, print);
        const hasName = node.name && typeof node.name === "string";
        return concat([
          "namespace ",
          hasName ? node.name : "",
          node.withBrackets ? concat([" ", "{"]) : ";",
          // don't know why we need 2 line breaks here, but 1 doesn't work
          node.children.length > 0 && !node.withBrackets
            ? concat([hardline, hardline])
            : "",
          node.withBrackets ? indent(concat([hardline, printed])) : printed,
          node.withBrackets ? concat([hardline, "}"]) : ""
        ]);
      }
      default:
        return `Have not implemented block kind ${node.kind} yet.`;
    }
  }
  if (blockKinds.includes(node.kind)) {
    return printBlock(path, options, print);
  }

  const sysKinds = ["echo", "list", "print", "isset", "unset", "empty"];
  function printSys(node) {
    switch (node.kind) {
      case "echo": {
        const printedArguments = path.map(argumentPath => {
          const node = argumentPath.getValue();
          return node.kind === "bin"
            ? print(argumentPath)
            : dedent(print(argumentPath));
        }, "arguments");
        return indent(
          group(
            concat([
              "echo ",
              group(join(concat([",", line]), printedArguments))
            ])
          )
        );
      }
      case "print": {
        const printedArguments = path.call(print, "arguments");
        return concat([
          "print ",
          node.arguments.kind === "bin"
            ? indent(printedArguments)
            : printedArguments
        ]);
      }
      case "list":
      case "isset":
      case "unset":
      case "empty":
        return group(
          concat([
            node.kind,
            "(",
            indent(
              concat([
                softline,
                join(concat([",", line]), path.map(print, "arguments"))
              ])
            ),
            softline,
            ")"
          ])
        );
      default:
        return `Have not implemented sys kind ${node.kind} yet.`;
    }
  }
  if (sysKinds.includes(node.kind)) {
    return printSys(node);
  }

  const declarationKinds = [
    "class",
    "interface",
    "trait",
    "constant",
    "classconstant",
    "function",
    "method",
    "parameter",
    "property"
  ];
  function printDeclaration(node) {
    function printDeclarationBlock({
      declaration,
      argumentsList = [],
      returnTypeContents = "",
      bodyContents = ""
    }) {
      const isClassLikeNode = ["class", "interface", "trait"].includes(
        node.kind
      );
      const printedDeclaration = group(declaration);
      const printedSignature = !isClassLikeNode
        ? group(
            concat([
              "(",
              argumentsList.length
                ? concat([
                    indent(
                      concat([
                        softline,
                        join(concat([",", line]), argumentsList)
                      ])
                    ),
                    softline
                  ])
                : "",
              ")",
              returnTypeContents ? concat([": ", returnTypeContents]) : ""
            ])
          )
        : "";
      const printedBody = bodyContents
        ? concat([
            "{",
            indent(concat([hardline, bodyContents])),
            comments.printDanglingComments(path, options, true),
            hardline,
            "}"
          ])
        : "";
      return concat([
        group(
          concat([
            printedDeclaration,
            printedSignature,
            // see https://github.com/prettier/plugin-php/issues/107
            // options.openingBraceNewLine ? hardline : " ",
            // Hack, we need `invertLine` command here, as `line`, but have versa vice logic
            bodyContents
              ? node.kind === "function" || node.kind === "method"
                ? ifBreak(" ", concat([lineSuffix(""), lineSuffixBoundary]))
                : hardline
              : ""
          ])
        ),
        printedBody
      ]);
    }

    switch (node.kind) {
      case "class": {
        const classPrefixes = [
          ...(node.isFinal ? ["final"] : []),
          ...(node.isAbstract ? ["abstract"] : [])
        ];
        const parentNode = path.getParentNode();
        // if this is an anonymous class, we need to check if the parent was a
        // "new" node. if it was, we need to get the arguments from that node
        // ex: $test = new class($arg1, $arg2) extends TestClass {};
        const anonymousArguments =
          node.isAnonymous &&
          parentNode.kind === "new" &&
          parentNode.arguments.length > 0
            ? anonymousClassesNewArguments
            : "";
        return printDeclarationBlock({
          declaration: concat([
            classPrefixes.join(" "),
            classPrefixes.length > 0 ? " " : "",
            concat([
              "class",
              anonymousArguments,
              node.name ? concat([" ", node.name]) : ""
            ]),
            group(
              indent(
                concat([
                  node.extends
                    ? group(
                        concat([line, "extends ", path.call(print, "extends")])
                      )
                    : "",
                  line,
                  node.implements
                    ? concat([
                        "implements",
                        group(
                          indent(
                            concat([
                              line,
                              join(
                                concat([",", line]),
                                path.map(print, "implements")
                              )
                            ])
                          )
                        )
                      ])
                    : ""
                ])
              )
            )
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      }
      case "function":
        return printDeclarationBlock({
          declaration: concat(["function ", node.byref ? "&" : "", node.name]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([node.nullable ? "?" : "", path.call(print, "type")])
            : "",
          bodyContents: node.body ? path.call(print, "body") : ""
        });
      case "method": {
        const methodPrefixes = [
          ...(node.isFinal ? ["final"] : []),
          ...(node.isAbstract ? ["abstract"] : []),
          ...(node.visibility ? [node.visibility] : []),
          ...(node.isStatic ? ["static"] : [])
        ];
        return printDeclarationBlock({
          declaration: concat([
            methodPrefixes.join(" "),
            methodPrefixes.length > 0 ? " " : "",
            "function ",
            node.byref ? "&" : "",
            node.name
          ]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([node.nullable ? "?" : "", path.call(print, "type")])
            : "",
          bodyContents: node.body ? concat([path.call(print, "body")]) : ""
        });
      }
      case "parameter": {
        const name = concat([
          node.nullable ? "?" : "",
          node.type ? concat([path.call(print, "type"), " "]) : "",
          node.variadic ? "..." : "",
          node.byref ? "&" : "",
          "$",
          node.name
        ]);
        if (node.value) {
          return group(
            concat([
              name,
              indent(concat([line, "= ", path.call(print, "value")]))
            ])
          );
        }
        return name;
      }
      case "property":
        return group(
          concat([
            node.visibility ? concat([node.visibility, " "]) : "",
            node.isStatic ? "static " : "",
            "$",
            node.name,
            node.value ? concat([" = ", path.call(print, "value")]) : "",
            ";"
          ])
        );
      case "interface":
        return printDeclarationBlock({
          declaration: concat([
            concat(["interface ", node.name]),
            node.extends
              ? indent(
                  concat([
                    line,
                    "extends ",
                    join(", ", path.map(print, "extends"))
                  ])
                )
              : ""
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      case "trait":
        return printDeclarationBlock({
          declaration: concat([
            concat(["trait ", node.name]),
            node.extends
              ? indent(concat([line, "extends ", path.call(print, "extends")]))
              : "",
            node.implements
              ? indent(
                  concat([
                    line,
                    "implements ",
                    join(", ", path.map(print, "implements"))
                  ])
                )
              : ""
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      case "constant":
      case "classconstant":
        return concat([
          node.visibility ? concat([node.visibility, " "]) : "",
          "const ",
          node.name,
          " = ",
          path.call(print, "value")
        ]);
      default:
        return `Have not implmented declaration kind ${node.kind} yet.`;
    }
  }
  if (declarationKinds.includes(node.kind)) {
    return printDeclaration(node);
  }

  function printBodyControlStructure(path, bodyProperty = "body") {
    const node = path.getValue();
    if (!node[bodyProperty]) {
      return ";";
    }
    const printedBody = path.call(print, bodyProperty);
    return concat([
      node.shortForm ? ":" : " {",
      indent(
        concat([
          comments.printDanglingComments(path, options, true),
          node[bodyProperty].kind !== "block" ||
          (node[bodyProperty].children &&
            node[bodyProperty].children.length > 0) ||
          (node[bodyProperty].comments &&
            node[bodyProperty].comments.length > 0)
            ? concat([hardline, printedBody])
            : ""
        ])
      ),
      node.kind === "if" && bodyProperty === "body"
        ? ""
        : concat([
            hardline,
            node.shortForm ? concat(["end", node.kind, ";"]) : "}"
          ])
    ]);
  }

  switch (node.kind) {
    case "assign": {
      const canBreak =
        ["bin", "number", "string"].includes(node.right.kind) ||
        (node.right.kind === "retif" && node.right.trueExpr === null) ||
        isPropertyLookupChain(node.right);
      return group(
        concat([
          path.call(print, "left"),
          " ",
          node.operator,
          canBreak
            ? indent(concat([line, path.call(print, "right")]))
            : concat([" ", path.call(print, "right")])
        ])
      );
    }
    case "if": {
      const handleIfAlternate = alternate => {
        if (!alternate) {
          return node.shortForm ? "endif;" : "}";
        }
        if (alternate.kind === "if") {
          return concat([
            node.shortForm ? "" : "} ",
            "else",
            path.call(print, "alternate")
          ]);
        }
        return concat([
          node.shortForm ? "" : "} ",
          "else",
          printBodyControlStructure(path, "alternate")
        ]);
      };
      return concat([
        group(
          concat([
            "if (",
            group(
              concat([
                indent(concat([softline, path.call(print, "test")])),
                softline
              ])
            ),
            ")",
            printBodyControlStructure(path)
          ])
        ),
        hardline,
        handleIfAlternate(node.alternate)
      ]);
    }
    case "do":
      return concat([
        "do",
        printBodyControlStructure(path),
        " while (",
        group(
          concat([
            indent(concat([softline, path.call(print, "test")])),
            softline
          ])
        ),
        ");"
      ]);
    case "while":
      return group(
        concat([
          "while (",
          group(
            concat([
              indent(concat([softline, path.call(print, "test")])),
              softline
            ])
          ),
          ")",
          printBodyControlStructure(path)
        ])
      );
    case "for": {
      const body = printBodyControlStructure(path);
      if (!node.init.length && !node.test.length && !node.increment.length) {
        return concat([group(concat(["for (;;)", body]))]);
      }

      return concat([
        "for (",
        group(
          concat([
            indent(
              concat([
                softline,
                group(
                  concat([join(concat([",", line]), path.map(print, "init"))])
                ),
                ";",
                line,
                group(
                  concat([join(concat([",", line]), path.map(print, "test"))])
                ),
                ";",
                line,
                group(join(concat([",", line]), path.map(print, "increment")))
              ])
            ),
            softline
          ])
        ),
        ")",
        body
      ]);
    }
    case "foreach":
      return concat([
        "foreach (",
        group(
          concat([
            indent(
              concat([
                softline,
                path.call(print, "source"),
                line,
                "as ",
                node.key
                  ? indent(
                      join(concat([" =>", line]), [
                        path.call(print, "key"),
                        path.call(print, "value")
                      ])
                    )
                  : path.call(print, "value")
              ])
            ),
            softline
          ])
        ),
        ")",
        printBodyControlStructure(path)
      ]);
    case "switch":
      return concat([
        group(
          concat([
            "switch (",
            indent(concat([softline, path.call(print, "test")])),
            softline,
            ")"
          ])
        ),
        printBodyControlStructure(path)
      ]);
    case "call": {
      // chain: Call (PropertyLookup (Call (PropertyLookup (...))))
      if (node.what.kind === "propertylookup") {
        return printMemberChain(path, options, print);
      }
      return concat([
        path.call(print, "what"),
        printArgumentsList(path, options, print)
      ]);
    }
    case "usegroup":
      return group(
        concat([
          "use ",
          node.type ? concat([node.type, " "]) : "",
          indent(
            concat([
              node.name
                ? concat([
                    maybeStripLeadingSlashFromUse(node.name),
                    "\\{",
                    softline
                  ])
                : "",
              join(
                concat([",", line]),
                path.map(item => concat([print(item)]), "items")
              )
            ])
          ),
          node.name ? concat([softline, "}"]) : "",
          ";"
        ])
      );
    case "useitem":
      return concat([
        node.type ? concat([node.type, " "]) : "",
        maybeStripLeadingSlashFromUse(node.name),
        hasDanglingComments(node)
          ? concat([" ", comments.printDanglingComments(path, options, true)])
          : "",
        node.alias ? concat([" as ", node.alias]) : ""
      ]);
    case "closure":
      return concat([
        "function ",
        printArgumentsList(path, options, print),
        node.uses && node.uses.length > 0
          ? group(
              concat([
                " use ",
                printArgumentsList(path, options, print, "uses")
              ])
            )
          : "",
        " {",
        indent(concat([hardline, path.call(print, "body")])),
        concat([hardline, "}"])
      ]);
    case "retif": {
      const parent = path.getParentNode();
      const canBreak = !node.trueExpr;
      const forceNoIndent = parent.kind === "retif" || canBreak;
      const printedExpr = concat([
        line,
        "?",
        node.trueExpr ? concat([" ", path.call(print, "trueExpr"), line]) : "",
        ": ",
        path.call(print, "falseExpr")
      ]);
      return group(
        concat([
          path.call(print, "test"),
          forceNoIndent ? printedExpr : indent(printedExpr)
        ])
      );
    }
    case "exit":
      return group(
        concat([
          node.useDie ? "die" : "exit",
          "(",
          node.status
            ? concat([
                indent(concat([softline, path.call(print, "status")])),
                softline
              ])
            : comments.printDanglingComments(path, options),
          ")"
        ])
      );
    case "clone":
      return concat(["clone ", path.call(print, "what")]);
    case "declare": {
      const printDeclareArguments = path => {
        const [directive] = Object.keys(path.getValue().what);
        return concat([directive, "=", path.call(print, "what", directive)]);
      };
      if (node.mode === "short") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          "):",
          hardline,
          concat(path.map(print, "children")),
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ") {",
          indent(concat([hardline, concat(path.map(print, "children"))])),
          hardline,
          "}"
        ]);
      }
      return concat([
        "declare(",
        printDeclareArguments(path),
        ");",
        hardline,
        concat(path.map(print, "children"))
      ]);
    }
    case "global":
      return group(
        concat([
          "global",
          indent(
            concat([" ", join(concat([",", line]), path.map(print, "items"))])
          )
        ])
      );
    case "static":
      return group(
        concat([
          "static",
          indent(
            concat([
              " ",
              join(
                concat([",", line]),
                path.map(item => {
                  // @TODO: hacking this for now. assignments nested inside a static
                  // declaration doesn't have the operator set, so printing manually
                  if (item.getValue().kind === "assign") {
                    return concat([
                      item.call(print, "left"),
                      " = ",
                      item.call(print, "right")
                    ]);
                  }
                  return item.call(print);
                }, "items")
              )
            ])
          )
        ])
      );
    case "include":
      return concat([
        node.require ? "require" : "include",
        node.once ? "_once" : "",
        " ",
        path.call(print, "target")
      ]);
    case "goto":
      return concat(["goto ", node.label]);
    case "new": {
      // if the child node is an anonymous class, we need to store the arguments
      // so the child class node can access them later
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;
      if (isAnonymousClassNode && node.arguments.length > 0) {
        anonymousClassesNewArguments = printArgumentsList(path, options, print);
      }
      return group(
        concat([
          "new ",
          path.call(print, "what"),
          isAnonymousClassNode ? "" : printArgumentsList(path, options, print)
        ])
      );
    }
    case "try":
      return concat([
        "try {",
        indent(
          concat([
            hardline,
            path.call(print, "body"),
            comments.printDanglingComments(path, options, true)
          ])
        ),
        hardline,
        "}",
        node.catches ? concat(path.map(print, "catches")) : "",
        node.always
          ? concat([
              " finally {",
              indent(concat([hardline, path.call(print, "always")])),
              hardline,
              "}"
            ])
          : ""
      ]);
    case "catch":
      return concat([
        " catch",
        node.what
          ? concat([
              " (",
              join(" | ", path.map(print, "what")),
              " ",
              path.call(print, "variable"),
              ")"
            ])
          : "",
        " {",
        indent(
          concat([
            hardline,
            path.call(print, "body"),
            comments.printDanglingComments(path, options, true)
          ])
        ),
        hardline,
        "}"
      ]);
    case "throw":
      return concat(["throw ", path.call(print, "what")]);
    case "silent":
      return concat(["@", path.call(print, "expr")]);
    case "halt":
      return concat(["__halt_compiler();", node.after.replace(/\n$/, "")]);
    case "eval":
      return group(
        concat([
          "eval(",
          indent(concat([softline, path.call(print, "source")])),
          softline,
          ")"
        ])
      );
    default:
      return `Have not implemented statement kind ${node.kind} yet.`;
  }
}

function printNode(path, options, print) {
  const node = path.getValue();
  if (expressionKinds.includes(node.kind)) {
    return printExpression(path, options, print);
  }
  if (statementKinds.includes(node.kind)) {
    return printStatement(path, options, print);
  }
  switch (node.kind) {
    case "identifier": {
      // this is a hack until https://github.com/glayzzle/php-parser/issues/113 is resolved
      // for reserved words we prefer lowercase case
      if (node.name === "\\array") {
        return "array";
      } else if (node.name === "\\callable") {
        return "callable";
      }

      const lowerCasedName = node.name.toLowerCase();
      const isLowerCase =
        [
          "int",
          "float",
          "bool",
          "string",
          "null",
          "void",
          "iterable",
          "object",
          "self"
        ].indexOf(lowerCasedName) !== -1;

      return isLowerCase ? lowerCasedName : node.name;
    }
    case "case":
      return concat([
        node.test
          ? concat(["case ", path.call(print, "test"), ":"])
          : "default:",
        node.body
          ? node.body.children && node.body.children.length
            ? indent(concat([hardline, path.call(print, "body")]))
            : ";"
          : ""
      ]);
    case "break":
      if (node.level) {
        while (node.level.kind == "parenthesis") {
          node.level = node.level.inner;
        }
        if (node.level.kind == "number" && node.level.value != 1) {
          return concat(["break ", path.call(print, "level")]);
        }
        return "break";
      }
      return "break";
    case "continue":
      if (node.level) {
        while (node.level.kind == "parenthesis") {
          node.level = node.level.inner;
        }
        if (node.level.kind == "number" && node.level.value != 1) {
          return concat(["continue ", path.call(print, "level")]);
        }
        return "continue";
      }
      return "continue";
    case "return": {
      const parts = [];
      parts.push("return");
      if (node.expr) {
        const printedExpr = path.call(print, "expr");
        if (node.expr.kind === "bin") {
          parts.push(
            group(
              concat([
                ifBreak(" (", " "),
                indent(concat([softline, printedExpr])),
                softline,
                ifBreak(")")
              ])
            )
          );
        } else {
          parts.push(" ", printedExpr);
        }
      }
      return concat(parts);
    }
    case "entry": {
      const dangling = comments.printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? concat([hardline, dangling]) : "";

      return concat([
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value"),
        printedComments
      ]);
    }
    case "traituse":
      return group(
        concat([
          "use ",
          join(", ", path.map(print, "traits")),
          node.adaptations
            ? concat([
                " {",
                indent(
                  concat([
                    line,
                    printLines(path, options, print, "adaptations")
                  ])
                ),
                line,
                "}"
              ])
            : ""
        ])
      );
    case "traitprecedence":
      return concat([
        path.call(print, "trait"),
        "::",
        node.method,
        " insteadof ",
        join(", ", path.map(print, "instead"))
      ]);
    case "traitalias":
      return concat([
        path.call(print, "trait"),
        node.trait ? "::" : "",
        node.method || "",
        " as ",
        join(" ", [
          ...(node.visibility ? [node.visibility] : []),
          ...(node.as ? [node.as] : [])
        ])
      ]);
    case "label":
      return concat([node.name, ":"]);
    case "error":
    default:
      return `Have not implemented kind ${node.kind} yet.`;
  }
}

module.exports = genericPrint;
