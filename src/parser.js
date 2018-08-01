"use strict";
const engine = require("php-parser");

function inBetweenLines(line, node, nextNode) {
  return (
    nextNode && node.loc.end.line <= line && nextNode.loc.start.line > line
  );
}

function parse(text) {
  // initialize a new parser instance
  const parser = new engine({
    parser: {
      extractDoc: true,
      extractTokens: true
    },
    ast: {
      withPositions: true,
      withSource: true
    }
  });

  const ast = parser.parseCode(text);

  // parser doesn't create `inline` node between `?>\n<?`, so we add them manually
  const missingLinebreaks = ast.tokens.filter((token, index, tokens) => {
    return (
      token[0] === "T_CLOSE_TAG" &&
      token[1] === "?>\n" &&
      tokens[index + 1] &&
      tokens[index + 1][0] === "T_OPEN_TAG"
    );
  });
  const lines = missingLinebreaks.map(token => token[2]);

  const astIndices = ast.children.reduce((acc, child, index, children) => {
    if (lines.find(line => inBetweenLines(line, child, children[index + 1]))) {
      acc.push(index + 1);
    }
    return acc;
  }, []);
  astIndices.forEach((i, j) => {
    ast.children.splice(i + j, 0, {
      kind: "inline",
      raw: "\n",
      value: ""
    });
  });

  // https://github.com/glayzzle/php-parser/issues/155
  // currently inline comments include the line break at the end, we need to
  // strip those out and update the end location for each comment manually
  ast.comments.forEach(comment => {
    if (comment.value[comment.value.length - 1] === "\r") {
      comment.value = comment.value.slice(0, -1);
      comment.loc.end.offset = comment.loc.end.offset - 1;
    }
    if (comment.value[comment.value.length - 1] === "\n") {
      comment.value = comment.value.slice(0, -1);
      comment.loc.end.offset = comment.loc.end.offset - 1;
    }
  });
  return ast;
}

module.exports = parse;
