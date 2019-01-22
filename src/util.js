"use strict";

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
  ["**"]
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
function docShouldHaveTrailingNewline(path) {
  const node = path.getValue();
  const parent = path.getParentNode();
  const parentParent = path.getParentNode(1);

  if (!parent) {
    return false;
  }

  if (
    (parentParent && ["call", "new", "echo"].includes(parentParent.kind)) ||
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
    if (parentParent && parentParent.kind === "bin") {
      return true;
    }

    return parent.left === node;
  }

  if (parent.kind === "case" && parent.test === node) {
    return true;
  }

  if (
    (parent.kind === "assign" &&
      parent.right === node &&
      parentParent &&
      parentParent.kind === "static") ||
    parent.kind === "entry"
  ) {
    if (parent.kind === "entry" && parent.key === node) {
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
  const semiColonWhitelist = [
    "expressionstatement",
    "array",
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
    "constantstatement",
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
    "staticlookup",
    "offsetlookup",
    "silent",
    "usegroup",
    "property",
    "string",
    "boolean",
    "number",
    "nowdoc",
    "encapsed",
    "variable",
    "cast",
    "clone",
    "do",
    "constref"
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
    node.comments.some(comment => !comment.leading && !comment.trailing)
  );
}

function hasLeadingComment(node) {
  return node.comments && node.comments.some(comment => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some(comment => comment.trailing);
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

function getFirstNestedChildNode(node) {
  if (node.children && node.children.length > 0) {
    return getFirstNestedChildNode(node.children[0]);
  }

  return node;
}

function getLastNestedChildNode(node) {
  if (node.children && node.children.length > 0) {
    return getFirstNestedChildNode(node.children[node.children.length - 1]);
  }

  return node;
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
    "classreference",
    "parentreference",
    "selfreference",
    "staticreference"
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

function skip(chars) {
  return (text, index, opts) => {
    const backwards = opts && opts.backwards;

    // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).
    if (index === false) {
      return false;
    }

    const { length } = text;
    let cursor = index;
    while (cursor >= 0 && cursor < length) {
      const c = text.charAt(cursor);
      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }
    return false;
  };
}

const skipSpaces = skip(" \t");
const skipEverythingButNewLine = skip(/[^\r\n]/);

// This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.
function skipNewline(text, index, opts) {
  const backwards = opts && opts.backwards;
  if (index === false) {
    return false;
  }

  const atIndex = text.charAt(index);
  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index + 1;
    }
  }

  return index;
}

// TODO: remove after resolve https://github.com/prettier/prettier/pull/5049
function hasNewline(text, index, opts) {
  opts = opts || {};
  const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  const idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
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
function useSingleQuote(node, options) {
  return (
    !node.isDoubleQuote ||
    (options.singleQuote &&
      !node.raw.match(/\\n|\\t|\\r|\\t|\\v|\\e|\\f/) &&
      !node.value.match(
        /["'$\n]|\\[0-7]{1,3}|\\x[0-9A-Fa-f]{1,2}|\\u{[0-9A-Fa-f]+}/
      ))
  );
}

// TODO: remove after resolve https://github.com/prettier/prettier/pull/5049
function hasNewlineInRange(text, start, end) {
  for (let i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }
  return false;
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
  getFirstNestedChildNode,
  getLastNestedChildNode,
  isProgramLikeNode,
  isReferenceLikeNode,
  getNodeKindIncludingLogical,
  hasNewline,
  useSingleQuote,
  hasNewlineInRange,
  hasEmptyBody,
  isNextLineEmptyAfterNamespace,
  shouldPrintHardlineBeforeTrailingComma,
  isDocNode,
  getAncestorNode,
  getNextNode
};
