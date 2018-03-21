"use strict";

const utils = require("prettier").util;

const addDanglingComment = utils.addDanglingComment;

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
  if (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  ) {
    return true;
  }
  return false;
};

const handleEndOfLineComment = function(comment) {
  if (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  ) {
    return true;
  }
  return false;
};

const handleRemainingComment = function(comment) {
  if (
    handleClass(comment) ||
    handleFunction(comment) ||
    handleForLoop(comment) ||
    handleTryCatch(comment)
  ) {
    return true;
  }
  return false;
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

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
};
