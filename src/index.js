"use strict";

const parse = require("./parser");
const print = require("./printer");
const clean = require("./clean");
const options = require("./options");

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

const loc = function(prop) {
  return function(node) {
    return node.loc && node.loc[prop] && node.loc[prop].offset;
  };
};

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
    getCommentChildNodes(node) {
      let children = node.children || node.body || node.traits;
      if (!children) {
        return [];
      }
      if (children.kind && children.kind === "block") {
        children = children.children;
      }
      return Array.isArray(children) ? children : [];
    },
    canAttachComment(node) {
      return (
        node.kind && node.kind !== "commentblock" && node.kind !== "commentline"
      );
    },
    printComment(commentPath) {
      const comment = commentPath.getValue();

      switch (comment.kind) {
        case "commentblock": {
          return comment.value;
        }
        case "commentline": {
          return comment.value.trimRight();
        }
        default:
          throw new Error("Not a comment: " + JSON.stringify(comment));
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
