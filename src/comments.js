"use strict";

const utils = require("prettier").util;
const docBuilders = require("prettier").doc.builders;

const addDanglingComment = utils.addDanglingComment;
const concat = docBuilders.concat;
const join = docBuilders.join;
const indent = docBuilders.indent;
const hardline = docBuilders.hardline;

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

const handleOwnLineComment = function(comment) {
  return (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  );
};

const handleEndOfLineComment = function(comment) {
  return (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  );
};

const handleRemainingComment = function(comment) {
  return (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  );
};

const handleForLoop = function(comment) {
  const enclosingNode = comment.enclosingNode;
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

const handleClass = function(comment) {
  const enclosingNode = comment.enclosingNode;
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

const handleFunction = function(comment) {
  const enclosingNode = comment.enclosingNode;
  const followingNode = comment.followingNode;
  if (
    enclosingNode &&
    (enclosingNode.kind === "function" || enclosingNode.kind === "method")
  ) {
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

const handleTryCatch = function(comment) {
  const enclosingNode = comment.enclosingNode;
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

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  printDanglingComments
};
