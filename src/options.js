"use strict";

const CATEGORY_PHP = "PHP";

module.exports = {
  trailingComma: {
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
  }
  // see https://github.com/prettier/plugin-php/issues/107
  // openingBraceNewLine: {
  //   type: "boolean",
  //   category: "Global",
  //   default: true,
  //   description: "Move open brace for code blocks onto new line."
  // }
};
