"use strict";

const {
  addLeadingComment,
  addDanglingComment,
  addTrailingComment,
  skipNewline,
  hasNewline,
  hasNewlineInRange,
} = require("prettier").util;
const {
  concat,
  join,
  indent,
  hardline,
  cursor,
  lineSuffix,
  breakParent,
} = require("prettier").doc.builders;
const {
  getNextNonSpaceNonCommentCharacterIndex,
  isNextLineEmpty,
  isPreviousLineEmpty,
  isLookupNode,
} = require("./util");

/*
Comment functions are meant to inspect various edge cases using given comment nodes,
with information about where those comment nodes exist in the tree (ie enclosingNode,
previousNode, followingNode), and then either call the built in functions to handle
certain cases (ie addLeadingComment, addTrailingComment, addDanglingComment), or just
let prettier core handle them. To signal that the plugin is taking over, the comment
handler function should return true, otherwise returning false signals that prettier
core should handle the comment

args:
  comment
  text
  options
  ast
  isLastComment
*/

function handleOwnLineComment(comment, text, options) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  return (
    handleLastFunctionArgComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleMemberExpressionComments(enclosingNode, followingNode, comment) ||
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleTryComments(enclosingNode, followingNode, comment) ||
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment
    ) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleForComments(enclosingNode, precedingNode, followingNode, comment) ||
    handleInlineComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleDeclareComments(enclosingNode, precedingNode, followingNode, comment)
  );
}

function handleEndOfLineComment(comment, text, options) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  return (
    handleArrayComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleReturnComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleLastFunctionArgComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleRetifComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment,
      text,
      options
    ) ||
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleTryComments(enclosingNode, followingNode, comment) ||
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment
    ) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleEntryComments(enclosingNode, comment) ||
    handleCallComments(precedingNode, enclosingNode, comment) ||
    handleAssignComments(enclosingNode, followingNode, comment) ||
    handleInlineComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleNamespaceComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleDeclareComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleGoto(enclosingNode, comment)
  );
}

function handleRemainingComment(comment, text, options) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  return (
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleCommentInEmptyParens(text, enclosingNode, comment, options) ||
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleTraitUseComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment
    ) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleGoto(enclosingNode, comment) ||
    handleHalt(precedingNode, enclosingNode, followingNode, comment) ||
    handleBreakAndContinueStatementComments(enclosingNode, comment) ||
    handleInlineComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleNamespaceComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    )
  );
}

function addBlockStatementFirstComment(node, comment) {
  const { children } = node;
  if (children.length === 0) {
    addDanglingComment(node, comment);
  } else {
    addLeadingComment(children[0], comment);
  }
}

function addBlockOrNotComment(node, comment) {
  if (node.kind === "block") {
    addBlockStatementFirstComment(node, comment);
  } else {
    addLeadingComment(node, comment);
  }
}

function handleArrayComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (
    !precedingNode &&
    !followingNode &&
    enclosingNode &&
    enclosingNode.kind === "array"
  ) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleReturnComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (enclosingNode && enclosingNode.kind === "return" && !enclosingNode.expr) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleLastFunctionArgComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
    text,
    comment,
    options
  );
  const nextCharacter = text.charAt(nextCharIndex);

  // Real functions
  if (
    precedingNode &&
    precedingNode.kind === "identifier" &&
    enclosingNode &&
    (enclosingNode.kind === "function" || enclosingNode.kind === "method") &&
    nextCharacter === ")"
  ) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }

  if (
    enclosingNode &&
    (enclosingNode.kind === "function" || enclosingNode.kind === "method") &&
    followingNode &&
    followingNode.kind === "block"
  ) {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleMemberExpressionComments(enclosingNode, followingNode, comment) {
  if (
    enclosingNode &&
    isLookupNode(enclosingNode) &&
    followingNode &&
    ["identifier", "variable", "encapsed"].includes(followingNode.kind)
  ) {
    addLeadingComment(enclosingNode, comment);

    return true;
  }

  return false;
}

function handleIfStatementComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  if (!enclosingNode || enclosingNode.kind !== "if" || !followingNode) {
    return false;
  }

  const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
    text,
    comment,
    options
  );
  const nextCharacter = text.charAt(nextCharIndex);

  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Comments before `else`/`else if` treat as a dangling comment
  if (
    precedingNode === enclosingNode.body &&
    followingNode === enclosingNode.alternate
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  if (followingNode.kind === "if") {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the consequent without brackets on, such as
  // if (a) /* comment */ true,
  // we look at the next character to see if the following node
  // is the consequent for the if statement
  if (enclosingNode.body === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleRetifComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment,
  text,
  options
) {
  const isSameLineAsPrecedingNode =
    precedingNode &&
    !hasNewlineInRange(
      text,
      options.locEnd(precedingNode),
      options.locStart(comment)
    );

  if (
    (!precedingNode || !isSameLineAsPrecedingNode) &&
    enclosingNode &&
    enclosingNode.kind === "retif" &&
    followingNode
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}

function handleForComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment
) {
  if (
    !followingNode &&
    enclosingNode &&
    (enclosingNode.kind === "for" || enclosingNode.kind === "foreach")
  ) {
    // For a shortform for loop (where the body is just one node), add
    // this as a leading comment to the body
    if (enclosingNode.body && enclosingNode.body.kind !== "block") {
      addLeadingComment(followingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }
    return true;
  }

  return false;
}

function handleTraitUseComments(enclosingNode, followingNode, comment) {
  if (
    enclosingNode &&
    enclosingNode.kind === "traituse" &&
    enclosingNode.adaptations &&
    !enclosingNode.adaptations.length
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleClassComments(enclosingNode, followingNode, comment) {
  if (
    enclosingNode &&
    ["class", "interface", "trait"].includes(enclosingNode.kind)
  ) {
    // for extends nodes that have leading comments, we can store them as
    // dangling comments so we can handle them in the printer

    if (followingNode && enclosingNode.extends) {
      if (!Array.isArray(enclosingNode.extends)) {
        if (followingNode === enclosingNode.extends) {
          addDanglingComment(followingNode, comment);
          return true;
        }
      } else {
        if (
          enclosingNode.extends.some((extendsNode) => {
            if (followingNode && followingNode === extendsNode) {
              addDanglingComment(followingNode, comment);
              return true;
            }
          })
        ) {
          return true;
        }
      }
    }

    // check each implements node - if any of them have comments we can store
    // them as dangling comments and handle them in the printer
    if (followingNode && enclosingNode.implements) {
      if (
        enclosingNode.implements.some((implementsNode) => {
          if (followingNode && followingNode === implementsNode) {
            addDanglingComment(followingNode, comment);
            return true;
          }
        })
      ) {
        return true;
      }
    }

    // For an empty class where the body is only made up of comments, we
    // need to attach this as a dangling comment on the class node itself
    if (!(enclosingNode.body && enclosingNode.body.length > 0)) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
  }
  return false;
}

function handleFunction(text, enclosingNode, followingNode, comment, options) {
  if (
    enclosingNode &&
    (enclosingNode.kind === "function" || enclosingNode.kind === "method")
  ) {
    // we need to figure out if there are any comments that should be assigned
    // to the function return type. To do this we check if the comment location
    // is between the last argument end location and the return type start location.
    let argumentsLocEnd = 0;
    for (let i = 0; i < enclosingNode.arguments.length; i++) {
      argumentsLocEnd =
        options.locEnd(enclosingNode.arguments[i]) > argumentsLocEnd
          ? options.locEnd(enclosingNode.arguments[i])
          : argumentsLocEnd;
    }
    const commentIsBetweenArgumentsAndBody =
      enclosingNode.body &&
      options.locStart(comment) > argumentsLocEnd &&
      options.locEnd(comment) < options.locStart(enclosingNode.body);
    const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
      text,
      comment,
      options
    );
    // we additionally need to check if this isn't a trailing argument comment,
    // by checking the next character isn't ")"
    if (
      enclosingNode.type &&
      commentIsBetweenArgumentsAndBody &&
      text.charAt(nextCharIndex) !== ")"
    ) {
      if (options.locEnd(comment) < options.locStart(enclosingNode.type)) {
        // we need to store this as a dangling comment in case the type is nullable
        // ie function(): ?string {} - the "nullable" attribute is part of the
        // function node, not the type.
        addDanglingComment(enclosingNode.type, comment);
        return true;
      }
      addTrailingComment(enclosingNode.type, comment);
      return true;
    }
  }
  return false;
}

function handleFunctionParameter(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (
    !enclosingNode ||
    !["function", "method", "parameter"].includes(enclosingNode.kind)
  ) {
    return false;
  }
  if (
    precedingNode.kind === "typereference" &&
    followingNode.kind === "identifier"
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleBreakAndContinueStatementComments(enclosingNode, comment) {
  if (
    enclosingNode &&
    (enclosingNode.kind === "continue" || enclosingNode.kind === "break") &&
    !enclosingNode.label
  ) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleGoto(enclosingNode, comment) {
  if (enclosingNode && ["label", "goto"].includes(enclosingNode.kind)) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleHalt(precedingNode, enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.kind === "halt") {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  if (precedingNode && precedingNode.kind === "halt") {
    addDanglingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleCommentInEmptyParens(text, enclosingNode, comment, options) {
  const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
    text,
    comment,
    options
  );

  if (text.charAt(nextCharIndex) !== ")") {
    return false;
  }

  // Only add dangling comments to fix the case when no arguments are present,
  // i.e. a function without any argument.
  if (
    enclosingNode &&
    (enclosingNode.kind === "function" ||
      enclosingNode.kind === "closure" ||
      enclosingNode.kind === "method" ||
      enclosingNode.kind === "call" ||
      enclosingNode.kind === "new") &&
    enclosingNode.arguments.length === 0
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleInlineComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment
) {
  if (followingNode && followingNode.kind === "inline") {
    if (!followingNode.leadingComments) {
      followingNode.leadingComments = [];
    }

    if (!followingNode.leadingComments.includes(comment)) {
      followingNode.leadingComments.push(comment);
    }

    return true;
  } else if (
    !enclosingNode &&
    !followingNode &&
    precedingNode &&
    precedingNode.kind === "inline"
  ) {
    addDanglingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleEntryComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.kind === "entry") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleAssignComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.kind === "assign" && followingNode) {
    const equalSignOffset =
      enclosingNode.loc.start.offset + enclosingNode.loc.source.indexOf("=");

    if (comment.loc.start.offset > equalSignOffset) {
      addLeadingComment(followingNode, comment);
      return true;
    }
  }

  return false;
}

function handleTryComments(enclosingNode, followingNode, comment) {
  if (!enclosingNode || enclosingNode.kind !== "try" || !followingNode) {
    return false;
  }

  if (followingNode.kind === "block") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.kind === "try") {
    addBlockOrNotComment(followingNode.always, comment);
    return true;
  }

  if (followingNode.kind === "catch") {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }

  return false;
}

function handleCallComments(precedingNode, enclosingNode, comment) {
  if (
    enclosingNode &&
    enclosingNode.kind === "call" &&
    precedingNode &&
    enclosingNode.what === precedingNode &&
    enclosingNode.arguments.length > 0
  ) {
    addLeadingComment(enclosingNode.arguments[0], comment);
    return true;
  }
  return false;
}

function handleNamespaceComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment
) {
  if (
    !followingNode &&
    !precedingNode &&
    enclosingNode &&
    enclosingNode.kind === "namespace" &&
    !enclosingNode.withBrackets
  ) {
    addTrailingComment(enclosingNode, comment);
    return true;
  } else if (
    !precedingNode &&
    enclosingNode &&
    enclosingNode.kind === "namespace" &&
    !enclosingNode.withBrackets
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleDeclareComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment
) {
  if (!enclosingNode || enclosingNode.kind !== "declare") {
    return false;
  }

  if (precedingNode && precedingNode.kind === "noop") {
    return false;
  }

  if (!followingNode || enclosingNode.directives[0] === followingNode) {
    if (enclosingNode.mode === "none") {
      addTrailingComment(enclosingNode, comment);
    } else {
      addDanglingComment(enclosingNode, comment);
    }

    return true;
  }

  if (followingNode && precedingNode) {
    addLeadingComment(followingNode, comment);

    return true;
  }

  return false;
}

function handleWhileComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  if (!enclosingNode || enclosingNode.kind !== "while" || !followingNode) {
    return false;
  }
  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   while (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).

  const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
    text,
    comment,
    options
  );
  const nextCharacter = text.charAt(nextCharIndex);

  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.kind === "block") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  return false;
}

// https://github.com/prettier/prettier/blob/master/src/main/comments.js#L335
function printComment(commentPath, options) {
  const comment = commentPath.getValue();
  comment.printed = true;
  return options.printer.printComment(commentPath, options);
}

// https://github.com/prettier/prettier/blob/master/src/main/comments.js#L440
function printDanglingComments(path, options, sameIndent, filter) {
  const parts = [];
  const node = path.getValue();

  if (!node || !node.comments) {
    return "";
  }

  path.each((commentPath) => {
    const comment = commentPath.getValue();
    if (
      comment &&
      !comment.leading &&
      !comment.trailing &&
      (!filter || filter(comment))
    ) {
      parts.push(printComment(commentPath, options));
    }
  }, "comments");

  if (parts.length === 0) {
    return "";
  }

  if (sameIndent) {
    return join(hardline, parts);
  }
  return indent(concat([hardline, join(hardline, parts)]));
}

function hasLeadingComment(node) {
  return node.comments && node.comments.some((comment) => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some((comment) => comment.trailing);
}

function hasLeadingOwnLineComment(text, node, options) {
  return (
    node.comments &&
    node.comments.some(
      (comment) => comment.leading && hasNewline(text, options.locEnd(comment))
    )
  );
}

function printComments(comments, options) {
  const parts = [];
  comments.forEach((comment, index, comments) => {
    comment.printed = true;
    const isLastComment = comments.length === index + 1;
    parts.push(comment.value);
    if (!isLastComment) {
      parts.push(hardline);
    }
    if (
      isNextLineEmpty(options.originalText, comment, options) &&
      !isLastComment
    ) {
      parts.push(hardline);
    }
  });
  return concat(parts);
}

function isBlockComment(comment) {
  return comment.kind === "commentblock";
}

function getCommentChildNodes(node) {
  if (typeof node !== "object") {
    return [];
  }

  const getChildNodes = (node) =>
    Object.keys(node)
      .filter(
        (n) =>
          n !== "kind" &&
          n !== "loc" &&
          n !== "errors" &&
          n !== "extra" &&
          n !== "comments" &&
          n !== "leadingComments" &&
          n !== "enclosingNode" &&
          n !== "precedingNode" &&
          n !== "followingNode"
      )
      .map((n) => node[n]);

  return getChildNodes(node);
}

function canAttachComment(node) {
  return (
    node.kind && node.kind !== "commentblock" && node.kind !== "commentline"
  );
}

// Based on https://github.com/prettier/prettier/blob/master/src/main/comments.js
// TODO remove after https://github.com/prettier/prettier/issues/5087
function prependCursorPlaceholder(path, options, printed) {
  if (path.getNode() === options.cursorNode && path.getValue()) {
    return concat([cursor, printed, cursor]);
  }

  return printed;
}

function printLeadingComment(commentPath, print, options) {
  const comment = commentPath.getValue();
  const contents = printComment(commentPath, options);

  if (!contents) {
    return "";
  }

  const isBlock =
    options.printer.isBlockComment && options.printer.isBlockComment(comment);

  // Leading block comments should see if they need to stay on the
  // same line or not.
  if (isBlock) {
    return concat([
      contents,
      hasNewline(options.originalText, options.locEnd(comment))
        ? hardline
        : " ",
    ]);
  }

  return concat([contents, hardline]);
}

function printTrailingComment(commentPath, print, options) {
  const comment = commentPath.getValue();
  const contents = printComment(commentPath, options);
  if (!contents) {
    return "";
  }
  const isBlock =
    options.printer.isBlockComment && options.printer.isBlockComment(comment);

  if (
    hasNewline(options.originalText, options.locStart(comment), {
      backwards: true,
    })
  ) {
    // This allows comments at the end of nested structures:
    // {
    //   x: 1,
    //   y: 2
    //   // A comment
    // }
    // Those kinds of comments are almost always leading comments, but
    // here it doesn't go "outside" the block and turns it into a
    // trailing comment for `2`. We can simulate the above by checking
    // if this a comment on its own line; normal trailing comments are
    // always at the end of another expression.

    const isLineBeforeEmpty = isPreviousLineEmpty(
      options.originalText,
      comment,
      options
    );

    return lineSuffix(
      concat([hardline, isLineBeforeEmpty ? hardline : "", contents])
    );
  } else if (isBlock) {
    // Trailing block comments never need a newline
    return concat([" ", contents]);
  }

  return concat([
    lineSuffix(concat([" ", contents])),
    !isBlock ? breakParent : "",
  ]);
}

function printAllComments(path, print, options, needsSemi) {
  const value = path.getValue();
  const printed = print(path);
  const comments = value && value.comments;

  if (!comments || comments.length === 0) {
    return prependCursorPlaceholder(path, options, printed);
  }

  const leadingParts = [];
  const trailingParts = [needsSemi ? ";" : "", printed];

  path.each((commentPath) => {
    const comment = commentPath.getValue();
    const { leading, trailing } = comment;

    if (leading) {
      const contents = printLeadingComment(commentPath, print, options);
      if (!contents) {
        return;
      }
      leadingParts.push(contents);

      const text = options.originalText;
      if (hasNewline(text, skipNewline(text, options.locEnd(comment)))) {
        leadingParts.push(hardline);
      }
    } else if (trailing) {
      trailingParts.push(printTrailingComment(commentPath, print, options));
    }
  }, "comments");

  return prependCursorPlaceholder(
    path,
    options,
    concat(leadingParts.concat(trailingParts))
  );
}

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  getCommentChildNodes,
  canAttachComment,
  isBlockComment,
  printDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  hasLeadingOwnLineComment,
  printComments,
  printAllComments,
};
