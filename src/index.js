"use strict";

const parse = require("./parser");
const print = require("./printer");
const clean = require("./clean");
const options = require("./options");
const comments = require("./comments");
const { concat, join, hardline } = require("prettier").doc.builders;

const languages = [
  {
    name: "PHP",
    parsers: ["php"],
    tmScope: "text.html.php",
    aceMode: "php",
    codemirrorMode: "php",
    extensions: [
      ".php",
      ".aw",
      ".ctp",
      ".fcgi",
      ".inc",
      ".php3",
      ".php4",
      ".php5",
      ".phps",
      ".phpt"
    ],
    filenames: [".php_cs", ".php_cs.dist", "Phakefile"],
    vscodeLanguageIds: ["php"],
    linguistLanguageId: 272
  }
];

const loc = prop => node => node.loc && node.loc[prop] && node.loc[prop].offset;

const parsers = {
  php: {
    parse,
    astFormat: "php",
    locStart: loc("start"),
    locEnd: loc("end")
  }
};

const printers = {
  php: {
    print,
    massageAstNode: clean,
    // @TODO: determine if it makes sense to abstract this into a "getChildNodes" util function
    getCommentChildNodes(node) {
      if (node.kind === "array") {
        return node.items;
      }
      if (node.kind === "assign") {
        return [node.left, node.right];
      }
      if (node.kind === "if") {
        return [node.body, node.alternate, node.test];
      }
      if (node.kind === "foreach") {
        return [
          ...(node.body.children || []),
          node.key,
          node.source,
          node.value
        ];
      }
      if (node.kind === "try") {
        return [
          ...((node.always && node.always.children) || []),
          ...((node.body && node.body.children) || []),
          ...(node.catches || [])
        ];
      }
      if (node.kind === "catch") {
        return [
          ...(node.what || []),
          ...(node.variable ? [node.variable] : []),
          ...(node.body.children || [])
        ];
      }
      if (node.kind === "for") {
        return [node.body.children];
      }
      if (node.kind === "class") {
        return [
          ...(node.body || []),
          ...(node.implements || []),
          ...(node.extends ? [node.extends] : [])
        ];
      }
      if (node.kind === "function" || node.kind === "method") {
        return [...(node.body.children || []), ...(node.arguments || [])];
      }
      if (node.body) {
        // for some nodes body is array, others its a block node
        return Array.isArray(node.body) ? node.body : [node.body];
      }
      const children = node.children || node.traits || node.arguments;
      return children ? children : [];
    },
    canAttachComment(node) {
      return (
        node.kind && node.kind !== "commentblock" && node.kind !== "commentline"
      );
    },
    handleComments: {
      ownLine: comments.handleOwnLineComment,
      endOfLine: comments.handleEndOfLineComment,
      remaining: comments.handleRemainingComment
    },
    printComment(commentPath) {
      const comment = commentPath.getValue();

      switch (comment.kind) {
        case "commentblock": {
          // for now, don't touch single line block comments
          if (!comment.value.includes("\n")) {
            return comment.value;
          }

          // if this is not a doc comment, just print as is, replacing new lines
          if (
            !(
              comment.value.startsWith("/* ") ||
              comment.value.startsWith("/** ") ||
              comment.value.startsWith("/*\n") ||
              comment.value.startsWith("/**\n")
            )
          ) {
            return join(hardline, comment.value.split("\n"));
          }

          // if this is a doc comment, lets try to make it a little pretty
          const lines = comment.value.split("\n");

          const linesToPrint = [];
          let canPrintBlankLine = false;
          lines.forEach((line, index) => {
            const lineContainsRealText = /[^(*|/|\s)]/.test(line);
            if (
              !lineContainsRealText &&
              canPrintBlankLine &&
              index < lines.length - 1
            ) {
              linesToPrint.push("");
              canPrintBlankLine = false;
            } else if (lineContainsRealText) {
              linesToPrint.push(
                line
                  .replace("/", "")
                  .replace("*", "")
                  .trim()
              );
              canPrintBlankLine = true;
            }
          });
          return concat([
            "/**",
            hardline,
            join(
              hardline,
              linesToPrint.map(line => {
                return ` *${line.length > 0 ? ` ${line}` : ""}`;
              })
            ),
            hardline,
            " */"
          ]);
        }
        case "commentline": {
          return comment.value.trimRight();
        }
        default:
          throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
      }
    }
  }
};

module.exports = {
  languages,
  printers,
  parsers,
  options,
  defaultOptions: {
    tabWidth: 4
  }
};
