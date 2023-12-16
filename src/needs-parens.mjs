import { getPrecedence, shouldFlatten, isBitwiseOperator } from "./util.mjs";

function needsParens(path) {
  const { parent } = path;

  if (!parent) {
    return false;
  }

  const { key, node } = path;

  if (
    [
      //  No need parens for top level children of this nodes
      "program",
      "expressionstatement",
      "namespace",
      "declare",
      "block",

      // No need parens
      "include",
      "print",
      "return",
      "echo",
    ].includes(parent.kind)
  ) {
    return false;
  }

  switch (node.kind) {
    case "pre":
    case "post":
      if (parent.kind === "unary") {
        return (
          node.kind === "pre" &&
          ((node.type === "+" && parent.type === "+") ||
            (node.type === "-" && parent.type === "-"))
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
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return key === "what";
        case "bin":
          return parent.type === "**" && key === "left";
        default:
          return false;
      }
    case "bin": {
      switch (parent.kind) {
        case "assign":
        case "retif":
          return ["and", "xor", "or"].includes(node.type);
        case "silent":
        case "cast":
          // TODO: bug https://github.com/glayzzle/php-parser/issues/172
          return node.parenthesizedExpression;
        case "pre":
        case "post":
        case "unary":
          return true;
        case "call":
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
          return key === "what";
        case "bin": {
          const po = parent.type;
          const pp = getPrecedence(po);
          const no = node.type;
          const np = getPrecedence(no);

          if (pp > np) {
            return true;
          }

          if (po === "||" && no === "&&") {
            return true;
          }

          if (pp === np && key === "right") {
            return true;
          }

          if (pp === np && !shouldFlatten(po, no)) {
            return true;
          }

          if (pp < np && no === "%") {
            return po === "+" || po === "-";
          }

          // Add parenthesis when working with bitwise operators
          // It's not stricly needed but helps with code understanding
          if (isBitwiseOperator(po)) {
            return true;
          }

          return false;
        }

        default:
          return false;
      }
    }
    case "propertylookup":
    case "nullsafepropertylookup":
    case "staticlookup": {
      switch (parent.kind) {
        case "call":
          return key === "what" && node.parenthesizedExpression;

        default:
          return false;
      }
    }
    case "clone":
    case "new": {
      switch (parent.kind) {
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return key === "what";
        default:
          return false;
      }
    }
    case "yield": {
      switch (parent.kind) {
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return key === "what";

        case "retif":
          return key === "test";

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
      } else if (parent.kind === "assign") {
        return false;
      } else if (parent.kind === "static") {
        return false;
      } else if (
        ["if", "do", "while", "foreach", "switch"].includes(parent.kind)
      ) {
        return false;
      } else if (parent.kind === "silent") {
        return false;
      } else if (parent.kind === "call") {
        return false;
      }

      return true;
    }
    case "retif":
      switch (parent.kind) {
        case "cast":
          return true;
        case "unary":
        case "bin":
        case "retif":
          if (key === "test" && !parent.trueExpr) {
            return false;
          }

          return true;
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          return key === "what";

        default:
          return false;
      }
    case "closure":
      switch (parent.kind) {
        case "call":
          return key === "what";

        // https://github.com/prettier/plugin-php/issues/1675
        case "propertylookup":
        case "nullsafepropertylookup":
          return true;

        default:
          return false;
      }
    case "silence":
    case "cast":
      // TODO: bug https://github.com/glayzzle/php-parser/issues/172
      return node.parenthesizedExpression;
    // else fallthrough
    case "string":
    case "array":
      switch (parent.kind) {
        case "propertylookup":
        case "nullsafepropertylookup":
        case "staticlookup":
        case "offsetlookup":
        case "call":
          if (
            ["string", "array"].includes(node.kind) &&
            parent.kind === "offsetlookup"
          ) {
            return false;
          }

          return key === "what";
        default:
          return false;
      }
    case "print":
    case "include":
      return parent.kind === "bin";
  }

  return false;
}

export default needsParens;
