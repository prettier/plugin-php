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

  // Avoid parens in short control structures like `if (expr) statement`
  if (
    ["if", "while", "for", "foreach"].includes(parent.kind) &&
    (parent.body === node || parent.alternate === node)
  ) {
    return false;
  }

  switch (node.kind) {
    case "call":
      return false;
    case "pre":
    case "post":
      if (parent.kind === "unary") {
        return (
          (node.type === "+" && parent.type === "+") ||
          (node.type === "-" && parent.type === "-")
        );
      }
    // else fallthrough
    case "unary":
      switch (parent.kind) {
        case "unary":
          return (
            node.type === parent.type &&
            (node.type === "+" || node.type === "-")
          );
        case "propertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return name === "what" && parent.what === node;
        case "bin":
          return parent.type === "**" && name === "left";
        default:
          return false;
      }
    case "clone":
    case "new": {
      if (isLookupNode(parent)) {
        return true;
      }

      return false;
    }
    case "yield": {
      switch (parent.kind) {
        case "propertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return name === "what" && parent.what === node;

        case "retif":
          return parent.test === node;

        default:
          return !!(node.key || node.value);
      }
    }
    case "assign": {
      if (
        parent.kind === "for" &&
        (parent.init.includes(node) || parent.increment.includes(node))
      ) {
        return false;
      } else if (
        ["if", "while", "do", "switch"].includes(parent.kind) &&
        name === "test"
      ) {
        return false;
      } else if (parent.kind === "assign") {
        return false;
      }

      return true;
    }
    case "retif":
      switch (parent.kind) {
        case "unary":
        case "bin":
        case "cast":
          return true;
        case "retif":
          return name === "test" && parent.test === node;
        case "propertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return name === "what" && parent.what === node;

        default:
          return false;
      }
    case "closure":
      if (parent.kind === "call" && name === "what" && parent.what === node) {
        return true;
      }

      return false;
    case "boolean":
    case "number":
    case "magic":
    case "encapsed":
    case "nowdoc":
    case "variable":
    case "isset":
    case "empty":
    case "silent":
    case "exit":
    case "eval":
      return false;
    case "string":
    case "array":
    case "cast":
      if (
        name === "what" &&
        parent.what === node &&
        (isLookupNode(parent) || parent.kind === "call")
      ) {
        if (node.kind === "string" && parent.kind === "offsetlookup") {
          return false;
        }

        return true;
      }

      if (node.kind === "cast" && parent.kind === "bin") {
        return true;
      }

      return false;
    case "propertylookup":
    case "staticlookup":
    case "offsetlookup":
      return false;
    case "bin": {
      if (["pre", "post"].includes(parent.kind)) {
        return true;
      }

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

      if (parent.kind === "cast") {
        return true;
      }
    }
  }

  return node.parenthesizedExpression;
}

module.exports = needsParens;
