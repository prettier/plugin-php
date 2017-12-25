"use strict";

const docBuilders = require("prettier").doc.builders;
const concat = docBuilders.concat;
const join = docBuilders.join;
const line = docBuilders.line;
const group = docBuilders.group;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;

// polyfill for node 4
function includes(array, val) {
  return array.indexOf(val) !== -1;
}

function genericPrint(path) {
  const n = path.getValue();
  if (!n) {
    return "";
  } else if (typeof n === "string") {
    return n;
  }
  return printNode(n);
}

function lineShouldEndWithSemicolon(node) {
  const semiColonWhitelist = [
    "assign",
    "return",
    "break",
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
    "throw"
  ];
  if (node.kind === "traituse") {
    return !node.adaptations;
  }
  return includes(semiColonWhitelist, node.kind);
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
  "encapsed"
];
function printExpression(node) {
  const lookupKinds = ["propertylookup", "staticlookup", "offsetlookup"];
  function printLookup(node) {
    switch (node.kind) {
      case "propertylookup":
        return group(
          concat([
            printNode(node.what),
            "->",
            indent(concat([softline, printNode(node.offset)]))
          ])
        );
      case "staticlookup":
        return concat([printNode(node.what), "::", printNode(node.offset)]);
      case "offsetlookup":
        return group(
          concat([
            printNode(node.what),
            "[",
            softline,
            node.offset ? printNode(node.offset) : "",
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
        return concat([node.type + node.type, printNode(node.what)]);
      case "post":
        return concat([printNode(node.what), node.type + node.type]);
      case "bin":
        return concat([
          printNode(node.left),
          " ",
          node.type,
          " ",
          printNode(node.right)
        ]);
      case "parenthesis":
        return group(
          concat(["(", softline, printNode(node.inner), softline, ")"])
        );
      case "unary":
        return concat([node.type, printNode(node.what)]);
      case "cast":
        return concat(["(", node.type, ") ", printNode(node.what)]);
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
        // @TODO: for now just reusing double/single quote preference from doc. could eventually
        // use setting from options. need to figure out how this works w/ complex strings and interpolation
        // also need to figure out splitting long strings
        const quote = node.isDoubleQuote ? '"' : "'";
        return quote + node.value + quote;
      }
      case "number":
        return node.value;
      case "encapsed":
        if (node.type === "offset") {
          return group(concat(node.value.map(printNode)));
        }
        return concat([
          getEncapsedQuotes(node),
          node.type === "heredoc" ? hardline : "",
          concat(
            node.value.map(value => {
              // might need to figure out better way to do this. don't want
              // to send through printNode() because value is a string and
              // we don't want the quotes
              return value.kind === "string" ? value.value : printNode(value);
            })
          ),
          getEncapsedQuotes(node, { opening: false })
        ]);
      case "inline":
        return node.value;
      case "magic":
        return node.value;
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
        "$",
        node.curly ? "{" : "",
        node.name,
        node.curly ? "}" : ""
      ]);
    case "constref":
      if (typeof node.name === "object") {
        return printNode(node.name);
      }
      return node.name;
    case "array":
      return group(
        concat([
          node.shortForm ? "[" : "array(",
          indent(
            concat([
              softline,
              join(concat([",", line]), node.items.map(item => printNode(item)))
            ])
          ),
          softline,
          node.shortForm ? "]" : ")"
        ])
      );
    case "yield":
      return concat([
        "yield ",
        node.key ? concat([printNode(node.key), " => "]) : "",
        printNode(node.value)
      ]);
    case "yieldfrom":
      return concat(["yield from ", printNode(node.value)]);
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
function printStatement(node) {
  const blockKinds = ["block", "program", "namespace"];
  function printBlock(node) {
    switch (node.kind) {
      case "block":
        return concat(
          node.children.map((child, i) => {
            if (i === 0) {
              return concat([
                printNode(child),
                lineShouldEndWithSemicolon(child) ? ";" : ""
              ]);
            }
            return concat([
              hardline,
              concat([
                printNode(child),
                lineShouldEndWithSemicolon(child) ? ";" : ""
              ])
            ]);
          })
        );
      case "program":
        return concat([
          "<?php",
          concat(
            node.children.map(child =>
              concat([
                hardline,
                printNode(child),
                lineShouldEndWithSemicolon(child) ? ";" : ""
              ])
            )
          )
        ]);
      case "namespace":
        return concat([
          "namespace ",
          node.name,
          ";",
          concat(
            node.children.map(usegroup =>
              concat([hardline, printNode(usegroup), ";"])
            )
          )
        ]);
      default:
        return "Have not implemented block kind " + node.kind + " yet.";
    }
  }
  if (includes(blockKinds, node.kind)) {
    return printBlock(node);
  }

  const sysKinds = ["echo", "list", "print", "isset", "unset", "empty"];
  function printSys(node) {
    switch (node.kind) {
      case "echo":
        return concat(["echo ", join(", ", node.arguments.map(printNode))]);
      case "print":
        return concat(["print ", printNode(node.arguments)]);
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
                join(concat([",", line]), node.arguments.map(printNode))
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
    switch (node.kind) {
      case "class":
        return concat([
          group(
            concat([
              node.isAbstract ? "abstract " : "",
              node.isFinal ? "final " : "",
              "class ",
              node.name,
              indent(
                concat([
                  node.extends
                    ? concat([line, "extends ", printNode(node.extends)])
                    : "",
                  node.implements
                    ? concat([
                        line,
                        "implements ",
                        join(", ", node.implements.map(printNode))
                      ])
                    : ""
                ])
              ),
              " {"
            ])
          ),
          hardline,
          indent(
            concat(
              node.body.map(child =>
                concat([
                  hardline,
                  printNode(child),
                  lineShouldEndWithSemicolon(child) ? ";" : ""
                ])
              )
            )
          ),
          hardline,
          "}"
        ]);
      case "function":
        return concat([
          group(concat(["function ", node.name, "("])),
          group(
            concat([
              indent(
                join(
                  ", ",
                  node.arguments.map(argument =>
                    concat([softline, printNode(argument)])
                  )
                )
              ),
              softline
            ])
          ),
          group(") {"),
          indent(concat([hardline, printNode(node.body)])),
          concat([hardline, "}"])
        ]);
      case "method":
        return concat([
          group(
            concat([
              node.visibility,
              node.isStatic ? " static" : "",
              " function ",
              node.name,
              "("
            ])
          ),
          group(
            concat([
              indent(
                join(
                  ", ",
                  node.arguments.map(argument =>
                    concat([softline, printNode(argument)])
                  )
                )
              ),
              softline
            ])
          ),
          ")",
          node.body
            ? concat([
                " {",
                indent(concat([hardline, printNode(node.body)])),
                hardline,
                "}"
              ])
            : ""
        ]);
      case "parameter":
        if (node.value) {
          return group(
            concat([
              concat(["$", node.name]),
              indent(concat([line, "= ", printNode(node.value)]))
            ])
          );
        }
        return concat([node.variadic ? "..." : "", "$", node.name]);
      case "property":
        return group(
          concat([
            node.visibility,
            node.isStatic ? " static " : "",
            " $",
            node.name,
            node.value
              ? indent(concat([line, "= ", printNode(node.value)]))
              : "",
            ";"
          ])
        );
      case "interface":
        return concat([
          group(
            concat([
              concat(["interface ", node.name]),
              node.extends
                ? indent(
                    concat([
                      line,
                      "extends ",
                      join(", ", node.extends.map(printNode))
                    ])
                  )
                : "",
              " {"
            ])
          ),
          indent(
            concat(
              node.body.map(element =>
                concat([hardline, printNode(element), ";"])
              )
            )
          ),
          hardline,
          "}"
        ]);
      case "trait":
        return concat([
          group(
            concat([
              concat(["trait ", node.name]),
              node.extends
                ? indent(concat([line, "extends ", printNode(node.extends)]))
                : "",
              node.implements
                ? indent(
                    concat([
                      line,
                      "implements ",
                      join(", ", node.implements.map(printNode))
                    ])
                  )
                : "",
              " {"
            ])
          ),
          indent(
            concat(
              node.body.map(element => concat([hardline, printNode(element)]))
            )
          ),
          hardline,
          "}"
        ]);
      case "constant":
      case "classconstant":
        return concat(["const ", node.name, " = ", printNode(node.value)]);
      default:
        return "Have not implmented declaration kind " + node.kind + " yet.";
    }
  }
  if (includes(declarationKinds, node.kind)) {
    return printDeclaration(node);
  }

  switch (node.kind) {
    case "assign":
      return join(concat([" ", node.operator, " "]), [
        printNode(node.left),
        printNode(node.right)
      ]);
    case "if": {
      const handleIfAlternate = alternate => {
        if (!alternate) {
          return "}";
        }
        if (alternate.kind === "if") {
          return concat(["} else", printNode(alternate)]);
        }
        return concat([
          "} else {",
          indent(concat([line, printNode(alternate)])),
          line,
          "}"
        ]);
      };
      return concat([
        group(
          concat(["if (", softline, printNode(node.test), softline, ") {"])
        ),
        indent(concat([line, printNode(node.body)])),
        line,
        handleIfAlternate(node.alternate)
      ]);
    }
    case "do":
      return concat([
        "do {",
        indent(concat([line, printNode(node.body)])),
        line,
        group(
          concat([
            "} while (",
            group(
              concat([
                indent(concat([softline, printNode(node.test)])),
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
          concat(["while (", softline, printNode(node.test), softline, ") {"])
        ),
        indent(concat([line, printNode(node.body)])),
        line,
        "}"
      ]);
    case "for":
      return concat([
        "for (",
        group(
          concat([
            indent(
              concat([
                softline,
                group(
                  concat([concat(node.init.map(init => printNode(init))), ";"])
                ),
                softline,
                group(
                  concat([concat(node.test.map(test => printNode(test))), ";"])
                ),
                softline,
                group(
                  concat(node.increment.map(increment => printNode(increment)))
                )
              ])
            ),
            softline,
            ") {"
          ])
        ),
        indent(concat([line, printNode(node.body)])),
        line,
        "}"
      ]);
    case "foreach":
      return concat([
        "foreach (",
        group(
          concat([
            indent(
              concat([
                softline,
                printNode(node.source),
                " as",
                line,
                node.key
                  ? join(" => ", [printNode(node.key), printNode(node.value)])
                  : printNode(node.value)
              ])
            ),
            softline,
            ") {"
          ])
        ),
        indent(concat([line, printNode(node.body)])),
        line,
        "}"
      ]);
    case "switch":
      return concat([
        group(
          concat(["switch (", softline, printNode(node.test), softline, ") {"])
        ),
        indent(
          concat(
            node.body.children.map(caseChild =>
              concat([line, printNode(caseChild)])
            )
          )
        ),
        line,
        "}"
      ]);
    case "call":
      return concat([
        printNode(node.what),
        "(",
        join(", ", node.arguments.map(argument => printNode(argument))),
        ")"
      ]);
    case "usegroup":
      return concat([
        "use ",
        join(", ", node.items.map(item => concat([printNode(item)])))
      ]);
    case "useitem":
      return node.name;
    case "closure":
      return concat([
        "function (",
        group(
          concat([
            indent(
              join(
                ", ",
                node.arguments.map(argument =>
                  concat([softline, printNode(argument)])
                )
              )
            ),
            softline
          ])
        ),
        node.uses && node.uses.length > 0
          ? group(
              concat([
                ") use (",
                indent(
                  join(
                    ", ",
                    node.uses.map(use => {
                      return concat([softline, printNode(use)]);
                    })
                  )
                ),
                softline
              ])
            )
          : "",
        group(") {"),
        indent(concat([hardline, printNode(node.body)])),
        concat([hardline, "}"])
      ]);
    case "retif":
      return group(
        concat([
          printNode(node.test),
          indent(
            concat([
              line,
              "? ",
              printNode(node.trueExpr),
              line,
              ": ",
              printNode(node.falseExpr)
            ])
          )
        ])
      );
    case "exit":
      return concat(["exit(", printNode(node.status), ")"]);
    case "clone":
      return concat(["clone ", printNode(node.what)]);
    case "declare": {
      const printDeclareArguments = function(node) {
        const directive = Object.keys(node.what)[0];
        return concat([directive, "=", printNode(node.what[directive])]);
      };
      const printDeclareChildren = function(node) {
        return concat(
          node.children.map(child =>
            concat([
              printNode(child),
              lineShouldEndWithSemicolon(child) ? ";" : ""
            ])
          )
        );
      };
      if (node.mode === "short") {
        return concat([
          "declare(",
          printDeclareArguments(node),
          "):",
          hardline,
          printDeclareChildren(node),
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(node),
          ") {",
          indent(concat([hardline, printDeclareChildren(node)])),
          hardline,
          "}"
        ]);
      }
      return concat([
        "declare(",
        printDeclareArguments(node),
        ");",
        hardline,
        printDeclareChildren(node)
      ]);
    }
    case "global":
      return group(
        concat([
          "global",
          indent(
            concat([line, join(concat([",", line]), node.items.map(printNode))])
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
                node.items.map(item => {
                  // @TODO: hacking this for now. assignments nested inside a static
                  // declaration doesn't have the operator set, so printing manually
                  if (item.kind === "assign") {
                    return concat([
                      printNode(item.left),
                      " = ",
                      printNode(item.right)
                    ]);
                  }
                  return printNode(item);
                })
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
        printNode(node.target)
      ]);
    case "goto":
      return concat(["goto ", node.label]);
    case "new":
      return concat(["new ", printNode(node.what), "()"]);
    case "try":
      return concat([
        "try {",
        indent(concat([hardline, printNode(node.body)])),
        hardline,
        "}",
        node.catches ? concat(node.catches.map(printNode)) : "",
        node.always
          ? concat([
              " finally {",
              indent(concat([hardline, printNode(node.always)])),
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
              join(" | ", node.what.map(printNode)),
              " ",
              printNode(node.variable),
              ")"
            ])
          : "",
        " {",
        indent(concat([hardline, printNode(node.body)])),
        hardline,
        "}"
      ]);
    case "throw":
      return concat(["throw ", printNode(node.what)]);
    case "silent":
      return concat(["@", printNode(node.expr)]);
    case "halt":
      return concat(["__halt_compiler();", node.after]);
    //@TODO: leaving eval until we figure out encapsed https://github.com/prettier/prettier-php/pull/2
    case "eval":
    default:
      return "Have not implemented statement kind " + node.kind + " yet.";
  }
}

function printNode(node) {
  if (includes(expressionKinds, node.kind)) {
    return printExpression(node);
  }
  if (includes(statementKinds, node.kind)) {
    return printStatement(node);
  }
  switch (node.kind) {
    case "identifier":
      // @TODO: do we need to conider node.resolution?
      return node.name;
    case "case":
      return concat([
        node.test ? concat(["case ", printNode(node.test), ":"]) : "default:",
        indent(concat([line, printNode(node.body)]))
      ]);
    case "break":
      return "break";
    case "return":
      if (node.expr) {
        return concat(["return ", printNode(node.expr)]);
      }
      return "return";
    case "doc":
      return node.isDoc
        ? concat([
            "/**",
            concat(
              node.lines.map(comment => concat([hardline, " * ", comment]))
            ),
            hardline,
            " */"
          ])
        : concat(node.lines.map(comment => concat(["// ", comment])));
    case "entry":
      return concat([
        node.key ? concat([printNode(node.key), " => "]) : "",
        printNode(node.value)
      ]);
    case "traituse":
      return group(
        concat([
          "use ",
          join(", ", node.traits.map(printNode)),
          node.adaptations
            ? concat([
                " {",
                indent(
                  concat(
                    node.adaptations.map(adaptation =>
                      concat([
                        line,
                        printNode(adaptation),
                        lineShouldEndWithSemicolon(adaptation) ? ";" : ""
                      ])
                    )
                  )
                ),
                line,
                "}"
              ])
            : ""
        ])
      );
    case "traitprecedence":
      return concat([
        printNode(node.trait),
        "::",
        node.method,
        " insteadof ",
        join(", ", node.instead.map(printNode))
      ]);
    case "traitalias":
      return concat([
        printNode(node.trait),
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
