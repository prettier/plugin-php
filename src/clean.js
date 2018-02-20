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
  if (ast.kind === "number") {
    ast.value = util.printNumber(ast.value);

    return ast;
  }
}

module.exports = clean;
