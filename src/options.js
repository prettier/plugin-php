"use strict";

const CATEGORY_PHP = "PHP";

module.exports = {
  phpVersion: {
    since: "0.13.0",
    category: CATEGORY_PHP,
    type: "choice",
    default: "7.1",
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
      { value: "7.4" }
    ]
  },
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
        description: "Trailing commas where valid in PHP 5 (arrays and lists).",
        deprecated: "0.13.0",
        redirect: "all"
      },
      {
        value: "php7.2",
        description:
          "Trailing commas where valid in PHP 7.2 (arrays, lists and uses).",
        deprecated: "0.13.0",
        redirect: "all"
      },
      {
        value: "php7.3",
        description:
          "Trailing commas where valid in PHP 7.3 (arrays, lists, uses and function calls).",
        deprecated: "0.13.0",
        redirect: "all"
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
