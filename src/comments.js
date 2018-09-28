"use strict";

const {
  addLeadingComment,
  addDanglingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacterIndex,
  isNextLineEmpty
} = require("prettier").util;
const { concat, join, indent, hardline } = require("prettier").doc.builders;
// TODO: remove after resolve https://github.com/prettier/prettier/pull/5049
const { hasNewline, hasNewlineInRange } = require("./util");
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

function handleOwnLineComment(comment, text, options, ast, isLastComment) {
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
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(text, enclosingNode, comment, options) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleForComments(enclosingNode, precedingNode, followingNode, comment) ||
    handleTryCatch(enclosingNode, comment) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleInlineComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleHalt(enclosingNode, precedingNode, comment)
  );
}

function handleEndOfLineComment(comment, text, options, ast, isLastComment) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  return (
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
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(text, enclosingNode, comment, options) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleTryCatch(enclosingNode, comment) ||
    handleEntryComments(enclosingNode, comment) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleHalt(enclosingNode, precedingNode, comment) ||
    handleVariableComments(enclosingNode, followingNode, comment)
  );
}

function handleRemainingComment(comment, text, options, ast, isLastComment) {
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
    handleCommentInEmptyParens(text, enclosingNode, comment, options) ||
    handleClassComments(enclosingNode, followingNode, comment) ||
    handleFunctionParameter(text, enclosingNode, comment, options) ||
    handleFunction(text, enclosingNode, followingNode, comment, options) ||
    handleTryCatch(enclosingNode, comment) ||
    handleGoto(enclosingNode, comment) ||
    handleHalt(enclosingNode, precedingNode, comment) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleBreakAndContinueStatementComments(enclosingNode, comment)
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

function handleIfStatementComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (!enclosingNode || enclosingNode.kind !== "if" || !followingNode) {
    return false;
  }

  if (followingNode.kind === "if") {
    addBlockOrNotComment(followingNode.body, comment);
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

function handleClassComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.kind === "class") {
    // for extends nodes that have leading comments, we can store them as
    // dangling comments so we can handle them in the printer
    if (followingNode === enclosingNode.extends) {
      addDanglingComment(followingNode, comment);
      return true;
    }
    // check each implements node - if any of them have comments we can store
    // them as dangling comments and handle them in the printer
    if (followingNode && enclosingNode.implements) {
      if (
        enclosingNode.implements.some(implementsNode => {
          if (followingNode && followingNode === implementsNode) {
            addDanglingComment(followingNode, comment);
            return true;
          }
        })
      ) {
        return true;
      }
    }
    // for an empty class where the body is only made up of comments, we
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

    // for empty functions where the body is only made up of comments, we need
    // to attach this as a dangling comment on the function node itself
    if (
      !followingNode && // make sure we're not grabbing inline parameter comments
      !(enclosingNode.body && enclosingNode.body.children.length > 0)
    ) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
  }
  return false;
}

function handleFunctionParameter(text, enclosingNode, comment, options) {
  if (
    !enclosingNode ||
    !["function", "method", "parameter"].includes(enclosingNode.kind)
  ) {
    return false;
  }
  // for function parameters that are assignments, we have no node to assign comments
  // that fall in between the var being assigned and the "=" character. To get around this,
  // we'll store any comments falling here as dangling comments on the parameter node,
  // and let the printer handle them accordingly
  const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
    text,
    comment,
    options
  );
  if (text.charAt(nextCharIndex) + text.charAt(nextCharIndex + 1) === "= ") {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleTryCatch(enclosingNode, comment) {
  if (
    enclosingNode &&
    (enclosingNode.kind === "try" || enclosingNode.kind === "catch")
  ) {
    // for empty try/catch blocks where the body is only made up of comments, we need
    // to attach this as a dangling comment on the node itself
    if (!(enclosingNode.body && enclosingNode.body.children.length > 0)) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
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
  if (enclosingNode && enclosingNode.kind === "goto") {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleHalt(enclosingNode, precedingNode, comment) {
  if (enclosingNode && enclosingNode.kind === "halt") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  if (precedingNode && precedingNode.kind === "halt") {
    addLeadingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleCommentInEmptyParens(text, enclosingNode, comment) {
  // Only add dangling comments to fix the case when no arguments are present,
  // i.e. a function without any argument.
  if (
    enclosingNode &&
    (enclosingNode.kind === "closure" ||
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
  if (!enclosingNode && followingNode && followingNode.kind === "inline") {
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

function handleOnlyComments(enclosingNode, ast, comment, isLastComment) {
  if (
    enclosingNode &&
    enclosingNode.kind === "program" &&
    enclosingNode.children.length === 0
  ) {
    if (isLastComment) {
      addDanglingComment(enclosingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }
    return true;
  }
  return false;
}

function handleVariableComments(enclosingNode, followingNode, comment) {
  if (
    enclosingNode &&
    enclosingNode.kind === "assign" &&
    followingNode &&
    (followingNode.kind === "array" ||
      followingNode.kind === "string" ||
      followingNode.kind === "encapsed")
  ) {
    addLeadingComment(followingNode, comment);
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

  path.each(commentPath => {
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
  return node.comments && node.comments.some(comment => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some(comment => comment.trailing);
}

function hasLeadingOwnLineComment(text, node, options) {
  return (
    node.comments &&
    node.comments.some(
      comment => comment.leading && hasNewline(text, options.locEnd(comment))
    )
  );
}

function printComments(comments, options) {
  const parts = [];
  comments.forEach((comment, index, comments) => {
    comment.printed = true;
    parts.push(comment.value);
    parts.push(hardline);
    if (
      isNextLineEmpty(options.originalText, comment, options) &&
      comments.length > index + 1
    ) {
      parts.push(hardline);
    }
  });
  return concat(parts);
}

// This recurses the return argument, looking for the first token
// (the leftmost leaf node) and, if it (or its parents) has any
// leadingComments, returns true (so it can be wrapped in parens).
function returnArgumentHasLeadingComment(options, argument) {
  if (hasLeadingOwnLineComment(options.originalText, argument, options)) {
    return true;
  }

  return false;
}

function isBlockComment(comment) {
  return comment.kind === "commentblock";
}

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  isBlockComment,
  printDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  hasLeadingOwnLineComment,
  printComments,
  returnArgumentHasLeadingComment
};
