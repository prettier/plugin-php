"use strict";

const docBuilders = require("prettier").doc.builders;
const util = require("prettier").util;

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

function genericPrint(path, options, print) {
  const n = path.getValue();
  if (!n) {
    return "";
  } else if (typeof n === "string") {
    return n;
  }
  return printNode(path, options, print);
}

function lineShouldEndWithSemicolon(path) {
  const node = path.getValue();
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
            softline,
            node.offset ? path.call(print, "offset") : "",
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
      case "bin":
        return concat([
          path.call(print, "left"),
          " ",
          node.type,
          " ",
          path.call(print, "right")
        ]);
      case "parenthesis":
        return group(
          concat(["(", softline, path.call(print, "inner"), softline, ")"])
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
        return concat(
          path.map((child, i) => {
            if (i === 0) {
              return concat([
                print(child),
                lineShouldEndWithSemicolon(child) ? ";" : ""
              ]);
            }
            return concat([
              hardline,
              concat([
                print(child),
                lineShouldEndWithSemicolon(child) ? ";" : ""
              ])
            ]);
          }, "children")
        );
      case "program": {
        return concat([
          "<?php",
          hardline,
          path.call(childrenPath => {
            return printStatementSequence(childrenPath, options, print);
          }, "children")
        ]);
      }
      case "namespace":
        return concat([
          "namespace ",
          node.name,
          ";",
          concat(
            path.map(
              usegroup => concat([hardline, print(usegroup), ";"]),
              "children"
            )
          )
        ]);
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
            ])
          ),
          hardline,
          "{",
          hardline,
          indent(
            concat([
              hardline,
              path.call(bodyPath => {
                return printStatementSequence(bodyPath, options, print);
              }, "body")
            ])
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
                  path.map(
                    argument => concat([softline, print(argument)]),
                    "arguments"
                  )
                )
              ),
              softline
            ])
          ),
          group(") {"),
          indent(concat([hardline, path.call(print, "body")])),
          concat([hardline, "}"])
        ]);
      case "method":
        return concat([
          group(
            concat([
              node.isFinal ? "final " : "",
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
                  path.map(
                    argument => concat([softline, print(argument)]),
                    "arguments"
                  )
                )
              ),
              softline
            ])
          ),
          ")",
          node.body
            ? concat([
                hardline,
                "{",
                indent(concat([hardline, path.call(print, "body")])),
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
              indent(concat([line, "= ", path.call(print, "value")]))
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
              ? indent(concat([line, "= ", path.call(print, "value")]))
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
                      join(", ", path.map(print, "extends"))
                    ])
                  )
                : "",
              " {"
            ])
          ),
          indent(
            concat(
              path.map(element => {
                return concat([hardline, print(element), ";"]);
              }, "body")
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
                ? indent(
                    concat([line, "extends ", path.call(print, "extends")])
                  )
                : "",
              node.implements
                ? indent(
                    concat([
                      line,
                      "implements ",
                      join(", ", path.map(print, "implements"))
                    ])
                  )
                : "",
              " {"
            ])
          ),
          indent(
            concat(
              path.map(element => concat([hardline, print(element)]), "body")
            )
          ),
          hardline,
          "}"
        ]);
      case "constant":
      case "classconstant":
        return concat(["const ", node.name, " = ", path.call(print, "value")]);
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
        path.call(print, "left"),
        path.call(print, "right")
      ]);
    case "if": {
      const handleIfAlternate = alternate => {
        if (!alternate) {
          return "}";
        }
        if (alternate.kind === "if") {
          return concat(["} else", path.call(print, "alternate")]);
        }
        return concat([
          "} else {",
          indent(concat([line, path.call(print, "alternate")])),
          line,
          "}"
        ]);
      };
      return concat([
        group(
          concat(["if (", softline, path.call(print, "test"), softline, ") {"])
        ),
        indent(concat([line, path.call(print, "body")])),
        line,
        handleIfAlternate(node.alternate)
      ]);
    }
    case "do":
      return concat([
        "do {",
        indent(concat([line, path.call(print, "body")])),
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
            softline,
            path.call(print, "test"),
            softline,
            ") {"
          ])
        ),
        indent(concat([line, path.call(print, "body")])),
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
                group(concat([concat(path.map(print, "init")), ";"])),
                softline,
                group(concat([concat(path.map(print, "test")), ";"])),
                softline,
                group(concat(path.map(print, "increment")))
              ])
            ),
            softline,
            ") {"
          ])
        ),
        indent(concat([line, path.call(print, "body")])),
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
                path.call(print, "source"),
                " as",
                line,
                node.key
                  ? join(" => ", [
                      path.call(print, "key"),
                      path.call(print, "value")
                    ])
                  : path.call(print, "value")
              ])
            ),
            softline,
            ") {"
          ])
        ),
        indent(concat([line, path.call(print, "body")])),
        line,
        "}"
      ]);
    case "switch":
      return concat([
        group(
          concat([
            "switch (",
            softline,
            path.call(print, "test"),
            softline,
            ") {"
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
        "}"
      ]);
    case "call":
      return concat([
        path.call(print, "what"),
        "(",
        join(", ", path.map(print, "arguments")),
        ")"
      ]);
    case "usegroup":
      return concat([
        "use ",
        join(", ", path.map(item => concat([print(item)]), "items"))
      ]);
    case "useitem":
      return node.alias ? concat([node.name, " as ", node.alias]) : node.name;
    case "closure":
      return concat([
        "function (",
        group(
          concat([
            indent(
              join(
                ", ",
                path.map(
                  argument => concat([softline, print(argument)]),
                  "arguments"
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
                    path.map(use => {
                      return concat([softline, print(use)]);
                    }, "uses")
                  )
                ),
                softline
              ])
            )
          : "",
        group(") {"),
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
      return concat(["exit(", path.call(print, "status"), ")"]);
    case "clone":
      return concat(["clone ", path.call(print, "what")]);
    case "declare": {
      const printDeclareArguments = function(path) {
        const directive = Object.keys(path.getValue().what)[0];
        return concat([directive, "=", path.call(print, "what", directive)]);
      };
      const printDeclareChildren = function(path) {
        return concat(
          path.map(child => {
            return concat([
              print(child),
              lineShouldEndWithSemicolon(child) ? ";" : ""
            ]);
          }, "children")
        );
      };
      if (node.mode === "short") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          "):",
          hardline,
          printDeclareChildren(path),
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ") {",
          indent(concat([hardline, printDeclareChildren(path)])),
          hardline,
          "}"
        ]);
      }
      return concat([
        "declare(",
        printDeclareArguments(path),
        ");",
        hardline,
        printDeclareChildren(path)
      ]);
    }
    case "global":
      return group(
        concat([
          "global",
          indent(
            concat([line, join(concat([",", line]), path.map(print, "items"))])
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
    case "new":
      console.log(node);
      return group(concat([
        "new ",
        path.call(print, "what"),
        "(",
        indent(join(", ", path.map(argument => concat([softline, print(argument)]), "arguments"))),
        softline,
        ")"
      ]));
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
      return concat(["__halt_compiler();", node.after]);
    //@TODO: leaving eval until we figure out encapsed https://github.com/prettier/prettier-php/pull/2
    case "eval":
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
    case "identifier":
      // @TODO: do we need to conider node.resolution?
      return node.name;
    case "case":
      return concat([
        node.test
          ? concat(["case ", path.call(print, "test"), ":"])
          : "default:",
        indent(concat([line, path.call(print, "body")]))
      ]);
    case "break":
      return "break";
    case "return":
      if (node.expr) {
        return concat(["return ", path.call(print, "expr")]);
      }
      return "return";
    case "doc":
      return node.isDoc
        ? concat([
            "/**",
            // we use the number of lines to determine if this is a single or
            // multi line docblock
            node.lines.length > 1
              ? concat(
                  node.lines.map(
                    (comment, index) =>
                      index != 0 && index != node.lines.length - 1
                        ? concat([hardline, " * ", comment])
                        : ""
                  )
                )
              : concat([" ", node.lines[0]], " "),
            node.lines.length > 1 ? hardline : "",
            " */"
          ])
        : concat(node.lines.map(comment => concat(["// ", comment])));
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
                  concat(
                    path.map(adaptationPath => {
                      return concat([
                        line,
                        print(adaptationPath),
                        lineShouldEndWithSemicolon(adaptationPath) ? ";" : ""
                      ]);
                    }, "adaptations")
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

function isLastStatement(path) {
  const parent = path.getParentNode();
  if (!parent) {
    return true;
  }
  const node = path.getValue();
  const body = parent.children;
  return body && body[body.length - 1] === node;
}

function printStatementSequence(path, options, print) {
  const printed = [];
  const text = options.originalText;
  path.map(stmtPath => {
    const stmt = stmtPath.getValue();
    const parts = [];
    parts.push(print(stmtPath));
    if (lineShouldEndWithSemicolon(stmtPath)) {
      parts.push(";");
    }
    if (
      util.isNextLineEmpty(text, stmt, options) &&
      !isLastStatement(stmtPath)
    ) {
      parts.push(hardline);
    }
    printed.push(concat(parts));
  });
  return join(hardline, printed);
}

module.exports = genericPrint;
