"use strict";

const docBuilders = require("prettier").doc.builders;
const docUtils = require("prettier").doc.utils;
const sharedUtil = require("prettier").util;
//@TODO: super hacky, remove once comment functions are exported for plugin use
const comments = require("../node_modules/prettier/src/main/comments");

const util = require("./util");

const concat = docBuilders.concat;
const join = docBuilders.join;
const line = docBuilders.line;
const group = docBuilders.group;
const conditionalGroup = docBuilders.conditionalGroup;
const indent = docBuilders.indent;
const dedent = docBuilders.dedent;
const ifBreak = docBuilders.ifBreak;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;
const willBreak = docUtils.willBreak;

const includes = util.includes;
const getNodeListProperty = util.getNodeListProperty;
const getLast = util.getLast;
const isFirstNodeInParentProgramNode = util.isFirstNodeInParentProgramNode;
const isFirstNodeInParentNode = util.isFirstNodeInParentNode;
const isPrevNodeInline = util.isPrevNodeInline;
const isNextNodeInline = util.isNextNodeInline;
const lineShouldHaveStartPHPTag = util.lineShouldHaveStartPHPTag;
const lineShouldEndWithSemicolon = util.lineShouldEndWithSemicolon;
const lineShouldEndWithHardline = util.lineShouldEndWithHardline;
const fileShouldEndWithHardline = util.fileShouldEndWithHardline;
const lineShouldHaveEndPHPTag = util.lineShouldHaveEndPHPTag;
const shouldRemoveLines = util.shouldRemoveLines;
const removeNewlines = util.removeNewlines;

const makeString = sharedUtil.makeString;

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
    return concat(["<?php", hardline]);
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
          (!isNextNodeInline(path) && !util.isControlStructureNode(node))
            ? hardline
            : " "
        ])
      : "",
    shouldRemoveLines(path) ? removeNewlines(printed) : printed,
    lineShouldEndWithSemicolon(path) ? ";" : "",
    lineShouldEndWithHardline(path)
      ? concat([
          sharedUtil.isNextLineEmpty(options.originalText, node, options)
            ? hardline
            : "",
          hardline
        ])
      : "",
    lineShouldHaveEndPHPTag(path)
      ? concat([
          isFirstNodeInParentNode(path) || !isPrevNodeInline(path)
            ? hardline
            : " ",
          "?>"
        ])
      : "",
    fileShouldEndWithHardline(path) ? hardline : ""
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
        node: node,
        printed: concat([printArgumentsList(path, options, print)])
      });
      path.call(what => traverse(what), "what");
    } else if (node.kind === "propertylookup") {
      printedNodes.unshift({
        node: node,
        printed: concat([
          "->",
          wrapPropertyLookup(node, path.call(print, "offset"))
        ])
      });
      path.call(what => traverse(what), "what");
    } else {
      printedNodes.unshift({
        node: node,
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
            group(
              concat([
                indent(
                  concat([
                    isOffsetNumberNode ? "" : softline,
                    path.call(print, "offset")
                  ])
                ),
                isOffsetNumberNode ? "" : softline
              ])
            ),
            "]"
          ])
        );
      }
      default:
        return "Have not implemented lookup kind " + node.kind + " yet.";
    }
  }
  if (includes(lookupKinds, node.kind)) {
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
            node.left.kind === "bin" &&
            util.shouldFlatten(node.type, node.left.type)
          );
          const printedLeft = path.call(
            left => printBinaryExpression(left, print, options, true),
            "left"
          );

          const shouldGroupRight = !(
            node.right.kind === "bin" &&
            util.shouldFlatten(node.type, node.right.type)
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
        const printedInner = concat([
          shouldBeInlined || !shouldPrintParenthesis ? "" : softline,
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
        return "Have not implemented operation kind " + node.kind + " yet.";
    }
  }
  if (includes(operationKinds, node.kind)) {
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
        return opening ? "<<<" + node.label : node.label;
      }
      const quotes = {
        string: '"',
        shell: "`"
      };
      if (quotes[node.type]) {
        return quotes[node.type];
      }
      return "Unimplemented encapsed type " + node.type;
    }

    switch (node.kind) {
      case "boolean":
        return node.value ? "true" : "false";
      case "string": {
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/101
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/123
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/124
        // @TODO: for now just reusing double/single quote preference from doc. could eventually
        // use setting from options. need to figure out how this works w/ complex strings and interpolation
        // also need to figure out splitting long strings
        const quote = node.isDoubleQuote ? '"' : "'";
        return makeString(util.stringEscape(node.value), quote, false);
      }
      case "number":
        return util.printNumber(node.value);
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
              // might need to figure out better way to do this. don't want
              // to send through printNode() because value is a string and
              // we don't want the quotes
              const node = valuePath.getValue();
              return node.kind === "string" ? node.value : print(valuePath);
            }, "value")
          ),
          getEncapsedQuotes(node, { opening: false })
        ]);
      case "inline":
        return node.value;
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
          node.label
        ]);
      default:
        return "Have not implemented literal kind " + node.kind + " yet.";
    }
  }
  if (includes(literalKinds, node.kind)) {
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
    case "array":
      return group(
        concat([
          node.shortForm ? "[" : "array(",
          indent(
            concat([
              softline,
              join(concat([",", line]), path.map(print, "items"))
            ])
          ),
          ifBreak(shouldPrintComma(options) ? "," : ""),
          softline,
          node.shortForm ? "]" : ")"
        ])
      );
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
      return "Have not implemented expression kind " + node.kind + " yet.";
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
function printStatement(path, options, print) {
  const node = path.getValue();
  const blockKinds = ["block", "program", "namespace"];
  function printBlock(path, options, print) {
    switch (node.kind) {
      case "block":
        return concat([
          concat(path.map(print, "children")),
          comments.printDanglingComments(path, options, true)
        ]);
      case "program": {
        return concat(path.map(print, "children"));
      }
      case "namespace": {
        const printed = concat(path.map(print, "children"));
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
        return "Have not implemented block kind " + node.kind + " yet.";
    }
  }
  if (includes(blockKinds, node.kind)) {
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
        return "Have not implemented sys kind " + node.kind + " yet.";
    }
  }
  if (includes(sysKinds, node.kind)) {
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
              ? node.kind === "method"
                ? ifBreak(
                    " ",
                    concat([
                      docBuilders.lineSuffix(""),
                      docBuilders.lineSuffixBoundary
                    ])
                  )
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
        return printDeclarationBlock({
          declaration: concat([
            classPrefixes.join(" "),
            classPrefixes.length > 0 ? " " : "",
            concat(["class", node.name ? concat([" ", node.name]) : ""]),
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
          bodyContents: concat(path.map(print, "body"))
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
            node.visibility,
            node.isStatic ? " static " : "",
            " $",
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
          bodyContents: concat(path.map(print, "body"))
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
          bodyContents: concat(path.map(print, "body"))
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
        return "Have not implmented declaration kind " + node.kind + " yet.";
    }
  }
  if (includes(declarationKinds, node.kind)) {
    return printDeclaration(node);
  }

  switch (node.kind) {
    case "assign": {
      const canBreak =
        node.right.kind === "bin" ||
        ["number", "string"].indexOf(node.right.kind) > -1 ||
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
          concat([
            node.shortForm ? "" : "} ",
            "else",
            node.shortForm ? ":" : " {"
          ]),
          indent(
            concat([
              line,
              path.call(print, "alternate"),
              node.alternate.kind === "block" ? "" : ";"
            ])
          ),
          line,
          node.shortForm ? "endif;" : "}"
        ]);
      };
      return concat([
        group(
          concat([
            "if (",
            indent(concat([softline, path.call(print, "test")])),
            softline,
            concat([")", node.shortForm ? ":" : " {"])
          ])
        ),
        indent(
          concat([
            line,
            path.call(print, "body"),
            node.body.kind === "block" ? "" : ";"
          ])
        ),
        line,
        handleIfAlternate(node.alternate)
      ]);
    }
    case "do":
      return concat([
        "do {",
        indent(
          concat([
            line,
            path.call(print, "body"),
            node.body.kind === "block" ? "" : ";"
          ])
        ),
        line,
        group(
          concat([
            "} while (",
            group(
              concat([
                indent(concat([softline, path.call(print, "test")])),
                softline
              ])
            ),
            ");"
          ])
        )
      ]);
    case "while":
      return concat([
        group(
          concat([
            "while (",
            indent(concat([softline, path.call(print, "test")])),
            softline,
            concat([")", node.shortForm ? ":" : " {"])
          ])
        ),
        indent(
          concat([
            line,
            path.call(print, "body"),
            node.body.kind === "block" ? "" : ";"
          ])
        ),
        line,
        node.shortForm ? "endwhile;" : "}"
      ]);
    case "for": {
      const body = node.body
        ? concat([
            node.shortForm ? ":" : " {",
            node.body.kind !== "block" || node.body.children.length > 0
              ? indent(
                  concat([
                    hardline,
                    path.call(print, "body"),
                    node.body.kind === "block" ? "" : ";"
                  ])
                )
              : indent(
                  concat([
                    node.comments && node.comments.length > 0 ? hardline : "",
                    comments.printDanglingComments(path, options, true)
                  ])
                ),
            hardline,
            node.shortForm ? "endfor;" : "}"
          ])
        : ";";

      if (!node.init.length && !node.test.length && !node.increment.length) {
        return concat([group(concat(["for (;;)", body]))]);
      }

      return concat([
        group(
          concat([
            "for (",
            group(
              concat([
                indent(
                  concat([
                    softline,
                    group(
                      concat([
                        join(concat([",", line]), path.map(print, "init"))
                      ])
                    ),
                    ";",
                    line,
                    group(
                      concat([
                        join(concat([",", line]), path.map(print, "test"))
                      ])
                    ),
                    ";",
                    line,
                    group(
                      join(concat([",", line]), path.map(print, "increment"))
                    )
                  ])
                ),
                softline
              ])
            ),
            ")",
            body
          ])
        )
      ]);
    }
    case "foreach": {
      const body = node.body
        ? concat([
            node.shortForm ? ":" : " {",
            node.body.kind !== "block" || node.body.children.length > 0
              ? indent(
                  concat([
                    hardline,
                    path.call(print, "body"),
                    node.body.kind === "block" ? "" : ";"
                  ])
                )
              : indent(
                  concat([
                    node.comments && node.comments.length > 0 ? hardline : "",
                    comments.printDanglingComments(path, options, true)
                  ])
                ),
            hardline,
            node.shortForm ? "endforeach;" : "}"
          ])
        : ";";

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
        body
      ]);
    }
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
        node.shortForm ? ":" : " {",
        node.body.children.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.map(
                    casePath => {
                      const caseNode = casePath.getValue();
                      return concat([
                        casePath.call(print),
                        node.body.children.indexOf(caseNode) !==
                          node.body.children.length - 1 &&
                        sharedUtil.isNextLineEmpty(
                          options.originalText,
                          caseNode,
                          options
                        )
                          ? hardline
                          : ""
                      ]);
                    },
                    "body",
                    "children"
                  )
                )
              ])
            )
          : "",
        hardline,
        node.shortForm ? "endswitch;" : "}"
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
              node.name ? concat([node.name, "\\{", softline]) : "",
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
        node.name,
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
    case "retif":
      return group(
        concat([
          path.call(print, "test"),
          indent(
            concat([
              line,
              "?",
              node.trueExpr
                ? concat([" ", path.call(print, "trueExpr"), line])
                : "",
              ": ",
              path.call(print, "falseExpr")
            ])
          )
        ])
      );
    case "exit":
      return group(
        concat([
          node.useDie ? "die" : "exit",
          "(",
          indent(concat([softline, path.call(print, "status")])),
          softline,
          ")"
        ])
      );
    case "clone":
      return concat(["clone ", path.call(print, "what")]);
    case "declare": {
      const printDeclareArguments = function(path) {
        const directive = Object.keys(path.getValue().what)[0];
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
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;
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
      return "Have not implemented statement kind " + node.kind + " yet.";
  }
}

function printNode(path, options, print) {
  const node = path.getValue();
  if (includes(expressionKinds, node.kind)) {
    return printExpression(path, options, print);
  }
  if (includes(statementKinds, node.kind)) {
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
    case "entry":
      return concat([
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value")
      ]);
    case "traituse":
      return group(
        concat([
          "use ",
          join(", ", path.map(print, "traits")),
          node.adaptations
            ? concat([
                " {",
                indent(concat([line, concat(path.map(print, "adaptations"))])),
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
        "::",
        node.method,
        " as ",
        node.visibility ? concat([node.visibility, " "]) : "",
        node.as
      ]);
    case "label":
      return concat([node.name, ":"]);
    case "error":
    default:
      return "Have not implemented kind " + node.kind + " yet.";
  }
}

module.exports = genericPrint;
