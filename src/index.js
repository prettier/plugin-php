"use strict";

const parse = require("./parser");
const print = require("./printer");
const clean = require("./clean");
const options = require("./options");
const comments = require("./comments");
const { join, hardline } = require("prettier").doc.builders;
const { hasPragma, insertPragma } = require("./pragma");

function createLanguage(linguistData, { extend, override }) {
  const language = {};

  for (const key in linguistData) {
    const newKey = key === "languageId" ? "linguistLanguageId" : key;
    language[newKey] = linguistData[key];
  }

  if (extend) {
    for (const key in extend) {
      language[key] = (language[key] || []).concat(extend[key]);
    }
  }

  for (const key in override) {
    language[key] = override[key];
  }

  return language;
}

const languages = [
  createLanguage(require("linguist-languages/data/PHP"), {
    override: {
      parsers: ["php"],
      vscodeLanguageIds: ["php"],
    },
  }),
  createLanguage(require("linguist-languages/data/HTML+PHP"), {
    override: {
      parsers: ["php"],
      vscodeLanguageIds: ["php"],
    },
  }),
];

const loc = (prop) => (node) => {
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};

const parsers = {
  php: {
    parse,
    astFormat: "php",
    locStart: loc("start"),
    locEnd: loc("end"),
    hasPragma,
  },
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
      remaining: comments.handleRemainingComment,
    },
    willPrintOwnComments(path) {
      const node = path.getValue();

      return node && node.kind === "noop";
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
              .every((line) => line.trim()[0] === "*")
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
      const isSimpleIgnore = (comment) =>
        comment.value.includes("prettier-ignore") &&
        !comment.value.includes("prettier-ignore-start") &&
        !comment.value.includes("prettier-ignore-end");

      const parentNode = path.getParentNode();
      const node = path.getNode();

      return (
        (node &&
          node.kind !== "classconstant" &&
          node.comments &&
          node.comments.length > 0 &&
          node.comments.some(isSimpleIgnore)) ||
        // For proper formatting, the classconstant ignore formatting should
        // run on the "constant" child
        (node &&
          node.kind === "constant" &&
          parentNode &&
          parentNode.kind === "classconstant" &&
          parentNode.comments &&
          parentNode.comments.length > 0 &&
          parentNode.comments.some(isSimpleIgnore))
      );
    },
  },
};

module.exports = {
  languages,
  printers,
  parsers,
  options,
  defaultOptions: {
    tabWidth: 4,
  },
};
