"use strict";

const path = require("path");

if (global.STANDALONE) {
  exports.prettier = require("prettier/standalone");
  exports.plugin = require(path.join(__dirname, "..", "standalone.js"));
} else {
  exports.prettier = require("prettier");
  exports.plugin = path.join(__dirname, "..");
}
