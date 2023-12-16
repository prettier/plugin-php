import { doc } from "prettier";
import {
  LINGUIST_LANGUAGES_PHP,
  LINGUIST_LANGUAGES_HTML_PHP,
} from "./linguist-languages.cjs";
import parse from "./parser.mjs";
import print from "./printer.mjs";
import clean from "./clean.mjs";
import options from "./options.mjs";
import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  getCommentChildNodes,
  canAttachComment,
  isBlockComment,
} from "./comments.mjs";
import { hasPragma, insertPragma } from "./pragma.mjs";
import { locStart, locEnd } from "./loc.mjs";

const { join, hardline } = doc.builders;

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
  createLanguage(LINGUIST_LANGUAGES_PHP, {
    override: {
      parsers: ["php"],
      vscodeLanguageIds: ["php"],
    },
  }),
  createLanguage(LINGUIST_LANGUAGES_HTML_PHP, {
    override: {
      parsers: ["php"],
      vscodeLanguageIds: ["php"],
    },
  }),
];

const parsers = {
  php: {
    parse,
    astFormat: "php",
    locStart,
    locEnd,
    hasPragma,
  },
};

const ignoredKeys = new Set([
  "kind",
  "loc",
  "errors",
  "extra",
  "comments",
  "leadingComments",
  "enclosingNode",
  "precedingNode",
  "followingNode",
]);
function getVisitorKeys(node, nonTraversableKeys) {
  return Object.keys(node).filter(
    (key) => !nonTraversableKeys.has(key) && !ignoredKeys.has(key)
  );
}

const printers = {
  php: {
    print,
    getVisitorKeys,
    insertPragma,
    massageAstNode: clean,
    getCommentChildNodes,
    canAttachComment,
    isBlockComment,
    handleComments: {
      ownLine: handleOwnLineComment,
      endOfLine: handleEndOfLineComment,
      remaining: handleRemainingComment,
    },
    willPrintOwnComments(path) {
      const { node } = path;

      return node && node.kind === "noop";
    },
    printComment(path) {
      const comment = path.node;

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
        /* c8 ignore next 2 */
        default:
          throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
      }
    },
    hasPrettierIgnore(path) {
      const isSimpleIgnore = (comment) =>
        comment.value.includes("prettier-ignore") &&
        !comment.value.includes("prettier-ignore-start") &&
        !comment.value.includes("prettier-ignore-end");

      const { node, parent: parentNode } = path;

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

const defaultOptions = {
  tabWidth: 4,
};

export { languages, printers, parsers, options, defaultOptions };
