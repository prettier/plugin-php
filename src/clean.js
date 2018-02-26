"use strict";

const util = require("./util");

function clean(ast) {
  // continue ((2)); -> continue 2;
  // continue 1; -> continue;
  if ((ast.kind === "continue" || ast.kind === "break") && ast.level) {
    let level = ast.level;
    while (level.kind === "parenthesis") {
      level = level.inner;
    }
    if (level.kind === "number") {
      return level.value == 1
        ? { kind: ast.kind, level: {} }
        : { kind: ast.kind, level };
    }
  }
  // Normalize numbers
  if (ast.kind === "number") {
    ast.value = util.printNumber(ast.value);

    return ast;
  }
  // All magic constant should be upper case
  if (ast.kind === "magic") {
    return ast.value.toUpperCase();
  }

  // All reserved words should be lowercase case
  if (ast.kind === "identifier" && typeof ast.name === "string") {
    const lowerCasedName = ast.name.toLowerCase();
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

    return isLowerCase ? lowerCasedName : ast.name;
  }
}

module.exports = clean;
