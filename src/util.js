"use strict";

const {
  hasNewline,
  skipEverythingButNewLine,
  skipNewline,
  isNextLineEmpty: _isNextLineEmpty,
  isPreviousLineEmpty: _isPreviousLineEmpty,
  getNextNonSpaceNonCommentCharacterIndex: _getNextNonSpaceNonCommentCharacterIndex,
} = require("prettier").util;

const prettierVersion = require("prettier").version;

function lookupIfPrettier2(options, prop) {
  return parseInt(prettierVersion[0]) > 1 ? options[prop] : options;
}

function isPreviousLineEmpty(text, node, options) {
  return _isPreviousLineEmpty(
    text,
    node,
    lookupIfPrettier2(options, "locStart")
  );
}

function isNextLineEmpty(text, node, options) {
  return _isNextLineEmpty(text, node, lookupIfPrettier2(options, "locEnd"));
}

function getNextNonSpaceNonCommentCharacterIndex(text, node, options) {
  return _getNextNonSpaceNonCommentCharacterIndex(
    text,
    node,
    lookupIfPrettier2(options, "locEnd")
  );
}

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
      // Remove unnecessary .e notation
      .replace(/\.(?=e)/, "")
  );
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
    ">>=",
  ],
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
  ["instanceof"],
  ["++", "--", "~"],
  ["**"],
].forEach((tier, i) => {
  tier.forEach((op) => {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

const equalityOperators = ["==", "!=", "===", "!==", "<>", "<=>"];
const multiplicativeOperators = ["*", "/", "%"];
const bitshiftOperators = [">>", "<<"];

function isBitwiseOperator(operator) {
  return (
    !!bitshiftOperators[operator] ||
    operator === "|" ||
    operator === "^" ||
    operator === "&"
  );
}

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

  // x * y / z --> (x * y) / z
  // x / y * z --> (x / y) * z
  if (
    nodeOp !== parentOp &&
    multiplicativeOperators.includes(nodeOp) &&
    multiplicativeOperators.includes(parentOp)
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
    "declare",
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

function isFirstChildrenInlineNode(path) {
  const node = path.getValue();

  if (node.kind === "program") {
    const children = getNodeListProperty(node);

    if (!children || children.length === 0) {
      return false;
    }

    return children[0].kind === "inline";
  }

  if (node.kind === "switch") {
    if (!node.body) {
      return false;
    }

    const children = getNodeListProperty(node.body);

    if (children.length === 0) {
      return false;
    }

    const [firstCase] = children;

    if (!firstCase.body) {
      return false;
    }

    const firstCaseChildren = getNodeListProperty(firstCase.body);

    if (firstCaseChildren.length === 0) {
      return false;
    }

    return firstCaseChildren[0].kind === "inline";
  }

  const firstChild = getBodyFirstChild(node);

  if (!firstChild) {
    return false;
  }

  return firstChild.kind === "inline";
}

function isDocNode(node) {
  return (
    node.kind === "nowdoc" ||
    (node.kind === "encapsed" && node.type === "heredoc")
  );
}

/**
 * Heredoc/Nowdoc nodes need a trailing linebreak if they
 * appear as function arguments or array elements
 */
function docShouldHaveTrailingNewline(path, recurse = 0) {
  const node = path.getNode(recurse);
  const parent = path.getNode(recurse + 1);
  const parentParent = path.getNode(recurse + 2);

  if (!parent) {
    return false;
  }

  if (
    (parentParent &&
      ["call", "new", "echo"].includes(parentParent.kind) &&
      !["call", "array"].includes(parent.kind)) ||
    parent.kind === "parameter"
  ) {
    const lastIndex = parentParent.arguments.length - 1;
    const index = parentParent.arguments.indexOf(parent);

    return index !== lastIndex;
  }

  if (parentParent && parentParent.kind === "for") {
    const initIndex = parentParent.init.indexOf(parent);

    if (initIndex !== -1) {
      return initIndex !== parentParent.init.length - 1;
    }

    const testIndex = parentParent.test.indexOf(parent);

    if (testIndex !== -1) {
      return testIndex !== parentParent.test.length - 1;
    }

    const incrementIndex = parentParent.increment.indexOf(parent);

    if (incrementIndex !== -1) {
      return incrementIndex !== parentParent.increment.length - 1;
    }
  }

  if (parent.kind === "bin") {
    return (
      parent.left === node || docShouldHaveTrailingNewline(path, recurse + 1)
    );
  }

  if (parent.kind === "case" && parent.test === node) {
    return true;
  }

  if (parent.kind === "staticvariable") {
    const lastIndex = parentParent.variables.length - 1;
    const index = parentParent.variables.indexOf(parent);

    return index !== lastIndex;
  }

  if (parent.kind === "entry") {
    if (parent.key === node) {
      return true;
    }

    const lastIndex = parentParent.items.length - 1;
    const index = parentParent.items.indexOf(parent);

    return index !== lastIndex;
  }

  if (["call", "new"].includes(parent.kind)) {
    const lastIndex = parent.arguments.length - 1;
    const index = parent.arguments.indexOf(node);

    return index !== lastIndex;
  }

  if (parent.kind === "echo") {
    const lastIndex = parent.expressions.length - 1;
    const index = parent.expressions.indexOf(node);

    return index !== lastIndex;
  }

  if (parent.kind === "array") {
    const lastIndex = parent.items.length - 1;
    const index = parent.items.indexOf(node);

    return index !== lastIndex;
  }

  if (parent.kind === "retif") {
    return docShouldHaveTrailingNewline(path, recurse + 1);
  }

  return false;
}

function lineShouldEndWithSemicolon(path) {
  const node = path.getValue();
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
  if (node.kind === "echo" && node.shortForm) {
    return false;
  }
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
  return [
    "expressionstatement",
    "do",
    "usegroup",
    "classconstant",
    "propertystatement",
    "traitprecedence",
    "traitalias",
    "goto",
    "constantstatement",
    "global",
    "static",
    "echo",
    "unset",
    "return",
    "break",
    "continue",
    "throw",
  ].includes(node.kind);
}

function fileShouldEndWithHardline(path) {
  const node = path.getValue();
  const isProgramNode = node.kind === "program";
  const lastNode = node.children && getLast(node.children);

  if (!isProgramNode) {
    return false;
  }

  if (lastNode && ["halt", "inline"].includes(lastNode.kind)) {
    return false;
  }

  if (
    lastNode &&
    (lastNode.kind === "declare" || lastNode.kind === "namespace")
  ) {
    const lastNestedNode =
      lastNode.children.length > 0 && getLast(lastNode.children);

    if (lastNestedNode && ["halt", "inline"].includes(lastNestedNode.kind)) {
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
    node.comments.some((comment) => !comment.leading && !comment.trailing)
  );
}

function hasLeadingComment(node) {
  return node.comments && node.comments.some((comment) => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some((comment) => comment.trailing);
}

function isLookupNode(node) {
  return (
    node.kind === "propertylookup" ||
    node.kind === "staticlookup" ||
    node.kind === "offsetlookup"
  );
}

function shouldPrintHardLineAfterStartInControlStructure(path) {
  const node = path.getValue();

  if (["try", "catch"].includes(node.kind)) {
    return false;
  }

  return isFirstChildrenInlineNode(path);
}

function shouldPrintHardLineBeforeEndInControlStructure(path) {
  const node = path.getValue();

  if (["try", "catch"].includes(node.kind)) {
    return true;
  }

  if (node.kind === "switch") {
    const children = getNodeListProperty(node.body);

    if (children.length === 0) {
      return true;
    }

    const lastCase = getLast(children);

    if (!lastCase.body) {
      return true;
    }

    const childrenInCase = getNodeListProperty(lastCase.body);

    if (childrenInCase.length === 0) {
      return true;
    }

    return childrenInCase[0].kind !== "inline";
  }

  return !isFirstChildrenInlineNode(path);
}

function getAlignment(text) {
  const lines = text.split("\n");
  const lastLine = lines.pop();

  return lastLine.length - lastLine.trimLeft().length + 1;
}

function getNextNode(path, node) {
  const parent = path.getParentNode();
  const children = getNodeListProperty(parent);

  if (!children) {
    return null;
  }

  const index = children.indexOf(node);

  if (index === -1) {
    return null;
  }

  return parent.children[index + 1];
}

function isProgramLikeNode(node) {
  return ["program", "declare", "namespace"].includes(node.kind);
}

function isReferenceLikeNode(node) {
  return [
    "name",
    "parentreference",
    "selfreference",
    "staticreference",
  ].includes(node.kind);
}

// Return `logical` value for `bin` node containing `||` or `&&` type otherwise return kind of node.
// Require for grouping logical and binary nodes in right way.
function getNodeKindIncludingLogical(node) {
  if (node.kind === "bin" && ["||", "&&"].includes(node.type)) {
    return "logical";
  }

  return node.kind;
}

/**
 * Check if string can safely be converted from double to single quotes, i.e.
 *
 * - no embedded variables ("foo $bar")
 * - no linebreaks
 * - no special characters like \n, \t, ...
 * - no octal/hex/unicode characters
 *
 * See http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
 */
function useDoubleQuote(node, options) {
  if (node.isDoubleQuote && options.singleQuote) {
    const rawValue = node.raw.slice(node.raw[0] === "b" ? 2 : 1, -1);

    return rawValue.match(
      /\\([$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})|\r?\n|'|"/
    );
  }

  return node.isDoubleQuote;
}

function hasEmptyBody(path, name = "body") {
  const node = path.getValue();

  return (
    node[name] &&
    node[name].children &&
    node[name].children.length === 0 &&
    (!node[name].comments || node[name].comments.length === 0)
  );
}

function isNextLineEmptyAfterNamespace(text, node, locStart) {
  let idx = locStart(node);
  idx = skipEverythingButNewLine(text, idx);
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function shouldPrintHardlineBeforeTrailingComma(lastElem) {
  if (
    lastElem.kind === "nowdoc" ||
    (lastElem.kind === "encapsed" && lastElem.type === "heredoc")
  ) {
    return true;
  }

  if (
    lastElem.kind === "entry" &&
    (lastElem.value.kind === "nowdoc" ||
      (lastElem.value.kind === "encapsed" && lastElem.value.type === "heredoc"))
  ) {
    return true;
  }

  return false;
}

function getAncestorCounter(path, typeOrTypes) {
  const types = [].concat(typeOrTypes);
  let counter = -1;
  let ancestorNode;
  while ((ancestorNode = path.getParentNode(++counter))) {
    if (types.indexOf(ancestorNode.kind) !== -1) {
      return counter;
    }
  }
  return -1;
}

function getAncestorNode(path, typeOrTypes) {
  const counter = getAncestorCounter(path, typeOrTypes);
  return counter === -1 ? null : path.getParentNode(counter);
}

const magicMethods = [
  "__construct",
  "__destruct",
  "__call",
  "__callStatic",
  "__get",
  "__set",
  "__isset",
  "__unset",
  "__sleep",
  "__wakeup",
  "__toString",
  "__invoke",
  "__set_state",
  "__clone",
  "__debugInfo",
];
const MagicMethodsMap = magicMethods.reduce((map, obj) => {
  map[obj.toLowerCase()] = obj;

  return map;
}, {});

function normalizeMagicMethodName(name) {
  const loweredName = name.toLowerCase();

  if (MagicMethodsMap[loweredName]) {
    return MagicMethodsMap[loweredName];
  }

  return name;
}

module.exports = {
  printNumber,
  getPrecedence,
  isBitwiseOperator,
  shouldFlatten,
  nodeHasStatement,
  getNodeListProperty,
  getParentNodeListProperty,
  getLast,
  getPenultimate,
  isLastStatement,
  getBodyFirstChild,
  lineShouldEndWithSemicolon,
  fileShouldEndWithHardline,
  maybeStripLeadingSlashFromUse,
  hasDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  docShouldHaveTrailingNewline,
  isLookupNode,
  isFirstChildrenInlineNode,
  shouldPrintHardLineAfterStartInControlStructure,
  shouldPrintHardLineBeforeEndInControlStructure,
  getAlignment,
  isProgramLikeNode,
  isReferenceLikeNode,
  getNodeKindIncludingLogical,
  useDoubleQuote,
  hasEmptyBody,
  isNextLineEmptyAfterNamespace,
  shouldPrintHardlineBeforeTrailingComma,
  isDocNode,
  getAncestorNode,
  getNextNode,
  normalizeMagicMethodName,
  isPreviousLineEmpty,
  isNextLineEmpty,
  getNextNonSpaceNonCommentCharacterIndex,
};
