"use strict";

const parse = require("./parser");
const print = require("./printer");
const clean = require("./clean");
const options = require("./options");
const comments = require("./comments");
const { join, hardline } = require("prettier").doc.builders;

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
            listNodes: [],
            nodes: ["key", "source", "value", "body"]
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
          kinds: ["call", "new"],
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
        },
        {
          kinds: ["parameter"],
          children: { listNodes: [], nodes: ["value"] }
        },
        {
          kinds: ["retif"],
          children: { listNodes: [], nodes: ["trueExpr", "falseExpr", "test"] }
        },
        {
          kinds: ["echo"],
          children: { listNodes: ["arguments"], nodes: [] }
        },
        {
          kinds: ["parenthesis"],
          children: { listNodes: [], nodes: ["inner"] }
        },
        {
          kinds: ["include"],
          children: { listNodes: [], nodes: ["target"] }
        },
        {
          kinds: ["throw", "clone"],
          children: { listNodes: [], nodes: ["what"] }
        },
        {
          kinds: ["list", "isset", "unset", "empty"],
          children: { listNodes: ["arguments"], nodes: [] }
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

          const lines = comment.value.split("\n");
          // if this is a block comment, handle indentation
          if (
            lines
              .slice(1, lines.length - 1)
              .every(line => line.trim()[0] === "*")
          ) {
            return join(
              hardline,
              lines.map(
                (line, index) =>
                  (index > 0 ? " " : "") +
                  (index < lines.length - 1 ? line.trim() : line.trimLeft())
              )
            );
          }

          // otherwise we can't be sure about indentation, so just print as is
          return comment.value;
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
