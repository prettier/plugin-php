"use strict";

module.exports = {
  runner: "jest-runner-eslint",
  displayName: "lint",
  testMatch: ["<rootDir>/**/*.js"],
  testPathIgnorePatterns: ["node_modules/"]
};
