"use strict";

const { isLookupNode } = require("./util");

function needsParens(path) {
  const parent = path.getParentNode();

  if (!parent) {
    return false;
  }

  const name = path.getName();
  const node = path.getNode();

  if (
    [
      //  No need parens for top level children of this nodes
      "program",
      "namespace",
      "declare",
      "block",

      // No need parens
      "include",
      "print",
      "return",
      "echo"
    ].includes(parent.kind)
  ) {
    return false;
  }

  switch (node.kind) {
    case "unary":
      switch (parent.kind) {
        case "unary":
          return (
            node.type === parent.type &&
            (node.type === "+" || node.type === "-")
          );
        case "bin":
          return parent.type === "**" && name === "left";
        default:
          return false;
      }
    case "new": {
      if (isLookupNode(parent)) {
        return true;
      }

      return false;
    }
    case "boolean":
    case "string":
    case "number":
    case "magic":
    case "encapsed":
    case "nowdoc":
    case "variable":
      return false;
    case "bin": {
      if (["if", "while", "do", "switch", "case"].includes(parent.kind)) {
        return false;
      }

      // $var = false or true;
      // The constant false is assigned to $f before the "or" operation occurs
      // Acts like: (($var = false) or true)
      if (
        node.right.kind === "bin" &&
        ["and", "xor", "or"].includes(node.right.type)
      ) {
        return true;
      }
    }
  }

  return node.parenthesizedExpression;
}

module.exports = needsParens;
