"use strict";

const parse = require("./parser");
const print = require("./printer");

const languages = [
  {
    name: "PHP",
    parsers: ["php"],
    tmScope: "text.html.php",
    aceMode: "php",
    codemirrorMode: "php",
    extensions: [
      ".php",
      ".aw",
      ".ctp",
      ".fcgi",
      ".inc",
      ".php3",
      ".php4",
      ".php5",
      ".phps",
      ".phpt"
    ],
    filenames: [".php_cs", ".php_cs.dist", "Phakefile"],
    vscodeLanguageIds: ["php"],
    linguistLanguageId: 272
  }
];

const parsers = {
  php: {
    parse,
    astFormat: "php"
  }
};

const printers = {
  php: {
    print
  }
};

module.exports = {
  languages,
  printers,
  parsers
};
