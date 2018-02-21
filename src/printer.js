"use strict";

const docBuilders = require("prettier").doc.builders;
const sharedUtil = require("prettier").util;

const util = require("./util");

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
  return includes(semiColonWhitelist, node.kind);
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

function printLines(path, options, print) {
  const text = options.originalText;
  const printed = path.map(stmtPath => {
    const stmt = stmtPath.getValue();
    const parts = [];
    parts.push(print(stmtPath));
    if (lineShouldEndWithSemicolon(stmtPath)) {
      parts.push(";");
    }
    if (
      sharedUtil.isNextLineEmpty(text, stmt, options) &&
      !isLastStatement(stmtPath)
    ) {
      parts.push(hardline);
    }
    return concat(parts);
  });
  return join(hardline, printed);
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
        node.byref ? "&" : "",
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
        return path.call(
          childrenPath => printLines(childrenPath, options, print),
          "children"
        );
      case "program": {
        return concat([
          "<?php",
          hardline,
          path.call(childrenPath => {
            return printLines(childrenPath, options, print);
          }, "children"),
          node.children.length ? hardline : ""
        ]);
      }
      case "namespace": {
        const printed = path.call(childrenPath => {
          return printLines(childrenPath, options, print);
        }, "children");

        return concat([
          "namespace ",
          node.name,
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
          indent(
            concat([
              hardline,
              path.call(bodyPath => {
                return printLines(bodyPath, options, print);
              }, "body")
            ])
          ),
          hardline,
          "}"
        ]);
      case "function":
        return concat([
          group(concat(["function ", node.byref ? "&" : "", node.name, "("])),
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
          node.type ? concat([": ", path.call(print, "type")]) : "",
          " {",
          indent(concat([hardline, path.call(print, "body")])),
          concat([hardline, "}"])
        ]);
      case "method":
        return concat([
          group(
            concat([
              node.isFinal ? "final " : "",
              node.isAbstract ? "abstract " : "",
              node.visibility,
              node.isStatic ? " static" : "",
              " function ",
              node.byref ? "&" : "",
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
          node.type ? concat([": ", path.call(print, "type")]) : "",
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
      case "parameter": {
        const name = concat([
          node.type ? path.call(print, "type") + " " : "",
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
                : ""
            ])
          ),
          hardline,
          "{",
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
                : ""
            ])
          ),
          hardline,
          "{",
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
          indent(concat([line, path.call(print, "alternate")])),
          line,
          node.shortForm ? "endif;" : "}"
        ]);
      };
      return concat([
        group(
          concat([
            "if (",
            softline,
            path.call(print, "test"),
            softline,
            concat([")", node.shortForm ? ":" : " {"])
          ])
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
            concat([")", node.shortForm ? ":" : " {"])
          ])
        ),
        indent(concat([line, path.call(print, "body")])),
        line,
        node.shortForm ? "endwhile;" : "}"
      ]);
    case "for": {
      const parts = [
        "for (",
        group(
          concat([
            indent(
              concat([
                softline,
                group(
                  concat([
                    join(concat([",", line]), path.map(print, "init")),
                    ";"
                  ])
                ),
                line,
                group(
                  concat([
                    join(concat([",", line]), path.map(print, "test")),
                    ";"
                  ])
                ),
                line,
                group(join(concat([",", line]), path.map(print, "increment")))
              ])
            ),
            softline,
            node.body ? concat([")", node.shortForm ? ":" : " {"]) : ");"
          ])
        )
      ];
      if (node.body) {
        parts.push(
          concat([
            indent(concat([line, path.call(print, "body")])),
            line,
            node.shortForm ? "endfor;" : "}"
          ])
        );
      }
      return concat(parts);
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
            concat([")", node.shortForm ? ":" : " {"])
          ])
        ),
        indent(concat([line, path.call(print, "body")])),
        line,
        node.shortForm ? "endforeach;" : "}"
      ]);
    case "switch":
      return concat([
        group(
          concat([
            "switch (",
            softline,
            path.call(print, "test"),
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
    case "call":
      return group(
        concat([
          path.call(print, "what"),
          concat([
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
        ])
      );
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
      return group(
        concat([
          "new ",
          path.call(print, "what"),
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
          softline,
          ")"
        ])
      );
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
    case "identifier":
      // this is a hack until https://github.com/glayzzle/php-parser/issues/113 is resolved
      if (node.name === "\\array") {
        return "array";
      } else if (node.name === "\\callable") {
        return "callable";
      }
      return node.name;
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
        : join(hardline, node.lines.map(comment => concat(["// ", comment])));
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
