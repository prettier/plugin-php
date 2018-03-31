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
      const nodeMap = [
        {
          kinds: ["constant", "property", "classconstant"],
          children: { listNodes: [], nodes: ["value"] }
        },
        {
          kinds: ["return"],
          children: { listNodes: [], nodes: ["expr"] }
        },
        {
          kinds: ["array"],
          children: { listNodes: ["items"], nodes: [] }
        },
        {
          kinds: ["entry"],
          children: { listNodes: [], nodes: ["key", "value"] }
        },
        {
          kinds: ["assign"],
          children: { listNodes: [], nodes: ["left", "right"] }
        },
        {
          kinds: ["if"],
          children: { listNodes: [], nodes: ["body", "alternate", "test"] }
        },
        {
          kinds: ["block", "program", "namespace", "declare"],
          children: { listNodes: ["children"], nodes: [] }
        },
        {
          kinds: ["usegroup"],
          children: { listNodes: ["items"], nodes: [] }
        },
        {
          kinds: ["foreach"],
          children: {
            listNodes: ["children"],
            nodes: ["key", "source", "value"]
          }
        },
        {
          kinds: ["try"],
          children: {
            listNodes: ["catches"],
            nodes: ["always", "body"]
          }
        },
        {
          kinds: ["call"],
          children: { listNodes: ["arguments"], nodes: ["what"] }
        },
        {
          kinds: ["offsetlookup", "staticlookup"],
          children: { listNodes: [], nodes: ["what", "offset"] }
        },
        {
          kinds: ["catch"],
          children: {
            listNodes: ["what"],
            nodes: ["variable", "body"]
          }
        },
        {
          kinds: ["for", "while", "do"],
          children: { listNodes: [], nodes: ["body"] }
        },
        {
          kinds: ["trait", "class"],
          children: { listNodes: ["implements", "body"], nodes: ["extends"] }
        },
        {
          kinds: ["function", "method", "closure"],
          children: { listNodes: ["arguments", "uses"], nodes: ["body"] }
        },
        {
          kinds: ["switch", "case"],
          children: { listNodes: [], nodes: ["test", "body"] }
        },
        {
          kinds: ["bin"],
          children: { listNodes: [], nodes: ["left", "right"] }
        }
      ];
      const children = nodeMap.reduce((currentChildren, map) => {
        if (map.kinds.includes(node.kind)) {
          return [
            ...map.children.listNodes.reduce((accumulator, listNode) => {
              const childValue = node[listNode];
              return childValue ? [...accumulator, ...childValue] : accumulator;
            }, []),
            ...map.children.nodes.reduce((accumulator, childNode) => {
              const childValue = node[childNode];
              return childValue ? [...accumulator, childValue] : accumulator;
            }, [])
          ];
        }
        return currentChildren;
      }, false);
      return children !== false ? children : [];
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
                  .replace("//", "")
                  .replace("/*", "")
                  .replace("*/", "")
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
