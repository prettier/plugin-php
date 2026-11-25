import engine from "php-parser";
import { LATEST_SUPPORTED_PHP_VERSION } from "./options.mjs";
import { resolvePhpVersion } from "./options.mjs";

function parse(text, opts) {
  const inMarkdown = opts && opts.parentParser === "markdown";

  if (!text && inMarkdown) {
    return "";
  }
  resolvePhpVersion(opts);

  // Todo https://github.com/glayzzle/php-parser/issues/170
  text = text.replace(/\?>\n<\?/g, "?>\n___PSEUDO_INLINE_PLACEHOLDER___<?");

  // initialize a new parser instance
  const parser = new engine({
    parser: {
      extractDoc: true,
      version: `${LATEST_SUPPORTED_PHP_VERSION}`,
    },
    ast: {
      withPositions: true,
      withSource: true,
    },
  });

  const hasOpenPHPTag = text.indexOf("<?php") !== -1;
  const parseAsEval = inMarkdown && !hasOpenPHPTag;

  let ast;
  try {
    ast = parseAsEval ? parser.parseEval(text) : parser.parseCode(text);
  } catch (err) {
    if (err instanceof SyntaxError && "lineNumber" in err) {
      err.loc = {
        start: {
          line: err.lineNumber,
          column: err.columnNumber,
        },
      };

      delete err.lineNumber;
      delete err.columnNumber;
    }

    throw err;
  }

  ast.extra = {
    parseAsEval,
  };

  // https://github.com/glayzzle/php-parser/issues/155
  // currently inline comments include the line break at the end, we need to
  // strip those out and update the end location for each comment manually
  ast.comments.forEach((comment) => {
    if (comment.value[comment.value.length - 1] === "\n") {
      comment.value = comment.value.slice(0, -1);
      comment.loc.end.offset = comment.loc.end.offset - 1;
    }
  });

  // php-parser does not clear the attribute groups of a class constant,
  // so the next class member reuses the same attrgroup object and the
  // printer emits the attribute twice. Drop every attrgroup occurrence
  // after the first one, ordered by source position. Two attribute
  // groups written in the source are always distinct objects, so a
  // repeated object can only come from this parser bug.
  const attrGroupUses = [];
  const collectAttrGroups = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(collectAttrGroups);
      return;
    }
    if (Array.isArray(node.attrGroups)) {
      for (const attrGroup of node.attrGroups) {
        attrGroupUses.push({ owner: node, attrGroup });
      }
    }
    for (const value of Object.values(node)) {
      collectAttrGroups(value);
    }
  };
  collectAttrGroups(ast);
  attrGroupUses.sort(
    (a, b) =>
      (a.attrGroup.loc?.start?.offset ?? 0) -
      (b.attrGroup.loc?.start?.offset ?? 0)
  );
  const seenAttrGroups = new Set();
  for (const { owner, attrGroup } of attrGroupUses) {
    if (seenAttrGroups.has(attrGroup)) {
      owner.attrGroups = owner.attrGroups.filter(
        (group) => group !== attrGroup
      );
    } else {
      seenAttrGroups.add(attrGroup);
    }
  }

  return ast;
}

export default parse;
