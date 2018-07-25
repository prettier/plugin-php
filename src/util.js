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
    "variable"
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
  if (
    lastNode &&
    (lastNode.kind === "declare" || lastNode.kind === "namespace")
  ) {
    const lastNestedNode =
      lastNode.children.length > 0 && getLast(lastNode.children);
    if (
      lastNestedNode &&
      lastNestedNode.kind === "inline" &&
      lastNestedNode.raw[lastNestedNode.raw.length - 1] === "\n"
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

function shouldPrintHardLineBeforeEndInControlStructure(path) {
  const node = path.getValue();

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

  let alignment = lastLine.length + 1;

  if (lastLine.trim().length !== 0) {
    alignment = lastLine.replace(/\S/g, "").length;
  }

  return alignment;
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

function isProgramLikeNode(node) {
  return ["program", "declare", "namespace"].includes(node.kind);
}

module.exports = {
  printNumber,
  getPrecedence,
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
  isMemberish,
  isFirstChildrenInlineNode,
  shouldPrintHardLineBeforeEndInControlStructure,
  getAlignment,
  getFirstNestedChildNode,
  getLastNestedChildNode,
  isProgramLikeNode
};
