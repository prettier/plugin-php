"use strict";

function needsParens(path) {
  const parent = path.getParentNode();

  if (!parent) {
    return false;
  }

  const node = path.getNode();

  if (["include", "print", "return", "echo"].includes(parent.kind)) {
    return false;
  }

  if (
    [
      "boolean",
      "string",
      "number",
      "inline",
      "magic",
      "nowdoc",
      "encapsed",
      "variable"
    ].includes(node.kind)
  ) {
    return false;
  }

  return node.parenthesizedExpression;
}

module.exports = needsParens;
