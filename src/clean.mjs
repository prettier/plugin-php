import { printNumber, normalizeMagicMethodName } from "./util.mjs";

const ignoredProperties = new Set([
  "loc",
  "range",
  "raw",
  "comments",
  "leadingComments",
  "trailingComments",
  "parenthesizedExpression",
  "parent",
  "prev",
  "start",
  "end",
  "tokens",
  "errors",
  "extra",
]);

/**
 * This function takes the existing ast node and a copy, by reference
 * We use it for testing, so that we can compare pre-post versions of the AST,
 * excluding things we don't care about (like node location, case that will be
 * changed by the printer, etc.)
 */
function clean(node, newObj) {
  if (node.kind === "string") {
    // TODO if options are available in this method, replace with
    // newObj.isDoubleQuote = !useSingleQuote(node, options);
    delete newObj.isDoubleQuote;
  }

  if (["array", "list"].includes(node.kind)) {
    // TODO if options are available in this method, assign instead of delete
    delete newObj.shortForm;
  }

  if (node.kind === "inline") {
    if (node.value.includes("___PSEUDO_INLINE_PLACEHOLDER___")) {
      return null;
    }

    newObj.value = newObj.value.replace(/\n/g, "");
  }

  // continue ((2)); -> continue 2;
  // continue 1; -> continue;
  if ((node.kind === "continue" || node.kind === "break") && node.level) {
    const { level } = newObj;

    if (level.kind === "number") {
      newObj.level = level.value === "1" ? null : level;
    }
  }

  // if () {{ }} -> if () {}
  if (node.kind === "block") {
    if (node.children.length === 1 && node.children[0].kind === "block") {
      while (newObj.children[0].kind === "block") {
        newObj.children = newObj.children[0].children;
      }
    }
  }

  // Normalize numbers
  if (node.kind === "number") {
    newObj.value = printNumber(node.value);
  }

  const statements = ["foreach", "for", "if", "while", "do"];

  if (statements.includes(node.kind)) {
    if (node.body && node.body.kind !== "block") {
      newObj.body = {
        kind: "block",
        children: [newObj.body],
      };
    } else {
      newObj.body = newObj.body ? newObj.body : null;
    }

    if (node.alternate && node.alternate.kind !== "block") {
      newObj.alternate = {
        kind: "block",
        children: [newObj.alternate],
      };
    } else {
      newObj.alternate = newObj.alternate ? newObj.alternate : null;
    }
  }

  if (node.kind === "usegroup" && typeof node.name === "string") {
    newObj.name = newObj.name.replace(/^\\/, "");
  }

  if (node.kind === "useitem") {
    newObj.name = newObj.name.replace(/^\\/, "");
  }

  if (node.kind === "method" && node.name.kind === "identifier") {
    newObj.name.name = normalizeMagicMethodName(newObj.name.name);
  }

  if (node.kind === "noop") {
    return null;
  }
}

clean.ignoredProperties = ignoredProperties;

export default clean;
