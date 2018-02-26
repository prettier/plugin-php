"use strict";

const util = require("./util");

/**
 * This function takes the existing ast node and a copy, by reference
 * We use it for testing, so that we can compare pre-post versions of the AST,
 * excluding things we don't care about (like node location, case that will be
 * changed by the printer, etc.)
 */
function clean(node, newObj) {
  // continue ((2)); -> continue 2;
  // continue 1; -> continue;
  if ((node.kind === "continue" || node.kind === "break") && node.level) {
    let level = node.level;
    while (level.kind === "parenthesis") {
      level = level.inner;
    }
    if (level.kind === "number") {
      newObj.level = level.value == 1 ? {} : level;
    }
  }
  // Normalize numbers
  if (node.kind === "number") {
    newObj.value = util.printNumber(node.value);
  }
  // All magic constant should be upper case
  if (node.kind === "magic") {
    newObj.value = node.value.toUpperCase();
  }

  // All reserved words should be lowercase case
  if (node.kind === "identifier" && typeof node.name === "string") {
    const lowerCasedName = node.name.toLowerCase();
    const isLowerCase =
      [
        "int",
        "float",
        "bool",
        "string",
        "null",
        "void",
        "iterable",
        "object",
        "self"
      ].indexOf(lowerCasedName) !== -1;

    newObj.name = isLowerCase ? lowerCasedName : node.name;
  }

  if (["Location", "Position"].includes(node.constructor.name)) {
    newObj = "locationNode";
  }
}

module.exports = clean;
