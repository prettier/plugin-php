"use strict";

const utils = require("prettier").util;

const addLeadingComment = utils.addLeadingComment;
const addTrailingComment = utils.addTrailingComment;
const addDanglingComment = utils.addDanglingComment;

const handleOwnLineComment = function(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  if (handleClass(comment) || handleFunction(comment)) {
    return true;
  }
  return false;
};

const handleEndOfLineComment = function(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  if (handleClass(comment) || handleFunction(comment)) {
    return true;
  }
  return false;
};

const handleRemainingComment = function(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  if (handleClass(comment) || handleFunction(comment)) {
    return true;
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
}

const handleFunction = function(comment) {
  const enclosingNode = comment.enclosingNode;
  const followingNode = comment.followingNode;
  if (
    (enclosingNode && enclosingNode.kind === "function") ||
    (enclosingNode && enclosingNode.kind === "method")
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
}

module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
};
