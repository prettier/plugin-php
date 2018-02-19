"use strict";

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
}

module.exports = clean;
