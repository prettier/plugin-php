"use strict";

const parse = require("./parser");
const { EOL } = require("os");

const extractDocBlocks = text => {
  const parsed = parse(text);
  return parsed.comments.filter(el => el.kind === "commentblock");
};

const hasPragma = text => {
  const [firstDocBlock] = extractDocBlocks(text);
  if (firstDocBlock) {
    const { value } = firstDocBlock;
    return value.indexOf("@prettier") !== -1 || value.indexOf("@format") !== -1;
  }
  return false;
};

const injectPragma = docblock => {
  let lines = docblock.split(EOL);
  if (lines.length === 1) {
    // normalize to multiline for simplicity
    const [, line] = /\/*\*\*(.*)\*\//.exec(lines[0]);
    lines = ["/**", ` * ${line.trim()}`, " *", " */"];
  }
  // find the first @pragma
  const pragmaIndex = lines.findIndex(line => /@\S/.test(line));
  // if none is found, pragmaIndex is -1, which conveniently will splice 1 from the end.
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
  const firstPhpTagIdx = text.indexOf(openTag);
  if (firstPhpTagIdx === -1) {
    // bail
    return text;
  }
  const splitAt = firstPhpTagIdx + openTag.length + 1;
  const before = text.substring(0, splitAt);
  const after = text.substring(splitAt);
  return `${before}/** @format */${after}`;
};

module.exports = {
  hasPragma,
  insertPragma
};
