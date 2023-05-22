"use strict";

const CATEGORY_PHP = "PHP";

module.exports = {
  phpVersion: {
    since: "0.13.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "7.0",
    description: "Minimum target PHP version.",
    choices: [
      { value: "5.0" },
      { value: "5.1" },
      { value: "5.2" },
      { value: "5.3" },
      { value: "5.4" },
      { value: "5.5" },
      { value: "5.6" },
      { value: "7.0" },
      { value: "7.1" },
      { value: "7.2" },
      { value: "7.3" },
      { value: "7.4" },
      { value: "8.0" },
      { value: "8.1" },
      { value: "8.2" },
    ],
  },
  trailingCommaPHP: {
    since: "0.0.0",
    category: CATEGORY_PHP,
    type: "boolean",
    default: true,
    description: "Print trailing commas wherever possible when multi-line.",
  },
  braceStyle: {
    since: "0.10.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "per-cs",
    description:
      "Print one space or newline for code blocks (classes and functions).",
    choices: [
      { value: "psr-2", description: "(deprecated) Use per-cs" },
      { value: "per-cs", description: "Use the PER Coding Style brace style." },
      { value: "1tbs", description: "Use 1tbs brace style." },
    ],
  },
};
