"use strict";

const CATEGORY_PHP = "PHP";

module.exports = {
  trailingCommaPHP: {
    since: "0.0.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "none",
    description: "Print trailing commas wherever possible when multi-line.",
    choices: [
      { value: "none", description: "No trailing commas." },
      {
        value: "php5",
        description: "Trailing commas where valid in PHP 5 (arrays and lists)."
      },
      {
        value: "php7.2",
        description:
          "Trailing commas where valid in PHP 7.2 (arrays, lists and uses)."
      },
      {
        value: "all",
        description: "Trailing commas wherever possible."
      }
    ]
  },
  braceStyle: {
    since: "0.10.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "psr-2",
    description:
      "Print one space or newline for code blocks (classes and functions).",
    choices: [
      { value: "psr-2", description: "Use PSR-2 brace style." },
      { value: "1tbs", description: "Use 1tbs brace style." }
    ]
  }
};
