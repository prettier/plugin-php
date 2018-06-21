"use strict";

const docUtils = require("prettier").doc.utils;

function printNumber(rawNumber) {
  return (
    rawNumber
      .toLowerCase()
      // Remove unnecessary plus and zeroes from scientific notation.
      .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3")
      // Remove unnecessary scientific notation (1e0).
      .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
      // Make sure numbers always start with a digit.
      .replace(/^([+-])?\./, "$10.")
      // Remove extraneous trailing decimal zeroes.
      .replace(/(\.\d+?)0+(?=e|$)/, "$1")
      // Remove trailing dot.
      .replace(/\.(?=e|$)/, "")
  );
}

// @TODO: if we're using the "raw" value from the parser, do we need this?
function stringEscape(str) {
  return str.replace(/[\n\r\t\v\f\u001b\\]/g, (character, index) => {
    switch (character) {
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      case "\v":
        return "\\v";
      case "\f":
        return "\\f";
      case "\u001b":
        return "\\e";
      case "\\": {
        const nextCharacter = str[index + 1];
        return !nextCharacter || !/[ux0-7]/.test(nextCharacter) ? "\\\\" : "\\";
      }
    }
  });
}

// http://php.net/manual/en/language.operators.precedence.php
const PRECEDENCE = {};
[
  ["or"],
  ["xor"],
  ["and"],
  [
    "=",
    "+=",
    "-=",
    "*=",
    "**=",
    "/=",
    ".=",
    "%=",
    "&=",
    "|=",
    "^=",
    "<<=",
    ">>="
  ],
  ["?:"],
  ["??"],
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!==", "<>", "<=>"],
  ["<", ">", "<=", ">="],
  [">>", "<<"],
  ["+", "-", "."],
  ["*", "/", "%"],
  ["!"],
  ["++", "--", "~"],
  ["**"],
  ["["],
  ["clone", "new"]
].forEach((tier, i) => {
  tier.forEach(op => {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

const equalityOperators = ["==", "!=", "===", "!==", "<>", "<=>"];
const multiplicativeOperators = ["*", "/", "%"];
const bitshiftOperators = [">>", "<<"];

function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  }

  // ** is right-associative
  // x ** y ** z --> x ** (y ** z)
  if (parentOp === "**") {
    return false;
  }

  // x == y == z --> (x == y) == z
  if (
    equalityOperators.includes(parentOp) &&
    equalityOperators.includes(nodeOp)
  ) {
    return false;
  }

  // x * y % z --> (x * y) % z
  if (
    (nodeOp === "%" && multiplicativeOperators.includes(parentOp)) ||
    (parentOp === "%" && multiplicativeOperators.includes(nodeOp))
  ) {
    return false;
  }

  // x << y << z --> (x << y) << z
  if (
    bitshiftOperators.includes(parentOp) &&
    bitshiftOperators.includes(nodeOp)
  ) {
    return false;
  }

  return true;
}

function nodeHasStatement(node) {
  return [
    "block",
    "program",
    "namespace",
    "class",
    "interface",
    "trait",
    "traituse",
    "declare"
  ].includes(node.kind);
}

function getBodyFirstChild({ body }) {
  if (!body) {
    return null;
  }
  if (body.kind === "block") {
    body = body.children;
  }
  return body[0];
}

function removeNewlines(doc) {
  return docUtils.mapDoc(doc, d => {
    if (d.type === "line") {
      return d.soft ? "" : " ";
    } else if (d.type === "if-break") {
      return d.flatContents || "";
    }
    return d;
  });
}

function getNodeListProperty(node) {
  const body = node.children || node.body || node.adaptations;
  return Array.isArray(body) ? body : null;
}

function getParentNodeListProperty(path) {
  const parent = path.getParentNode();
  if (!parent) {
    return null;
  }
  return getNodeListProperty(parent);
}

function getNodeIndex(path) {
  const body = getParentNodeListProperty(path);
  if (!body) {
    return -1;
  }
  return body.indexOf(path.getValue());
}

function getLast(arr) {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }
  return null;
}

function getPenultimate(arr) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }
  return null;
}

function isLastStatement(path) {
  const body = getParentNodeListProperty(path);
  if (!body) {
    return true;
  }
  const node = path.getValue();
  return body[body.length - 1] === node;
}

function isLastNodeInParentNode(path) {
  const parentNodeBody = getParentNodeListProperty(path);
  const nodeIndex = getNodeIndex(path);
  return parentNodeBody && nodeIndex === parentNodeBody.length - 1;
}

function getPreviousNodeInParentListProperty(path) {
  const nodeIndex = getNodeIndex(path);
  const parentNodeBody = getParentNodeListProperty(path);
  const prevNode = nodeIndex !== -1 && parentNodeBody[nodeIndex - 1];
  return prevNode;
}

function getNextNodeInParentListProperty(path) {
  const nodeIndex = getNodeIndex(path);
  const parentNodeBody = getParentNodeListProperty(path);
  const nextNode = nodeIndex !== -1 && parentNodeBody[nodeIndex + 1];
  return nextNode;
}

function isPrevNodeInline(path) {
  const prevNode = getPreviousNodeInParentListProperty(path);
  return prevNode && prevNode.kind === "inline";
}

function isNextNodeInline(path) {
  const nextNode = getNextNodeInParentListProperty(path);
  return nextNode && nextNode.kind === "inline";
}

function isNodeFullyNestedInline(path) {
  const node = path.getValue();
  const nodeIndex = getNodeIndex(path);
  const parentNodeBody = getParentNodeListProperty(path);
  const prevNode = nodeIndex !== -1 && parentNodeBody[nodeIndex - 1];
  const nextNode = nodeIndex !== -1 && parentNodeBody[nodeIndex + 1];
  const parentNode = path.getParentNode();
  if (nodeIndex === 0 && parentNode && parentNode.kind === "program") {
    return (
      nextNode && nextNode.kind === "inline" && !node.loc.source.includes("?>")
    );
  }
  return (
    nextNode &&
    prevNode &&
    nextNode.kind === "inline" &&
    prevNode.kind === "inline" &&
    !node.loc.source.includes("?>")
  );
}

function isNextNodeFullyNestedInline(path) {
  const node = path.getValue();
  const nodeIndex = getNodeIndex(path);
  const parentNodeBody = getParentNodeListProperty(path);
  const nextNode = nodeIndex !== -1 && parentNodeBody[nodeIndex + 1];
  const nextNextNode = nodeIndex !== -1 && parentNodeBody[nodeIndex + 2];
  return (
    node &&
    nextNextNode &&
    node.kind === "inline" &&
    nextNextNode.kind === "inline" &&
    !nextNode.loc.source.includes("?>")
  );
}

function isPreviousNodeFullyNestedInline(path) {
  const node = path.getValue();
  const nodeIndex = getNodeIndex(path);
  const parentNodeBody = getParentNodeListProperty(path);
  const prevNode = nodeIndex !== -1 && parentNodeBody[nodeIndex - 1];
  const prevPrevNode = nodeIndex !== -1 && parentNodeBody[nodeIndex - 2];
  const parentNode = path.getParentNode();
  if (nodeIndex === 1 && parentNode && parentNode.kind === "program") {
    return (
      node && node.kind === "inline" && !prevNode.loc.source.includes("?>")
    );
  }
  return (
    node &&
    prevPrevNode &&
    node.kind === "inline" &&
    prevPrevNode.kind === "inline" &&
    !prevNode.loc.source.includes("?>")
  );
}

/**
 * Heredoc/Nowdoc nodes need a trailing linebreak if they
 * appear as function arguments or array elements
 */
function docShouldHaveTrailingNewline(path) {
  return ["entry"].includes(path.getParentNode().kind);
}

function lineShouldEndWithSemicolon(path) {
  let node = path.getValue();
  while (node.kind === "parenthesis") {
    node = node.inner;
  }
  const parentNode = path.getParentNode();
  if (!parentNode) {
    return false;
  }
  // for single line control structures written in a shortform (ie without a block),
  // we need to make sure the single body node gets a semicolon
  if (
    ["for", "foreach", "while", "do", "if", "switch"].includes(
      parentNode.kind
    ) &&
    node.kind !== "block" &&
    node.kind !== "if" &&
    (parentNode.body === node || parentNode.alternate === node)
  ) {
    return true;
  }
  if (!nodeHasStatement(parentNode)) {
    return false;
  }
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
    "eval",
    "propertylookup",
    "offsetlookup",
    "silent",
    "usegroup",
    "property",
    "string",
    "boolean",
    "number",
    "nowdoc",
    "encapsed"
  ];
  if (node.kind === "traituse") {
    return !node.adaptations;
  }
  if (node.kind === "method" && node.isAbstract) {
    return true;
  }
  if (node.kind === "method") {
    const parent = path.getParentNode();
    if (parent && parent.kind === "interface") {
      return true;
    }
  }
  return semiColonWhitelist.includes(node.kind);
}

function fileShouldEndWithHardline(path) {
  const node = path.getValue();
  const isProgramNode = node.kind === "program";
  const lastNode = node.children && getLast(node.children);
  if (!isProgramNode) {
    return false;
  }
  if (
    lastNode &&
    lastNode.kind === "inline" &&
    lastNode.raw[lastNode.raw.length - 1] === "\n"
  ) {
    return false;
  }
  if (lastNode && lastNode.kind === "declare") {
    const lastNestedNode = lastNode.children && getLast(lastNode.children);
    if (
      lastNestedNode &&
      lastNestedNode.kind === "inline" &&
      lastNode.raw[lastNode.raw.length - 1] === "\n"
    ) {
      return false;
    }
  }
  return true;
}

function maybeStripLeadingSlashFromUse(name) {
  const nameWithoutLeadingSlash = name.replace(/^\\/, "");
  if (nameWithoutLeadingSlash.indexOf("\\") !== -1) {
    return nameWithoutLeadingSlash;
  }
  return name;
}

function hasDanglingComments(node) {
  return (
    node.comments &&
    node.comments.some(comment => !comment.leading && !comment.trailing)
  );
}

function hasLeadingComment(node) {
  return node.comments && node.comments.some(comment => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some(comment => comment.trailing);
}

function isMemberish(node) {
  return (
    node.kind === "propertylookup" ||
    node.kind === "staticlookup" ||
    node.kind === "offsetlookup"
  );
}

module.exports = {
  printNumber,
  stringEscape,
  getPrecedence,
  shouldFlatten,
  nodeHasStatement,
  getNodeListProperty,
  getParentNodeListProperty,
  getNodeIndex,
  getLast,
  getPenultimate,
  isLastStatement,
  getBodyFirstChild,
  isLastNodeInParentNode,
  isNextNodeInline,
  lineShouldEndWithSemicolon,
  fileShouldEndWithHardline,
  removeNewlines,
  maybeStripLeadingSlashFromUse,
  hasDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  docShouldHaveTrailingNewline,
  isMemberish,
  isPrevNodeInline,
  getPreviousNodeInParentListProperty,
  getNextNodeInParentListProperty,
  isNodeFullyNestedInline,
  isNextNodeFullyNestedInline,
  isPreviousNodeFullyNestedInline
};
