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

  function addLonelyCommentsToAst() {
    const codeBlocks = [];
    let start;
    ast.tokens.forEach((token, index) => {
      if (token[0] === "T_OPEN_TAG") {
        start = index;
      } else if (token[0] === "T_CLOSE_TAG") {
        codeBlocks.push({ start, end: index });
      }
    });

    const lonelyCommentBlocks = codeBlocks
      .map(({ start, end }) => {
        return ast.tokens.slice(start, end + 1);
      })
      .filter(tokens => {
        return (
          tokens.filter(
            token =>
              ![
                "T_COMMENT",
                "T_DOC_COMMENT",
                "T_WHITESPACE",
                "T_OPEN_TAG",
                "T_CLOSE_TAG"
              ].includes(token[0])
          ).length === 0
        );
      });

    let astIndices = [];

    if (!lonelyCommentBlocks) {
      return;
    }
    const pushTokens = (tokens, index, arr) => {
      arr.push({
        index,
        loc: {
          start: {
            line: tokens[0][2],
            offset: tokens[0][3]
          },
          end: {
            line: tokens[tokens.length - 1][2],
            offset: tokens[tokens.length - 1][4]
          }
        }
      });
    };

    if (!ast.children.length) {
      lonelyCommentBlocks.forEach(tokens => pushTokens(tokens, 0, astIndices));
    } else {
      const [firstLonelyTokens] = lonelyCommentBlocks;
      if (
        firstLonelyTokens &&
        ast.children.length > 0 &&
        ast.children[0].loc.start.line >=
          firstLonelyTokens[firstLonelyTokens.length - 1][2]
      ) {
        pushTokens(firstLonelyTokens, 0, astIndices);
      }

      const lastLonelyTokens =
        lonelyCommentBlocks[lonelyCommentBlocks.length - 1];
      if (
        lastLonelyTokens &&
        ast.children.length > 0 &&
        ast.children[ast.children.length - 1].loc.end.line <=
          lastLonelyTokens[lastLonelyTokens.length - 1][2]
      ) {
        pushTokens(lastLonelyTokens, ast.children.length, astIndices);
      }

      astIndices = ast.children.reduce((acc, child, index, children) => {
        const fittingTokens = lonelyCommentBlocks.find(tokens =>
          inBetweenLines(tokens[0][2], child, children[index + 1])
        );
        if (fittingTokens) {
          pushTokens(fittingTokens, index + 1, acc);
        }
        return acc;
      }, astIndices);
    }

    astIndices.forEach(({ index, loc }, j) => {
      ast.children.splice(index + j, 0, {
        kind: "lonelyComment",
        raw: "",
        value: "",
        loc
      });
    });
  }

  addLonelyCommentsToAst();

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
