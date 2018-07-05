"use strict";

const docblock = require("jest-docblock");
const parse = require("./parser");

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

const insertPragma = text => {
  const [firstDocBlock] = extractDocBlocks(text);
  let before;
  let after;
  let parsedDocblock;
  if (firstDocBlock) {
    const {
      start: { offset: startOffset },
      end: { offset: endOffset }
    } = firstDocBlock.loc;
    before = text.substring(0, startOffset);
    after = text.substring(endOffset);
    parsedDocblock = docblock.parseWithComments(firstDocBlock.value);
  } else {
    const openTag = "<?php";
    const firstPhpTagIdx = text.indexOf(openTag);
    if (firstPhpTagIdx === -1) {
      // bail
      return text;
    }
    const splitAt = firstPhpTagIdx + openTag.length + 1;
    before = text.substring(0, splitAt);
    after = text.substring(splitAt);
    parsedDocblock = { comments: "", pragmas: {} };
  }
  const pragmas = Object.assign({ format: "" }, parsedDocblock.pragmas);
  const newDocblock = docblock.print({
    pragmas,
    comments: parsedDocblock.comments
  });
  return before + newDocblock + after;
};

module.exports = {
  hasPragma,
  insertPragma
};
