import engine from "php-parser";

function parse(text, opts) {
  const inMarkdown = opts && opts.parentParser === "markdown";

  if (!text && inMarkdown) {
    return "";
  }

  // Todo https://github.com/glayzzle/php-parser/issues/170
  text = text.replace(/\?>\n<\?/g, "?>\n___PSEUDO_INLINE_PLACEHOLDER___<?");

  // initialize a new parser instance
  const parser = new engine({
    parser: {
      extractDoc: true,
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

  return ast;
}

export default parse;
