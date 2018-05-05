"use strict";

const {
  addLeadingComment,
  addDanglingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacterIndex
} = require("prettier").util;
const { concat, join, indent, hardline } = require("prettier").doc.builders;

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

const handleOwnLineComment = (comment, text, options) => {
  return (
    handleClass(comment) ||
    handleFunctionParameter(comment, text, options) ||
    handleFunction(comment, text, options) ||
    handleForLoop(comment) ||
    handleTryCatch(comment) ||
    handleAlternate(comment)
  );
};

const handleEndOfLineComment = (comment, text, options) => {
  return (
    handleClass(comment) ||
    handleFunctionParameter(comment, text, options) ||
    handleFunction(comment, text, options) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  );
};

const handleRemainingComment = (comment, text, options) => {
  return (
    handleClass(comment) ||
    handleFunctionParameter(comment, text, options) ||
    handleFunction(comment, text, options) ||
    handleForLoop(comment) ||
    handleTryCatch(comment) ||
    handleBreakAndContinueStatementComments(comment) ||
    handleGoto(comment) ||
    handleHalt(comment)
  );
};

const handleForLoop = comment => {
  const { enclosingNode } = comment;
  if (
    enclosingNode &&
    (enclosingNode.kind === "for" || enclosingNode.kind === "foreach")
  ) {
    // for an empty for loop where the body is only made up of comments, we
    // need to attach this as a dangling comment on the for loop itself
    if (!(enclosingNode.body && enclosingNode.body.children.length > 0)) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
  }
  return false;
};

const handleClass = comment => {
  const { enclosingNode } = comment;
  if (enclosingNode && enclosingNode.kind === "class") {
    // for an empty class where the body is only made up of comments, we
    // need to attach this as a dangling comment on the class node itself
    if (!(enclosingNode.body && enclosingNode.body.length > 0)) {
      addDanglingComment(enclosingNode, comment);
      return true;
    }
  }
  return false;
};

const handleFunction = (comment, text, options) => {
  const { enclosingNode, followingNode } = comment;
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
};

const handleFunctionParameter = (comment, text, options) => {
  const { enclosingNode } = comment;
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
};

const handleTryCatch = comment => {
  const { enclosingNode } = comment;
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
};

function handleBreakAndContinueStatementComments(comment) {
  const { enclosingNode } = comment;
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

const handleGoto = comment => {
  const { enclosingNode } = comment;
  if (enclosingNode && enclosingNode.kind === "goto") {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
};

const handleHalt = comment => {
  const { enclosingNode } = comment;
  if (enclosingNode && enclosingNode.kind === "halt") {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
};

const handleAlternate = comment => {
  const { enclosingNode, followingNode } = comment;
  if (
    enclosingNode &&
    enclosingNode.kind === "if" &&
    followingNode &&
    followingNode.kind == "if"
  ) {
    addLeadingComment(followingNode.body, comment);
    return true;
  }
  return false;
};

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

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  printDanglingComments,
  hasLeadingComment,
  hasTrailingComment
};
