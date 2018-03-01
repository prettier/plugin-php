"use strict";

function printNumber(rawNumber) {
  return (
    rawNumber
      .toLowerCase()
      // Remove unnecessary plus and zeroes from scientific notation.
      .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3")
      // Remove unnecessary scientific notation (1e0).
      .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
      // Make sure numbers always start with a digit.
      .replace(/^([+-])?\./, "$10.")
      // Remove extraneous trailing decimal zeroes.
      .replace(/(\.\d+?)0+(?=e|$)/, "$1")
      // Remove trailing dot.
      .replace(/\.(?=e|$)/, "")
  );
}

function stringEscape(str) {
  return str.replace(/[\n\r\t\v\f\u001b\\]/g, (character, index) => {
    switch (character) {
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      case "\v":
        return "\\v";
      case "\f":
        return "\\f";
      case "\u001b":
        return "\\e";
      case "\\": {
        const nextCharacter = str[index + 1];
        return nextCharacter && !/[ux0-7]/.test(nextCharacter) ? "\\\\" : "\\";
      }
    }
  });
}

module.exports = {
  printNumber,
  stringEscape
};
