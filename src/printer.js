"use strict";

const docBuilders = require("prettier").doc.builders;
const sharedUtil = require("prettier").util;

const util = require("./util");

const concat = docBuilders.concat;
const join = docBuilders.join;
const line = docBuilders.line;
const group = docBuilders.group;
const conditionalGroup = docBuilders.conditionalGroup;
const indent = docBuilders.indent;
const ifBreak = docBuilders.ifBreak;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

const makeString = sharedUtil.makeString;

// polyfill for node 4
function includes(array, val) {
  return array.indexOf(val) !== -1;
}

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

function getLast(arr) {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }
  return null;
}

function getParentNodeListProperty(path) {
  const parent = path.getParentNode();
  if (!parent) {
    return null;
  }
  const body = parent.children || parent.body || parent.adaptations;
  return Array.isArray(body) ? body : null;
}

function getNodeIndex(path) {
  const body = getParentNodeListProperty(path);
  if (!body) {
    return -1;
  }
  return body.indexOf(path.getValue());
}

function genericPrint(path, options, print) {
  const n = path.getValue();
  if (!n) {
    return "";
  } else if (typeof n === "string") {
    return n;
  }
  if (n.kind === "program" && n.children.length === 0) {
    return concat(["<?php", hardline]);
  }
  const printed = printNode(path, options, print);
  const parentNode = path.getParentNode();
  const isParentProgramNode = parentNode && parentNode.kind === "program";
  const nodeBody = getParentNodeListProperty(path);
  const nodeIndex = getNodeIndex(path);
  const isFirstNodeInParentProgramNode = isParentProgramNode && nodeIndex === 0;
  const isLastNodeInParentProgramNode =
    isParentProgramNode && nodeBody && nodeIndex === nodeBody.length - 1;
  if (n.kind === "inline") {
    return concat([
      isFirstNodeInParentProgramNode ? "" : "?>",
      printed,
      isLastNodeInParentProgramNode ? "" : "<?php"
    ]);
  }
  return concat([
    isFirstNodeInParentProgramNode ? concat(["<?php ", hardline]) : "",
    printed,
    n.kind === "program"
      ? n.children[n.children.length - 1].kind !== "inline" ? hardline : ""
      : ""
  ]);
}

function lineShouldEndWithSemicolon(path) {
  const node = path.getValue();
  const semiColonWhitelist = [
    "assign",
    "return",
    "break",
    "continue",
    "call",
    "pre",
    "post",
    "bin",
    "unary",
    "yield",
    "yieldfrom",
    "echo",
    "list",
    "print",
    "isset",
    "retif",
    "unset",
    "empty",
    "traitprecedence",
    "traitalias",
    "constant",
    "classconstant",
    "exit",
    "global",
    "static",
    "include",
    "goto",
    "throw",
    "magic",
    "new",
    "eval"
  ];
  if (node.kind === "traituse") {
    return !node.adaptations;
  }
  if (node.kind === "method" && node.isAbstract) {
    return true;
  }
  if (node.kind === "method") {
    const parent = path.getParentNode();
    if (parent && parent.kind === "interface") {
      return true;
    }
  }
  return includes(semiColonWhitelist, node.kind);
}

function isLastStatement(path) {
  const body = getParentNodeListProperty(path);
  if (!body) {
    return true;
  }
  const node = path.getValue();
  return body[body.length - 1] === node;
}

function printLines(path, options, print) {
  const text = options.originalText;
  const printed = path.map(stmtPath => {
    const stmt = stmtPath.getValue();
    const parts = [];
    parts.push(print(stmtPath));
    if (lineShouldEndWithSemicolon(stmtPath)) {
      parts.push(";");
    }
    if (!isLastStatement(stmtPath)) {
      if (sharedUtil.isNextLineEmpty(text, stmt, options)) {
        parts.push(hardline);
      }
      parts.push(hardline);
    }
    return concat(parts);
  });
  return concat(printed);
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
        printed: concat(["->", path.call(print, "offset")])
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
      indent(concat([line, join(concat([",", line]), printed)])),
      line,
      ")"
    ]),
    { shouldBreak: true }
  );
  const formsToConsider = [shortForm, longForm];
  if (shouldGroupFirst || shouldGroupLast) {
    formsToConsider.splice(1, 0, mediumForm);
  }
  return conditionalGroup(formsToConsider);
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
      case "propertylookup":
        return group(
          concat([
            path.call(print, "what"),
            "->",
            indent(concat([softline, path.call(print, "offset")]))
          ])
        );
      case "staticlookup":
        return concat([
          path.call(print, "what"),
          "::",
          path.call(print, "offset")
        ]);
      case "offsetlookup":
        return group(
          concat([
            path.call(print, "what"),
            "[",
            group(indent(concat([softline, path.call(print, "offset")]))),
            softline,
            "]"
          ])
        );
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
      case "parenthesis":
        return group(
          concat([
            "(",
            indent(concat([softline, path.call(print, "inner")])),
            softline,
            ")"
          ])
        );
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
          node.type === "heredoc" ? hardline : "",
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
        return concat([
          "<<<'",
          node.label,
          "'",
          hardline,
          node.value,
          hardline,
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
        return path.call(
          childrenPath => printLines(childrenPath, options, print),
          "children"
        );
      case "program": {
        return concat([
          path.call(childrenPath => {
            return printLines(childrenPath, options, print);
          }, "children")
        ]);
      }
      case "namespace": {
        const printed = path.call(childrenPath => {
          return printLines(childrenPath, options, print);
        }, "children");
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
      case "echo":
        return concat(["echo ", join(", ", path.map(print, "arguments"))]);
      case "print":
        return concat(["print ", path.call(print, "arguments")]);
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
      return concat([
        concat([
          group(
            concat([
              declaration,
              !["class", "interface", "trait"].includes(node.kind) ? "(" : ""
            ])
          ),
          group(
            concat([
              !["class", "interface", "trait"].includes(node.kind)
                ? concat([
                    indent(
                      concat([
                        softline,
                        join(concat([",", line]), argumentsList)
                      ])
                    ),
                    softline,
                    ")",
                    returnTypeContents ? concat([": ", returnTypeContents]) : ""
                  ])
                : ""
            ])
          )
        ]),
        // @TODO: need to figure out how to not break between ") {" if the larger
        // group has already broken
        bodyContents
          ? concat([
              hardline,
              // see https://github.com/prettier/plugin-php/issues/107
              // options.openingBraceNewLine ? hardline : " ",
              "{",
              indent(concat([hardline, bodyContents])),
              hardline,
              "}"
            ])
          : ""
      ]);
    }

    switch (node.kind) {
      case "class":
        return printDeclarationBlock({
          declaration: concat([
            node.isAbstract ? "abstract " : "",
            node.isFinal ? "final " : "",
            concat(["class", node.name ? concat([" ", node.name]) : ""]),
            indent(
              concat([
                node.extends
                  ? concat([line, "extends ", path.call(print, "extends")])
                  : "",
                node.implements
                  ? concat([
                      line,
                      "implements ",
                      join(", ", path.map(print, "implements"))
                    ])
                  : ""
              ])
            )
          ]),
          bodyContents: path.call(bodyPath => {
            return printLines(bodyPath, options, print);
          }, "body")
        });
      case "function":
        return printDeclarationBlock({
          declaration: concat(["function ", node.byref ? "&" : "", node.name]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([node.nullable ? "?" : "", path.call(print, "type")])
            : "",
          bodyContents: node.body ? path.call(print, "body") : ""
        });
      case "method":
        return printDeclarationBlock({
          declaration: concat([
            node.isFinal ? "final " : "",
            node.isAbstract ? "abstract " : "",
            node.visibility,
            node.isStatic ? " static" : "",
            " function ",
            node.byref ? "&" : "",
            node.name
          ]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([node.nullable ? "?" : "", path.call(print, "type")])
            : "",
          bodyContents: node.body ? path.call(print, "body") : ""
        });
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
          bodyContents: path.call(
            bodyPath => printLines(bodyPath, options, print),
            "body"
          )
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
          bodyContents: path.call(
            bodyPath => printLines(bodyPath, options, print),
            "body"
          )
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
    case "assign":
      return group(
        concat([
          path.call(print, "left"),
          " ",
          node.operator,
          node.right.kind === "bin"
            ? indent(concat([line, path.call(print, "right")]))
            : concat([" ", path.call(print, "right")])
        ])
      );
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
            indent(
              concat([
                hardline,
                path.call(print, "body"),
                node.body.kind === "block" ? "" : ";"
              ])
            ),
            line,
            node.shortForm ? "endfor;" : "}"
          ])
        : ";";

      if (!node.init.length && !node.test.length && !node.increment.length) {
        return concat([group(concat(["for (;;)", body]))]);
      }

      return group(
        concat([
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
        ])
      );
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
        node.shortForm ? "endforeach;" : "}"
      ]);
    case "switch":
      return concat([
        group(
          concat([
            "switch (",
            indent(concat([softline, path.call(print, "test")])),
            softline,
            concat([")", node.shortForm ? ":" : " {"])
          ])
        ),
        indent(
          concat(
            path.map(
              caseChild => concat([line, print(caseChild)]),
              "body",
              "children"
            )
          )
        ),
        line,
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
        indent(
          concat([
            "use ",
            node.type ? concat([node.type, " "]) : "",
            node.name ? concat([node.name, "\\{"]) : "",
            join(
              concat([",", line]),
              path.map(item => concat([print(item)]), "items")
            ),
            node.name ? "}" : "",
            ";"
          ])
        )
      );
    case "useitem":
      return node.alias ? concat([node.name, " as ", node.alias]) : node.name;
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
        group(" {"),
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
      // Todo use `node.useDie` for determining `exit` or `die`
      // after https://github.com/glayzzle/php-parser/commit/b22ea4863be9125c381951dc008820b68fc3d135 shipped
      return concat(["exit(", path.call(print, "status"), ")"]);
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
          path.call(
            childrenPath => printLines(childrenPath, options, print),
            "children"
          ),
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ") {",
          indent(
            concat([
              hardline,
              path.call(
                childrenPath => printLines(childrenPath, options, print),
                "children"
              )
            ])
          ),
          hardline,
          "}"
        ]);
      }
      return concat([
        "declare(",
        printDeclareArguments(path),
        ");",
        hardline,
        path.call(
          childrenPath => printLines(childrenPath, options, print),
          "children"
        )
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
              line,
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
          isAnonymousClassNode
            ? ""
            : concat([
                "(",
                indent(
                  join(
                    ", ",
                    path.map(
                      argument => concat([softline, print(argument)]),
                      "arguments"
                    )
                  )
                ),
                node.arguments.length ? softline : "",
                ")"
              ])
        ])
      );
    }
    case "try":
      return concat([
        "try {",
        indent(concat([hardline, path.call(print, "body")])),
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
        indent(concat([hardline, path.call(print, "body")])),
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
      return concat(["eval(", path.call(print, "source"), ")"]);
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
        node.body ? indent(concat([line, path.call(print, "body")])) : ""
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
    case "return":
      if (node.expr) {
        return concat(["return ", path.call(print, "expr")]);
      }
      return "return";
    case "doc": {
      let canAddEmptyLine = false;
      // @TODO: need refactor after resolve https://github.com/glayzzle/php-parser/issues/114
      return node.isDoc
        ? concat([
            "/**",
            // we use the number of lines to determine if this is a single or
            // multi line docblock
            node.lines.length > 1
              ? concat(
                  node.lines.map((comment, index) => {
                    if (comment.length > 0) {
                      canAddEmptyLine = true;
                      return concat([hardline, " * ", comment]);
                    } else if (!canAddEmptyLine) {
                      return "";
                    }
                    canAddEmptyLine = false;
                    return index < node.lines.length - 1
                      ? concat([hardline, " *"])
                      : "";
                  })
                )
              : concat([" ", node.lines[0]], " "),
            node.lines.length > 1 ? hardline : "",
            " */"
          ])
        : join(
            hardline,
            node.lines.map(comment =>
              concat([
                comment.split(/\n/).length > 1
                  ? concat(["/*", comment[0] === "*" ? "" : " "])
                  : "// ",
                comment,
                comment.split(/\n/).length > 1
                  ? concat([
                      comment[comment.length - 1] === "*" ? "" : " ",
                      "*/"
                    ])
                  : ""
              ])
            )
          );
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
                indent(
                  concat([
                    line,
                    path.call(
                      adaptationsPath =>
                        printLines(adaptationsPath, options, print),
                      "adaptations"
                    )
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
