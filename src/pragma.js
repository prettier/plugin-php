"use strict";

const parse = require("./parser");
const { EOL } = require("os");
const memoize = require("mem");

const reHasPragma = /@prettier|@format/;

const extractDocBlocks = memoize(text => {
  const parsed = parse(text);
  return parsed.comments.filter(el => el.kind === "commentblock");
});

const hasPragma = text => {
  // fast path optimization - check if the pragma shows up in the file at all
  if (!reHasPragma.test(text)) {
    return false;
  }
  const [firstDocBlock] = extractDocBlocks(text);
  if (firstDocBlock) {
    const { value } = firstDocBlock;
    return reHasPragma.test(value);
  }
  return false;
};

const injectPragma = docblock => {
  let lines = docblock.split(EOL);
  if (lines.length === 1) {
    // normalize to multiline for simplicity
    const [, line] = /\/*\*\*(.*)\*\//.exec(lines[0]);
    lines = ["/**", ` * ${line.trim()}`, " */"];
  }
  // find the first @pragma
  // if there happens to be one on the opening line, just put it on the next line.
  const pragmaIndex = lines.findIndex(line => /@\S/.test(line)) || 1;
  // not found => index == -1, which conveniently will splice 1 from the end.
  lines.splice(pragmaIndex, 0, " * @format");

  return lines.join(EOL);
};

const insertPragma = text => {
  const [firstDocBlock] = extractDocBlocks(text);
  if (firstDocBlock) {
    const {
      start: { offset: startOffset },
      end: { offset: endOffset }
    } = firstDocBlock.loc;
    const before = text.substring(0, startOffset);
    const after = text.substring(endOffset);
    return `${before}${injectPragma(firstDocBlock.value)}${after}`;
  }
  const openTag = "<?php";
  if (!text.startsWith(openTag)) {
    // bail out
    return text;
  }

  const splitAt = openTag.length;
  const phpTag = text.substring(0, splitAt);
  const after = text.substring(splitAt);
  return `${phpTag}
/** 
 * @format 
 */
${after}`;
};

module.exports = {
  hasPragma,
  insertPragma
};
