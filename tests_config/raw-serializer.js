"use strict";

const RAW = Symbol.for("raw");

module.exports = {
  print(val) {
    return val[RAW].replace(/\r/g, "\\r");
  },
  test(val) {
    return (
      val &&
      Object.prototype.hasOwnProperty.call(val, RAW) &&
      typeof val[RAW] === "string"
    );
  }
};
