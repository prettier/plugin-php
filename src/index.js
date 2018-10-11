"use strict";

const parse = require("./parser");
const print = require("./printer");
const clean = require("./clean");
const options = require("./options");
const comments = require("./comments");
const { join, hardline } = require("prettier").doc.builders;
const { hasPragma, insertPragma } = require("./pragma");

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

// for anonymous classes, we need to keep track of the parent "new" node.
// this is because in a case like this:
//   $test = new class($arg1, $arg2) extends TestClass {};
// we actually want to pretend that the class node starts after the "new"
// node's arguments, since there is logic in prettier that assumes child nodes
// will never overlap each other (ie the "new" node has the arguments, and class
// as children, and we can't have them overlap)
const anonymousClassesNewNodes = [];
const loc = prop => node => {
  if (
    node.kind === "new" &&
    node.what.kind === "class" &&
    node.what.isAnonymous &&
    node.arguments.length > 0 &&
    !anonymousClassesNewNodes.includes(node)
  ) {
    anonymousClassesNewNodes.push(node);
  }
  if (prop === "start" && node.kind === "class" && node.isAnonymous) {
    const parentNewNode = anonymousClassesNewNodes.find(
      newNode => newNode.what === node
    );
    if (parentNewNode && parentNewNode.arguments.length > 0) {
      const lastArgumentNode =
        parentNewNode.arguments[parentNewNode.arguments.length - 1];
      // if this is an anonymous class node with a parent "new" node, use the
      // location of the last argument in the new node as the fake start location
      // for this class node
      return (
        (lastArgumentNode.loc &&
          lastArgumentNode.loc.end &&
          lastArgumentNode.loc.end.offset) + 1
      );
    }
  }
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};

const parsers = {
  php: {
    parse,
    astFormat: "php",
    locStart: loc("start"),
    locEnd: loc("end"),
    hasPragma
  }
};

const printers = {
  php: {
    print,
    insertPragma,
    massageAstNode: clean,
    getCommentChildNodes: comments.getCommentChildNodes,
    canAttachComment: comments.canAttachComment,
    isBlockComment: comments.isBlockComment,
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

          const lines = comment.value.split(/\r?\n/g);
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
        /* istanbul ignore next */
        default:
          throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
      }
    },
    hasPrettierIgnore(path) {
      const node = path.getNode();
      return (
        node &&
        node.comments &&
        node.comments.length > 0 &&
        node.comments.some(comment => comment.value.includes("prettier-ignore"))
      );
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
