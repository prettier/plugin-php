"use strict";

const {
  breakParent,
  concat,
  join,
  line,
  lineSuffix,
  lineSuffixBoundary,
  group,
  conditionalGroup,
  indent,
  dedent,
  ifBreak,
  hardline,
  softline,
  literalline,
  align,
  dedentToRoot
} = require("prettier").doc.builders;
const { willBreak } = require("prettier").doc.utils;
const {
  makeString,
  isNextLineEmpty,
  isNextLineEmptyAfterIndex,
  getNextNonSpaceNonCommentCharacterIndex
} = require("prettier").util;
const comments = require("./comments");

const {
  getLast,
  getPenultimate,
  isNextNodeInline,
  isLastStatement,
  lineShouldEndWithSemicolon,
  printNumber,
  shouldFlatten,
  getNodeIndex,
  removeNewlines,
  maybeStripLeadingSlashFromUse,
  fileShouldEndWithHardline,
  hasDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  docShouldHaveTrailingNewline,
  isMemberish,
  isPrevNodeInline,
  getPreviousNodeInParentListProperty,
  getNextNodeInParentListProperty,
  isNodeFullyNestedInline,
  isNextNodeFullyNestedInline,
  isPreviousNodeFullyNestedInline
} = require("./util");

function shouldPrintComma(options) {
  switch (options.trailingComma) {
    case "all":
      return true;
    // fallthrough
    case "none":
    default:
      return false;
  }
}

function genericPrint(path, options, print) {
  const node = path.getValue();
  if (!node) {
    return "";
  } else if (typeof node === "string") {
    return node;
  }
  // there are 2 mixed php/html cases we need to account for here
  // 1) a full php node nested within html (handled below)
  // 2) inline html mixed within a php node (handled in the nodes themselves)

  const isProgramNode = node.kind === "program";
  // case 1, which can be treated the same as the top-level program node
  const isFullNestedNode = isNodeFullyNestedInline(path);
  let shouldHaveOpenTag =
    isFullNestedNode ||
    (isProgramNode && !node.children[0]) ||
    (isProgramNode && node.children[0] && node.children[0].kind !== "inline");

  // if the first node is fully nested inline, it will handle its own tags
  if (isProgramNode) {
    path.map((childPath, index) => {
      if (index === 0 && isNodeFullyNestedInline(childPath)) {
        shouldHaveOpenTag = false;
      }
    }, "children");
  }

  const printed = printNode(path, options, print);
  if (shouldHaveOpenTag) {
    const shouldHaveCloseTag =
      isFullNestedNode ||
      (isProgramNode && node.loc.source.trim().endsWith("?>"));

    if (isFullNestedNode) {
      const tagOpenIndex = options.originalText.lastIndexOf(
        "<",
        options.locStart(node)
      );
      let alignment = options.originalText.substring(0, tagOpenIndex);
      if (options.originalText.lastIndexOf("\n", tagOpenIndex) > -1) {
        alignment = options.originalText.substring(
          options.originalText.lastIndexOf("\n", tagOpenIndex) + 1,
          tagOpenIndex
        );
      }
      return dedentToRoot(
        group(
          concat([
            "<?php",
            align(
              new Array(alignment.length + 1).join(" "),
              concat([
                line,
                printed,
                lineShouldEndWithSemicolon(path) ? ";" : "",
                line,
                "?>"
              ])
            )
          ])
        )
      );
    }

    return group(
      concat([
        "<?php",
        line,
        printed,
        lineShouldEndWithSemicolon(path) ? ";" : "",
        shouldHaveCloseTag ? concat([line, "?>"]) : "",
        fileShouldEndWithHardline(path) ? hardline : ""
      ])
    );
  }

  if (node.kind === "inline") {
    const parentNode = path.getParentNode();
    const isParentProgramNode = parentNode && parentNode.kind === "program";
    const nodeIndex = getNodeIndex(path);
    const previousNode = getPreviousNodeInParentListProperty(path);
    const nextNode = getNextNodeInParentListProperty(path);
    // case 2 (closing tag to start inline html)
    return concat([
      !(isParentProgramNode && nodeIndex === 0) &&
      !isPreviousNodeFullyNestedInline(path)
        ? previousNode
          ? " ?>"
          : "?>"
        : "",
      printed,
      !(isParentProgramNode && nodeIndex === parentNode.children.length - 1) &&
      !isNextNodeFullyNestedInline(path)
        ? nextNode
          ? "<?php "
          : "<?php"
        : ""
    ]);
  }
  const shouldRemoveNewLines = isPrevNodeInline(path) || isNextNodeInline(path);
  return concat([
    // case 2 (opening tag to close inline html)
    shouldRemoveNewLines ? removeNewlines(printed) : printed,
    lineShouldEndWithSemicolon(path) ? ";" : "",
    fileShouldEndWithHardline(path) ? hardline : ""
  ]);
}

function printPropertyLookup(path, options, print) {
  const node = path.getValue();
  return group(
    concat(["->", wrapPropertyLookup(node, path.call(print, "offset"))])
  );
}

function printStaticLookup(path, options, print) {
  return concat(["::", path.call(print, "offset")]);
}

function printOffsetLookup(path, options, print) {
  const node = path.getValue();
  const isOffsetNumberNode = node.offset && node.offset.kind === "number";
  return concat([
    "[",
    node.offset
      ? group(
          concat([
            indent(
              concat([
                isOffsetNumberNode ? "" : softline,
                path.call(print, "offset")
              ])
            ),
            isOffsetNumberNode ? "" : softline
          ])
        )
      : "",
    "]"
  ]);
}

// We detect calls on member expressions specially to format a
// common pattern better. The pattern we are looking for is this:
//
// $arr
//   ->map(function(x) { return $x + 1; })
//   ->filter(function(x) { return $x > 10; })
//   ->some(function(x) { return $x % 2; });
//
// The way it is structured in the AST is via a nested sequence of
// propertylookup, staticlookup, offsetlookup and call.
// We need to traverse the AST and make groups out of it
// to print it in the desired way.
function printMemberChain(path, options, print) {
  // The first phase is to linearize the AST by traversing it down.
  //
  // Example:
  //   a()->b->c()->d();
  // has the AST structure
  //   call (propertylookup d (
  //     call (propertylookup c (
  //       propertylookup b (
  //         call (identifier a)
  //       )
  //     ))
  //   ))
  // and we transform it into (notice the reversed order)
  //   [identifier a, call, propertylookup b, propertylookup c, call,
  //    propertylookup d, call]
  const printedNodes = [];

  // Here we try to retain one typed empty line after each call expression or
  // the first group whether it is in parentheses or not
  //
  // Example:
  //   $a
  //     ->call()
  //
  //     ->otherCall();
  //
  //   ($foo ? $a : $b)
  //     ->call()
  //     ->otherCall();
  function shouldInsertEmptyLineAfter(node) {
    const { originalText } = options;
    const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(
      originalText,
      node,
      options
    );
    const nextChar = originalText.charAt(nextCharIndex);

    // if it is cut off by a parenthesis, we only account for one typed empty
    // line after that parenthesis
    if (nextChar === ")") {
      return isNextLineEmptyAfterIndex(
        originalText,
        nextCharIndex + 1,
        options
      );
    }

    return isNextLineEmpty(originalText, node, options);
  }

  function traverse(path) {
    const node = path.getValue();
    if (
      node.kind === "call" &&
      (isMemberish(node.what) || node.what.type === "call")
    ) {
      printedNodes.unshift({
        node,
        printed: concat([
          printArgumentsList(path, options, print),
          shouldInsertEmptyLineAfter(node) ? hardline : ""
        ])
      });
      path.call(what => traverse(what), "what");
    } else if (isMemberish(node)) {
      // Print *lookup nodes as we standard print them outside member chain
      let printedMemberish = null;
      if (node.kind === "propertylookup") {
        printedMemberish = printPropertyLookup(path, options, print);
      } else if (node.kind === "staticlookup") {
        printedMemberish = printStaticLookup(path, options, print);
      } else {
        printedMemberish = printOffsetLookup(path, options, print);
      }
      printedNodes.unshift({
        node,
        printed: printedMemberish
      });
      path.call(what => traverse(what), "what");
    } else {
      printedNodes.unshift({
        node,
        printed: path.call(print)
      });
    }
  }
  const node = path.getValue();
  printedNodes.unshift({
    node,
    printed: printArgumentsList(path, options, print)
  });
  path.call(what => traverse(what), "what");

  // create groups from list of nodes, i.e.
  //   [identifier a, call, propertylookup b, propertylookup c, call,
  //    propertylookup d, call]
  // will be grouped as
  //   [
  //     [identifier a, Call],
  //     [propertylookup b, propertylookup c, call],
  //     [propertylookup d, call]
  //   ]
  // so that we can print it as
  //   a()
  //     ->b->c()
  //     ->d();
  const groups = [];
  let currentGroup = [printedNodes[0]];
  let i = 1;
  for (; i < printedNodes.length; ++i) {
    if (
      printedNodes[i].node.kind === "call" ||
      (printedNodes[i].node.kind === "offsetlookup" &&
        printedNodes[i].node.offset &&
        printedNodes[i].node.offset.kind === "number")
    ) {
      currentGroup.push(printedNodes[i]);
    } else {
      break;
    }
  }
  if (printedNodes[0].node.kind !== "call") {
    for (; i + 1 < printedNodes.length; ++i) {
      if (
        isMemberish(printedNodes[i].node) &&
        isMemberish(printedNodes[i + 1].node)
      ) {
        currentGroup.push(printedNodes[i]);
      } else {
        break;
      }
    }
  }
  groups.push(currentGroup);
  currentGroup = [];

  // Then, each following group is a sequence of propertylookup followed by
  // a sequence of call. To compute it, we keep adding things to the
  // group until we have seen a call in the past and reach a
  // propertylookup
  let hasSeenCallExpression = false;
  for (; i < printedNodes.length; ++i) {
    if (hasSeenCallExpression && isMemberish(printedNodes[i].node)) {
      // [0] should be appended at the end of the group instead of the
      // beginning of the next one
      if (
        printedNodes[i].node.kind === "offsetlookup" &&
        printedNodes[i].node.offset &&
        printedNodes[i].node.offset.kind === "number"
      ) {
        currentGroup.push(printedNodes[i]);
        continue;
      }

      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }

    if (printedNodes[i].node.kind === "call") {
      hasSeenCallExpression = true;
    }
    currentGroup.push(printedNodes[i]);

    if (
      printedNodes[i].node.comments &&
      comments.hasTrailingComment(printedNodes[i].node)
    ) {
      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }
  }
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Merge next nodes when:
  //
  // 1. We have `$this` variable before
  //
  // Example:
  //     $this->method()->property;
  //
  // 2. When we have offsetlookup after *lookup node
  //
  // Example:
  //    $foo->Data['key']("foo")
  //      ->method();
  //
  const shouldMerge =
    groups.length >= 2 &&
    !groups[1][0].node.comments &&
    ((groups[0].length === 1 &&
      (groups[0][0].node.kind === "variable" &&
        groups[0][0].node.name === "this")) ||
      (groups[0].length > 1 &&
        (isMemberish(groups[0][groups[0].length - 1].node) &&
          groups[0][groups[0].length - 1].node.what.kind === "variable" &&
          (groups[1].length && groups[1][0].node.kind === "offsetlookup"))));

  function printGroup(printedGroup) {
    return concat(printedGroup.map(tuple => tuple.printed));
  }

  function printIndentedGroup(groups) {
    if (groups.length === 0) {
      return "";
    }
    return indent(
      group(concat([hardline, join(hardline, groups.map(printGroup))]))
    );
  }

  const printedGroups = groups.map(printGroup);
  const oneLine = concat(printedGroups);

  // Indicates how many we should merge
  //
  // Example (true):
  //   $this->method()->otherMethod(
  //     'argument'
  //   );
  //
  // Example (false):
  //   $foo
  //     ->method()
  //     ->otherMethod();
  const cutoff = shouldMerge ? 3 : 2;
  const flatGroups = groups
    .slice(0, cutoff)
    .reduce((res, group) => res.concat(group), []);

  const hasComment =
    flatGroups
      .slice(1, -1)
      .some(node => comments.hasLeadingComment(node.node)) ||
    flatGroups
      .slice(0, -1)
      .some(node => comments.hasTrailingComment(node.node)) ||
    (groups[cutoff] && comments.hasLeadingComment(groups[cutoff][0].node));

  // If we only have a single `->`, we shouldn't do anything fancy and just
  // render everything concatenated together.
  if (groups.length <= cutoff && !hasComment) {
    return group(oneLine);
  }

  // Find out the last node in the first group and check if it has an
  // empty line after
  const lastNodeBeforeIndent = getLast(
    shouldMerge ? groups.slice(1, 2)[0] : groups[0]
  ).node;
  const shouldHaveEmptyLineBeforeIndent =
    lastNodeBeforeIndent.kind !== "call" &&
    shouldInsertEmptyLineAfter(lastNodeBeforeIndent);

  const expanded = concat([
    printGroup(groups[0]),
    shouldMerge ? concat(groups.slice(1, 2).map(printGroup)) : "",
    shouldHaveEmptyLineBeforeIndent ? hardline : "",
    printIndentedGroup(groups.slice(shouldMerge ? 2 : 1))
  ]);

  const callExpressionCount = printedNodes.filter(
    tuple => tuple.node.kind === "call"
  ).length;

  // We don't want to print in one line if there's:
  //  * A comment.
  //  * 3 or more chained calls.
  //  * Any group but the last one has a hard line.
  // If the last group is a function it's okay to inline if it fits.
  if (
    hasComment ||
    callExpressionCount >= 3 ||
    printedGroups.slice(0, -1).some(willBreak)
  ) {
    return group(expanded);
  }

  return concat([
    // We only need to check `oneLine` because if `expanded` is chosen
    // that means that the parent group has already been broken
    // naturally
    willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "",
    conditionalGroup([oneLine, expanded])
  ]);
}

function couldGroupArg(arg) {
  return (
    (arg.kind === "array" && (arg.items.length > 0 || arg.comments)) ||
    arg.kind === "function" ||
    arg.kind === "method" ||
    arg.kind === "closure"
  );
}

function shouldGroupLastArg(args) {
  const lastArg = getLast(args);
  const penultimateArg = getPenultimate(args);
  return (
    !hasLeadingComment(lastArg) &&
    !hasTrailingComment(lastArg) &&
    couldGroupArg(lastArg) &&
    // If the last two arguments are of the same type,
    // disable last element expansion.
    (!penultimateArg || penultimateArg.kind !== lastArg.kind)
  );
}

function shouldGroupFirstArg(args) {
  if (args.length !== 2) {
    return false;
  }

  const [firstArg, secondArg] = args;
  return (
    (!firstArg.comments || !firstArg.comments.length) &&
    (firstArg.kind === "function" ||
      firstArg.kind === "method" ||
      firstArg.kind === "closure") &&
    !couldGroupArg(secondArg)
  );
}

function printArgumentsList(path, options, print, argumentsKey = "arguments") {
  const args = path.getValue()[argumentsKey];

  if (args.length === 0) {
    return concat([
      "(",
      comments.printDanglingComments(path, options, /* sameIndent */ true),
      ")"
    ]);
  }

  let anyArgEmptyLine = false;
  let hasEmptyLineFollowingFirstArg = false;
  const lastArgIndex = args.length - 1;
  const printedArguments = path.map((argPath, index) => {
    const arg = argPath.getNode();
    const parts = [print(argPath)];

    if (
      index !== lastArgIndex &&
      ((arg.kind === "encapsed" && arg.type === "heredoc") ||
        arg.kind === "nowdoc")
    ) {
      parts.push(hardline);
    }

    if (index === lastArgIndex) {
      // do nothing
    } else if (isNextLineEmpty(options.originalText, arg, options)) {
      if (index === 0) {
        hasEmptyLineFollowingFirstArg = true;
      }

      anyArgEmptyLine = true;
      parts.push(",", hardline, hardline);
    } else {
      parts.push(",", line);
    }

    return concat(parts);
  }, argumentsKey);

  const shouldGroupFirst = shouldGroupFirstArg(args);
  const shouldGroupLast = shouldGroupLastArg(args);
  if (shouldGroupFirst || shouldGroupLast) {
    const shouldBreak =
      (shouldGroupFirst
        ? printedArguments.slice(1).some(willBreak)
        : printedArguments.slice(0, -1).some(willBreak)) || anyArgEmptyLine;

    // We want to print the last argument with a special flag
    let printedExpanded;
    let i = 0;
    path.each(argPath => {
      if (shouldGroupFirst && i === 0) {
        printedExpanded = [
          concat([
            argPath.call(p => print(p, { expandFirstArg: true })),
            printedArguments.length > 1 ? "," : "",
            hasEmptyLineFollowingFirstArg ? hardline : line,
            hasEmptyLineFollowingFirstArg ? hardline : ""
          ])
        ].concat(printedArguments.slice(1));
      }
      if (shouldGroupLast && i === args.length - 1) {
        printedExpanded = printedArguments
          .slice(0, -1)
          .concat(argPath.call(p => print(p, { expandLastArg: true })));
      }
      i++;
    }, argumentsKey);

    const somePrintedArgumentsWillBreak = printedArguments.some(willBreak);

    return concat([
      somePrintedArgumentsWillBreak ? breakParent : "",
      conditionalGroup(
        [
          concat([
            ifBreak(
              indent(concat(["(", softline, concat(printedExpanded)])),
              concat(["(", concat(printedExpanded)])
            ),
            somePrintedArgumentsWillBreak ? softline : "",
            ")"
          ]),
          shouldGroupFirst
            ? concat([
                "(",
                group(printedExpanded[0], { shouldBreak: true }),
                concat(printedExpanded.slice(1)),
                ")"
              ])
            : concat([
                "(",
                concat(printedArguments.slice(0, -1)),
                group(getLast(printedExpanded), {
                  shouldBreak: true
                }),
                ")"
              ]),
          group(
            concat([
              "(",
              indent(concat([line, concat(printedArguments)])),
              line,
              ")"
            ]),
            { shouldBreak: true }
          )
        ],
        { shouldBreak }
      )
    ]);
  }

  const lastArgument = getLast(args);
  return group(
    concat([
      "(",
      indent(concat([softline, concat(printedArguments)])),
      softline,
      ")"
    ]),
    {
      shouldBreak:
        printedArguments.some(willBreak) ||
        anyArgEmptyLine ||
        (lastArgument.kind === "encapsed" && lastArgument.type === "heredoc") ||
        lastArgument.kind === "nowdoc"
    }
  );
}

function wrapPropertyLookup(node, doc) {
  const addCurly =
    node.kind === "propertylookup" &&
    (node.offset.kind !== "constref" || typeof node.offset.name !== "string");

  return addCurly ? concat(["{", doc, "}"]) : doc;
}

function isPropertyLookupChain(node) {
  if (node.kind !== "propertylookup") {
    return false;
  }
  if (node.what.kind === "variable") {
    return true;
  }
  return isPropertyLookupChain(node.what);
}

function shouldInlineLogicalExpression(node) {
  return node.right.kind === "array" && node.right.items.length !== 0;
}

// For binary expressions to be consistent, we need to group
// subsequent operators with the same precedence level under a single
// group. Otherwise they will be nested such that some of them break
// onto new lines but not all. Operators with the same precedence
// level should either all break or not. Because we group them by
// precedence level and the AST is structured based on precedence
// level, things are naturally broken up correctly, i.e. `&&` is
// broken before `+`.
function printBinaryExpression(
  path,
  print,
  options,
  isNested,
  isInsideParenthesis
) {
  let parts = [];
  const node = path.getValue();

  if (node.kind === "bin") {
    // Put all operators with the same precedence level in the same
    // group. The reason we only need to do this with the `left`
    // expression is because given an expression like `1 + 2 - 3`, it
    // is always parsed like `((1 + 2) - 3)`, meaning the `left` side
    // is where the rest of the expression will exist. Binary
    // expressions on the right side mean they have a difference
    // precedence level and should be treated as a separate group, so
    // print them normally. (This doesn't hold for the `**` operator,
    // which is unique in that it is right-associative.)
    if (shouldFlatten(node.type, node.left.type)) {
      // Flatten them out by recursively calling this function.
      parts = parts.concat(
        path.call(
          left =>
            printBinaryExpression(
              left,
              print,
              options,
              /* isNested */ true,
              isInsideParenthesis
            ),
          "left"
        )
      );
    } else {
      parts.push(path.call(print, "left"));
    }

    const shouldInline = shouldInlineLogicalExpression(node);

    const right = shouldInline
      ? concat([node.type, " ", path.call(print, "right")])
      : concat([node.type, line, path.call(print, "right")]);

    // If there's only a single binary expression, we want to create a group
    // in order to avoid having a small right part like -1 be on its own line.
    const parent = path.getParentNode();
    const shouldGroup =
      !(isInsideParenthesis && ["||", "&&"].includes(node.type)) &&
      parent.kind !== "bin" &&
      node.left.kind !== "bin" &&
      node.right.kind !== "bin";

    parts.push(" ", shouldGroup ? group(right) : right);
  } else {
    // Our stopping case. Simply print the node normally.
    parts.push(path.call(print));
  }

  return parts;
}

// so this is a bit hacky, but for anonymous classes, there's a chance that an
// assumption core to prettier will break - that child nodes will not overlap. In
// this case, if we have something like this:
//   $test = new class($arg1, $arg2) extends TestClass {};
// we end up with a parent "new" node, which has children "arguments", and "what"
// the "what" is a "class" node, but it overlaps with the "arguments". To solve this,
// we use this variable to store off the printed arguments when the "new" node is printing,
// so that the "class" node can then access them later
let anonymousClassesNewArguments = null;

const expressionKinds = [
  "array",
  "variable",
  "constref",
  "yield",
  "yieldfrom",
  "variable",
  "propertylookup",
  "staticlookup",
  "offsetlookup",
  "pre",
  "post",
  "bin",
  "parenthesis",
  "unary",
  "cast",
  "boolean",
  "string",
  "number",
  "inline",
  "magic",
  "nowdoc",
  "encapsed",
  "variadic"
];
function printExpression(path, options, print) {
  const node = path.getValue();
  const lookupKinds = ["propertylookup", "staticlookup", "offsetlookup"];
  function printLookup(node) {
    switch (node.kind) {
      case "propertylookup": {
        const parent = path.getParentNode();
        let firstNonMemberParent;
        let i = 0;
        do {
          firstNonMemberParent = path.getParentNode(i);
          i++;
        } while (firstNonMemberParent && isMemberish(firstNonMemberParent));

        const shouldInline =
          (firstNonMemberParent && firstNonMemberParent.kind === "new") ||
          (node.what.kind === "variable" &&
            (node.offset.kind === "constref" ||
              node.offset.kind === "variable") &&
            !isMemberish(parent));

        return group(
          concat([
            path.call(print, "what"),
            shouldInline
              ? printPropertyLookup(path, options, print)
              : group(
                  indent(
                    concat([
                      softline,
                      printPropertyLookup(path, options, print)
                    ])
                  )
                )
          ])
        );
      }
      case "staticlookup":
        return concat([
          path.call(print, "what"),
          printStaticLookup(path, options, print)
        ]);
      case "offsetlookup":
        return group(
          concat([
            path.call(print, "what"),
            printOffsetLookup(path, options, print)
          ])
        );
      default:
        return `Have not implemented lookup kind ${node.kind} yet.`;
    }
  }
  if (lookupKinds.includes(node.kind)) {
    return printLookup(node);
  }

  const operationKinds = ["pre", "post", "bin", "parenthesis", "unary", "cast"];
  function printOperation(node) {
    switch (node.kind) {
      case "pre":
        return concat([node.type + node.type, path.call(print, "what")]);
      case "post":
        return concat([path.call(print, "what"), node.type + node.type]);
      case "bin": {
        const parent = path.getParentNode();
        const parentParent = path.getParentNode(1);
        const isInsideParenthesis =
          node !== parent.body &&
          (parent.kind === "if" ||
            parent.kind === "while" ||
            parent.kind === "do");

        const parts = printBinaryExpression(
          path,
          print,
          options,
          /* isNested */ false,
          isInsideParenthesis
        );

        //   if (
        //     this.hasPlugin("dynamicImports") && this.lookahead().type === tt.parenLeft
        //   ) {
        //
        // looks super weird, we want to break the children if the parent breaks
        //
        //   if (
        //     this.hasPlugin("dynamicImports") &&
        //     this.lookahead().type === tt.parenLeft
        //   ) {
        if (isInsideParenthesis) {
          return concat(parts);
        }

        // Break between the parens in unaries or in a member expression, i.e.
        //
        //   (
        //     a &&
        //     b &&
        //     c
        //   ).call()
        if (parent.kind === "unary") {
          return group(
            concat([indent(concat([softline, concat(parts)])), softline])
          );
        }

        // Avoid indenting sub-expressions in some cases where the first sub-expression is already
        // indented accordingly. We should indent sub-expressions where the first case isn't indented.
        const shouldNotIndent =
          parent.kind === "return" ||
          parent.kind === "echo" ||
          parent.kind === "print" ||
          parent.kind === "retif" ||
          // return (
          //   $someCondition ||
          //   $someOtherCondition
          // );
          (parentParent &&
            ["echo", "return", "print"].includes(parentParent.kind) &&
            parent.kind === "parenthesis") ||
          // (
          //   $someObject ||
          //   $someOtherObject
          // )->someFunction();
          (parentParent &&
            parentParent.kind === "propertylookup" &&
            parent.kind === "parenthesis") ||
          (node !== parent.body && parent.kind === "for");

        const shouldIndentIfInlining =
          parent.kind === "assign" || parent.kind === "property";

        const samePrecedenceSubExpression =
          node.left.kind === "bin" && shouldFlatten(node.type, node.left.type);

        if (
          shouldNotIndent ||
          (shouldInlineLogicalExpression(node) &&
            !samePrecedenceSubExpression) ||
          (!shouldInlineLogicalExpression(node) && shouldIndentIfInlining)
        ) {
          return group(concat(parts));
        }

        const rest = concat(parts.slice(1));

        return group(
          concat([
            // Don't include the initial expression in the indentation
            // level. The first item is guaranteed to be the first
            // left-most expression.
            parts.length > 0 ? parts[0] : "",
            indent(rest)
          ])
        );
      }
      case "parenthesis": {
        const parentNode = path.getParentNode();
        if (parentNode && parentNode.kind === "parenthesis") {
          return path.call(print, "inner");
        }
        const shouldPrintParenthesis =
          parentNode.kind !== "print" &&
          parentNode.kind !== "echo" &&
          parentNode.kind !== "include";
        const shouldBeInlined =
          node.inner.kind === "new" || node.inner.kind === "clone";
        // don't break if this is a property lookup - ie
        // ($someThing
        //    ? $someOtherThing
        //    : $someOtherOtherThing
        //  )
        //    ->hi()
        //    ->other();
        // however, make sure to break for bin, since its reliant on the parens indentation
        // (
        //    $someThing &&
        //    $someOtherThing
        //  )->map();
        const shouldAddBeginningBreak =
          !shouldBeInlined &&
          !(parentNode.kind === "propertylookup" && node.inner.kind !== "bin");
        const printedContents = path.call(print, "inner");
        const shouldAddEndBreak =
          !shouldBeInlined &&
          (shouldAddBeginningBreak || willBreak(printedContents));
        const dangling = comments.printDanglingComments(path, options, true);
        const printedInner = concat([
          shouldAddBeginningBreak && shouldPrintParenthesis ? softline : "",
          dangling ? concat([dangling, hardline]) : "",
          printedContents
        ]);
        return group(
          concat([
            shouldPrintParenthesis ? "(" : "",
            shouldAddBeginningBreak ? indent(printedInner) : printedInner,
            shouldPrintParenthesis
              ? concat([shouldAddEndBreak ? softline : "", ")"])
              : ""
          ])
        );
      }
      case "unary":
        return concat([node.type, path.call(print, "what")]);
      case "cast":
        return concat(["(", node.type, ") ", path.call(print, "what")]);
      default:
        return `Have not implemented operation kind ${node.kind} yet.`;
    }
  }
  if (operationKinds.includes(node.kind)) {
    return printOperation(node);
  }

  const literalKinds = [
    "boolean",
    "string",
    "number",
    "inline",
    "magic",
    "nowdoc",
    "encapsed"
  ];
  function printLiteral(node) {
    function getEncapsedQuotes(node, { opening = true } = {}) {
      if (node.type === "heredoc") {
        return opening ? `<<<${node.label}` : node.label;
      }
      const quotes = {
        string: '"',
        shell: "`"
      };
      if (quotes[node.type]) {
        return quotes[node.type];
      }
      return `Unimplemented encapsed type ${node.type}`;
    }

    switch (node.kind) {
      case "boolean":
        return node.value ? "true" : "false";
      case "string": {
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/101
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/123
        // @TODO: need resolve https://github.com/glayzzle/php-parser/issues/124
        // @TODO: for now just reusing double/single quote preference from doc. could eventually
        // use setting from options. need to figure out how this works w/ complex strings and interpolation
        // also need to figure out splitting long strings
        const quote = node.isDoubleQuote ? '"' : "'";
        let stringValue = node.raw;
        // we need to strip out the quotes from the raw value
        if (['"', "'"].includes(stringValue[0])) {
          stringValue = stringValue.substr(1);
        }
        if (['"', "'"].includes(stringValue[stringValue.length - 1])) {
          stringValue = stringValue.substr(0, stringValue.length - 1);
        }
        return makeString(stringValue, quote, false);
      }
      case "number":
        return printNumber(node.value);
      case "encapsed":
        if (node.type === "offset") {
          return group(concat(path.map(print, "value")));
        }
        return concat([
          node.type === "heredoc" ? breakParent : "",
          getEncapsedQuotes(node),
          // Respect `indent` for `heredoc` nodes
          node.type === "heredoc" ? literalline : "",
          concat(
            path.map(valuePath => {
              const node = valuePath.getValue();
              if (node.kind === "string") {
                return node.raw;
              } else if (node.kind === "variable") {
                if (typeof node.name === "object") {
                  return concat(["${", path.call(print, "name"), "}"]);
                } else if (node.curly) {
                  return `{$${node.name}}`;
                }
                return print(valuePath);
              }
              return concat(["{", print(valuePath), "}"]);
            }, "value")
          ),
          getEncapsedQuotes(node, { opening: false }),
          node.type === "heredoc" && docShouldHaveTrailingNewline(path)
            ? hardline
            : ""
        ]);
      case "inline":
        // @TODO: to get line breaks to fully work for mixed html/php
        // we would need to do this, but it adds an entire other layer of
        // complexity because of the removeNewlines() logic above
        // return join(hardline, node.raw.split("\n"));
        return node.raw;
      case "magic":
        // for magic constant we prefer upper case
        return node.value.toUpperCase();
      case "nowdoc":
        // Respect `indent` for `nowdoc` nodes
        return concat([
          breakParent,
          "<<<'",
          node.label,
          "'",
          literalline,
          node.value,
          literalline,
          node.label,
          docShouldHaveTrailingNewline(path) ? hardline : ""
        ]);
      default:
        return `Have not implemented literal kind ${node.kind} yet.`;
    }
  }
  if (literalKinds.includes(node.kind)) {
    return printLiteral(node);
  }

  switch (node.kind) {
    case "variable":
      return concat([
        node.byref ? "&" : "",
        "$",
        node.curly ? "{" : "",
        path.call(print, "name"),
        node.curly ? "}" : ""
      ]);
    case "constref":
      if (typeof node.name === "object") {
        return path.call(print, "name");
      }
      return node.name;
    case "array": {
      const open = node.shortForm ? "[" : "array(";
      const close = node.shortForm ? "]" : ")";
      if (node.items.length === 0) {
        if (!hasDanglingComments(node)) {
          return concat([open, close]);
        }
        return group(
          concat([
            open,
            comments.printDanglingComments(path, options),
            softline,
            close
          ])
        );
      }
      return group(
        concat([
          open,
          indent(
            concat([
              softline,
              join(concat([",", line]), path.map(print, "items"))
            ])
          ),
          ifBreak(shouldPrintComma(options) ? "," : ""),
          comments.printDanglingComments(path, options, true),
          softline,
          close
        ])
      );
    }
    case "yield":
      return concat([
        "yield ",
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value")
      ]);
    case "yieldfrom":
      return concat(["yield from ", path.call(print, "value")]);
    case "variadic":
      return concat(["...", path.call(print, "what")]);
    default:
      return `Have not implemented expression kind ${node.kind} yet.`;
  }
}

const statementKinds = [
  "eval",
  "exit",
  "halt",
  "clone",
  "declare",
  "global",
  "static",
  "include",
  "assign",
  "retif",
  "if",
  "do",
  "while",
  "for",
  "foreach",
  "switch",
  "goto",
  "silent",
  "try",
  "catch",
  "throw",
  "call",
  "closure",
  "new",
  "usegroup",
  "useitem",
  "block",
  "program",
  "namespace",
  "echo",
  "list",
  "print",
  "isset",
  "unset",
  "empty",
  "declaration",
  "class",
  "interface",
  "trait",
  "constant",
  "classconstant",
  "function",
  "method",
  "parameter",
  "property"
];
function printLines(path, options, print, childrenAttribute = "children") {
  return concat(
    path.map(childPath => {
      let canPrintBlankLine =
        !isLastStatement(childPath) &&
        childPath.getValue().kind !== "inline" &&
        // fully nested nodes handle their own linebreaks
        !isNodeFullyNestedInline(childPath);
      if (canPrintBlankLine && isNextNodeInline(childPath)) {
        // check if inline is on a new line, if no set to false
        const inlineNode = getNextNodeInParentListProperty(path);
        const tagCloseIndex = options.originalText.lastIndexOf(
          "?>",
          options.locStart(inlineNode)
        );
        const lastNewLine = options.originalText.lastIndexOf(
          "\n",
          tagCloseIndex
        );
        const inlineStartLineText = options.originalText.substring(
          lastNewLine + 1,
          tagCloseIndex
        );
        canPrintBlankLine = !inlineStartLineText.trim();
      }
      return concat([
        print(childPath),
        canPrintBlankLine ? hardline : "",
        canPrintBlankLine &&
        isNextLineEmpty(options.originalText, childPath.getValue(), options)
          ? hardline
          : ""
      ]);
    }, childrenAttribute)
  );
}
function printStatement(path, options, print) {
  const node = path.getValue();
  const blockKinds = ["block", "program", "namespace"];
  function printBlock(path, options, print) {
    switch (node.kind) {
      case "block":
        return concat([
          printLines(path, options, print),
          comments.printDanglingComments(path, options, true)
        ]);
      case "program": {
        return group(
          concat([
            printLines(path, options, print),
            comments.printDanglingComments(path, options, /* sameIndent */ true)
          ])
        );
      }
      case "namespace": {
        const printed = printLines(path, options, print);
        const hasName = node.name && typeof node.name === "string";
        return concat([
          "namespace ",
          hasName ? node.name : "",
          node.withBrackets ? concat([" ", "{"]) : ";",
          // don't know why we need 2 line breaks here, but 1 doesn't work
          node.children.length > 0 && !node.withBrackets
            ? concat([hardline, hardline])
            : "",
          node.withBrackets ? indent(concat([hardline, printed])) : printed,
          node.withBrackets ? concat([hardline, "}"]) : ""
        ]);
      }
      default:
        return `Have not implemented block kind ${node.kind} yet.`;
    }
  }
  if (blockKinds.includes(node.kind)) {
    return printBlock(path, options, print);
  }

  const sysKinds = ["echo", "list", "print", "isset", "unset", "empty"];
  function printSys(node) {
    switch (node.kind) {
      case "echo": {
        const printedArguments = path.map(argumentPath => {
          const node = argumentPath.getValue();
          return node.kind === "bin"
            ? print(argumentPath)
            : dedent(print(argumentPath));
        }, "arguments");
        return indent(
          group(
            concat([
              "echo ",
              group(join(concat([",", line]), printedArguments))
            ])
          )
        );
      }
      case "print": {
        const printedArguments = path.call(print, "arguments");
        return concat([
          "print ",
          node.arguments.kind === "bin"
            ? indent(printedArguments)
            : printedArguments
        ]);
      }
      case "list":
      case "isset":
      case "unset":
      case "empty":
        return group(
          concat([
            node.kind,
            "(",
            indent(
              concat([
                softline,
                join(concat([",", line]), path.map(print, "arguments"))
              ])
            ),
            softline,
            ")"
          ])
        );
      default:
        return `Have not implemented sys kind ${node.kind} yet.`;
    }
  }
  if (sysKinds.includes(node.kind)) {
    return printSys(node);
  }

  const declarationKinds = [
    "class",
    "interface",
    "trait",
    "constant",
    "classconstant",
    "function",
    "method",
    "parameter",
    "property"
  ];
  function printDeclaration(node) {
    function printDeclarationBlock({
      declaration,
      argumentsList = [],
      returnTypeContents = "",
      bodyContents = ""
    }) {
      const isClassLikeNode = ["class", "interface", "trait"].includes(
        node.kind
      );
      const printedDeclaration = group(declaration);
      const printedSignature = !isClassLikeNode
        ? group(
            concat([
              "(",
              argumentsList.length
                ? concat([
                    indent(
                      concat([
                        softline,
                        join(concat([",", line]), argumentsList)
                      ])
                    ),
                    softline
                  ])
                : "",
              ")",
              returnTypeContents ? concat([": ", returnTypeContents]) : ""
            ])
          )
        : "";
      const printedBody = bodyContents
        ? concat([
            "{",
            indent(concat([hardline, bodyContents])),
            comments.printDanglingComments(path, options, true),
            hardline,
            "}"
          ])
        : "";
      return concat([
        group(
          concat([
            printedDeclaration,
            printedSignature,
            // see https://github.com/prettier/plugin-php/issues/107
            // options.openingBraceNewLine ? hardline : " ",
            // Hack, we need `invertLine` command here, as `line`, but have versa vice logic
            bodyContents
              ? node.kind === "function" || node.kind === "method"
                ? ifBreak(" ", concat([lineSuffix(""), lineSuffixBoundary]))
                : hardline
              : ""
          ])
        ),
        printedBody
      ]);
    }

    switch (node.kind) {
      case "class": {
        const classPrefixes = [
          ...(node.isFinal ? ["final"] : []),
          ...(node.isAbstract ? ["abstract"] : [])
        ];
        const parentNode = path.getParentNode();
        // if this is an anonymous class, we need to check if the parent was a
        // "new" node. if it was, we need to get the arguments from that node
        // ex: $test = new class($arg1, $arg2) extends TestClass {};
        const anonymousArguments =
          node.isAnonymous &&
          parentNode.kind === "new" &&
          parentNode.arguments.length > 0
            ? anonymousClassesNewArguments
            : "";
        return printDeclarationBlock({
          declaration: concat([
            classPrefixes.join(" "),
            classPrefixes.length > 0 ? " " : "",
            concat([
              "class",
              anonymousArguments,
              node.name ? concat([" ", node.name]) : ""
            ]),
            group(
              indent(
                concat([
                  node.extends
                    ? group(
                        concat([line, "extends ", path.call(print, "extends")])
                      )
                    : "",
                  node.implements
                    ? concat([
                        line,
                        "implements",
                        group(
                          indent(
                            concat([
                              line,
                              join(
                                concat([",", line]),
                                path.map(print, "implements")
                              )
                            ])
                          )
                        )
                      ])
                    : ""
                ])
              )
            )
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      }
      case "function":
        return printDeclarationBlock({
          declaration: concat(["function ", node.byref ? "&" : "", node.name]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([
                hasDanglingComments(node.type)
                  ? concat([
                      path.call(
                        typePath =>
                          comments.printDanglingComments(
                            typePath,
                            options,
                            true
                          ),
                        "type"
                      ),
                      " "
                    ])
                  : "",
                node.nullable ? "?" : "",
                path.call(print, "type")
              ])
            : "",
          bodyContents: node.body ? path.call(print, "body") : ""
        });
      case "method": {
        const methodPrefixes = [
          ...(node.isFinal ? ["final"] : []),
          ...(node.isAbstract ? ["abstract"] : []),
          ...(node.visibility ? [node.visibility] : []),
          ...(node.isStatic ? ["static"] : [])
        ];
        return printDeclarationBlock({
          declaration: concat([
            methodPrefixes.join(" "),
            methodPrefixes.length > 0 ? " " : "",
            "function ",
            node.byref ? "&" : "",
            node.name
          ]),
          argumentsList: path.map(print, "arguments"),
          returnTypeContents: node.type
            ? concat([
                hasDanglingComments(node.type)
                  ? concat([
                      path.call(
                        typePath =>
                          comments.printDanglingComments(
                            typePath,
                            options,
                            true
                          ),
                        "type"
                      ),
                      " "
                    ])
                  : "",
                node.nullable ? "?" : "",
                path.call(print, "type")
              ])
            : "",
          bodyContents: node.body ? concat([path.call(print, "body")]) : ""
        });
      }
      case "parameter": {
        const name = concat([
          node.nullable ? "?" : "",
          node.type ? concat([path.call(print, "type"), " "]) : "",
          node.variadic ? "..." : "",
          node.byref ? "&" : "",
          "$",
          node.name
        ]);
        if (node.value) {
          return group(
            concat([
              name,
              // see handleFunctionParameter() in ./comments.js - since there's
              // no node to attach comments that fall in between the parameter name
              // and value, we store them as dangling comments
              hasDanglingComments(node) ? " " : "",
              comments.printDanglingComments(path, options, true),
              indent(concat([line, "= ", path.call(print, "value")]))
            ])
          );
        }
        return name;
      }
      case "property":
        return group(
          concat([
            node.visibility ? concat([node.visibility, " "]) : "",
            node.isStatic ? "static " : "",
            "$",
            node.name,
            node.value ? concat([" = ", path.call(print, "value")]) : ""
          ])
        );
      case "interface":
        return printDeclarationBlock({
          declaration: concat([
            concat(["interface ", node.name]),
            node.extends
              ? indent(
                  concat([
                    line,
                    "extends ",
                    join(", ", path.map(print, "extends"))
                  ])
                )
              : ""
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      case "trait":
        return printDeclarationBlock({
          declaration: concat([
            concat(["trait ", node.name]),
            node.extends
              ? indent(concat([line, "extends ", path.call(print, "extends")]))
              : "",
            node.implements
              ? indent(
                  concat([
                    line,
                    "implements ",
                    join(", ", path.map(print, "implements"))
                  ])
                )
              : ""
          ]),
          bodyContents: printLines(path, options, print, "body")
        });
      case "constant":
      case "classconstant":
        return concat([
          node.visibility ? concat([node.visibility, " "]) : "",
          "const ",
          node.name,
          " = ",
          path.call(print, "value")
        ]);
      default:
        return `Have not implmented declaration kind ${node.kind} yet.`;
    }
  }
  if (declarationKinds.includes(node.kind)) {
    return printDeclaration(node);
  }

  function printBodyControlStructure(path, bodyProperty = "body") {
    const node = path.getValue();
    if (!node[bodyProperty]) {
      return ";";
    }
    const printedBody = path.call(print, bodyProperty);
    return concat([
      node.shortForm ? ":" : " {",
      indent(
        concat([
          comments.printDanglingComments(path, options, true),
          node[bodyProperty].kind !== "block" ||
          (node[bodyProperty].children &&
            node[bodyProperty].children.length > 0) ||
          (node[bodyProperty].comments &&
            node[bodyProperty].comments.length > 0)
            ? concat([hardline, printedBody])
            : ""
        ])
      ),
      node.kind === "if" && bodyProperty === "body"
        ? ""
        : concat([
            hardline,
            node.shortForm ? concat(["end", node.kind, ";"]) : "}"
          ])
    ]);
  }

  switch (node.kind) {
    case "assign": {
      const canBreak =
        ["bin", "number", "string"].includes(node.right.kind) ||
        // for retif's that have complex test cases, we allow a break. ie
        // $test =
        //   $someReallyLongCondition ||
        //   $someOtherLongCondition
        //     ? true
        //     : false;
        (node.right.kind === "retif" && node.right.test.kind === "bin") ||
        isPropertyLookupChain(node.right);
      return group(
        concat([
          path.call(print, "left"),
          " ",
          node.operator,
          canBreak
            ? indent(concat([line, path.call(print, "right")]))
            : concat([" ", path.call(print, "right")])
        ])
      );
    }
    case "if": {
      const handleIfAlternate = alternate => {
        if (!alternate) {
          return node.shortForm ? "endif;" : "}";
        }
        if (alternate.kind === "if") {
          return concat([
            node.shortForm ? "" : "} ",
            "else",
            path.call(print, "alternate")
          ]);
        }
        return concat([
          node.shortForm ? "" : "} ",
          "else",
          printBodyControlStructure(path, "alternate")
        ]);
      };
      return concat([
        group(
          concat([
            "if (",
            group(
              concat([
                indent(concat([softline, path.call(print, "test")])),
                softline
              ])
            ),
            ")",
            printBodyControlStructure(path)
          ])
        ),
        hardline,
        handleIfAlternate(node.alternate)
      ]);
    }
    case "do":
      return concat([
        "do",
        printBodyControlStructure(path),
        " while (",
        group(
          concat([
            indent(concat([softline, path.call(print, "test")])),
            softline
          ])
        ),
        ");"
      ]);
    case "while":
      return group(
        concat([
          "while (",
          group(
            concat([
              indent(concat([softline, path.call(print, "test")])),
              softline
            ])
          ),
          ")",
          printBodyControlStructure(path)
        ])
      );
    case "for": {
      const body = printBodyControlStructure(path);
      if (!node.init.length && !node.test.length && !node.increment.length) {
        return concat([group(concat(["for (;;)", body]))]);
      }

      return concat([
        "for (",
        group(
          concat([
            indent(
              concat([
                softline,
                group(
                  concat([join(concat([",", line]), path.map(print, "init"))])
                ),
                ";",
                line,
                group(
                  concat([join(concat([",", line]), path.map(print, "test"))])
                ),
                ";",
                line,
                group(join(concat([",", line]), path.map(print, "increment")))
              ])
            ),
            softline
          ])
        ),
        ")",
        body
      ]);
    }
    case "foreach":
      return concat([
        "foreach (",
        group(
          concat([
            indent(
              concat([
                softline,
                path.call(print, "source"),
                line,
                "as ",
                node.key
                  ? indent(
                      join(concat([" =>", line]), [
                        path.call(print, "key"),
                        path.call(print, "value")
                      ])
                    )
                  : path.call(print, "value")
              ])
            ),
            softline
          ])
        ),
        ")",
        printBodyControlStructure(path)
      ]);
    case "switch":
      return concat([
        group(
          concat([
            "switch (",
            indent(concat([softline, path.call(print, "test")])),
            softline,
            ")"
          ])
        ),
        printBodyControlStructure(path)
      ]);
    case "call": {
      // chain: Call (PropertyLookup (Call (PropertyLookup (...))))
      if (node.what.kind === "propertylookup") {
        return printMemberChain(path, options, print);
      }
      return concat([
        path.call(print, "what"),
        printArgumentsList(path, options, print)
      ]);
    }
    case "usegroup":
      return group(
        concat([
          "use ",
          node.type ? concat([node.type, " "]) : "",
          indent(
            concat([
              node.name
                ? concat([
                    maybeStripLeadingSlashFromUse(node.name),
                    "\\{",
                    softline
                  ])
                : "",
              join(
                concat([",", line]),
                path.map(item => concat([print(item)]), "items")
              )
            ])
          ),
          node.name ? concat([softline, "}"]) : ""
        ])
      );
    case "useitem":
      return concat([
        node.type ? concat([node.type, " "]) : "",
        maybeStripLeadingSlashFromUse(node.name),
        hasDanglingComments(node)
          ? concat([" ", comments.printDanglingComments(path, options, true)])
          : "",
        node.alias ? concat([" as ", node.alias]) : ""
      ]);
    case "closure":
      return concat([
        "function ",
        printArgumentsList(path, options, print),
        node.uses && node.uses.length > 0
          ? group(
              concat([
                " use ",
                printArgumentsList(path, options, print, "uses")
              ])
            )
          : "",
        " {",
        indent(concat([hardline, path.call(print, "body")])),
        concat([hardline, "}"])
      ]);
    case "retif": {
      const printedExpr = concat([
        line,
        "?",
        node.trueExpr ? concat([" ", path.call(print, "trueExpr"), line]) : "",
        ": ",
        path.call(print, "falseExpr")
      ]);
      return group(concat([path.call(print, "test"), indent(printedExpr)]));
    }
    case "exit":
      return group(
        concat([
          node.useDie ? "die" : "exit",
          "(",
          node.status
            ? concat([
                indent(concat([softline, path.call(print, "status")])),
                softline
              ])
            : comments.printDanglingComments(path, options),
          ")"
        ])
      );
    case "clone":
      return concat(["clone ", path.call(print, "what")]);
    case "declare": {
      const printDeclareArguments = path => {
        const [directive] = Object.keys(path.getValue().what);
        return concat([directive, "=", path.call(print, "what", directive)]);
      };
      if (node.mode === "short") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          "):",
          hardline,
          concat(path.map(print, "children")),
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ") {",
          indent(concat([hardline, concat(path.map(print, "children"))])),
          hardline,
          "}"
        ]);
      }
      return concat(["declare(", printDeclareArguments(path), ");"]);
    }
    case "global":
      return group(
        concat([
          "global",
          indent(
            concat([" ", join(concat([",", line]), path.map(print, "items"))])
          )
        ])
      );
    case "static":
      return group(
        concat([
          "static",
          indent(
            concat([
              " ",
              join(
                concat([",", line]),
                path.map(item => {
                  // @TODO: hacking this for now. assignments nested inside a static
                  // declaration doesn't have the operator set, so printing manually
                  if (item.getValue().kind === "assign") {
                    return concat([
                      item.call(print, "left"),
                      " = ",
                      item.call(print, "right")
                    ]);
                  }
                  return item.call(print);
                }, "items")
              )
            ])
          )
        ])
      );
    case "include":
      return concat([
        node.require ? "require" : "include",
        node.once ? "_once" : "",
        " ",
        path.call(print, "target")
      ]);
    case "goto":
      return concat(["goto ", node.label]);
    case "new": {
      // if the child node is an anonymous class, we need to store the arguments
      // so the child class node can access them later
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;
      if (isAnonymousClassNode && node.arguments.length > 0) {
        anonymousClassesNewArguments = printArgumentsList(path, options, print);
      }
      return group(
        concat([
          "new ",
          path.call(print, "what"),
          isAnonymousClassNode ? "" : printArgumentsList(path, options, print)
        ])
      );
    }
    case "try":
      return concat([
        "try {",
        indent(
          concat([
            hardline,
            path.call(print, "body"),
            comments.printDanglingComments(path, options, true)
          ])
        ),
        hardline,
        "}",
        node.catches ? concat(path.map(print, "catches")) : "",
        node.always
          ? concat([
              " finally {",
              indent(concat([hardline, path.call(print, "always")])),
              hardline,
              "}"
            ])
          : ""
      ]);
    case "catch":
      return concat([
        " catch",
        node.what
          ? concat([
              " (",
              join(" | ", path.map(print, "what")),
              " ",
              path.call(print, "variable"),
              ")"
            ])
          : "",
        " {",
        indent(
          concat([
            hardline,
            path.call(print, "body"),
            comments.printDanglingComments(path, options, true)
          ])
        ),
        hardline,
        "}"
      ]);
    case "throw":
      return concat(["throw ", path.call(print, "what")]);
    case "silent":
      return concat(["@", path.call(print, "expr")]);
    case "halt":
      return concat(["__halt_compiler();", node.after.replace(/\n$/, "")]);
    case "eval":
      return group(
        concat([
          "eval(",
          indent(concat([softline, path.call(print, "source")])),
          softline,
          ")"
        ])
      );
    default:
      return `Have not implemented statement kind ${node.kind} yet.`;
  }
}

function printNode(path, options, print) {
  const node = path.getValue();
  if (expressionKinds.includes(node.kind)) {
    return printExpression(path, options, print);
  }
  if (statementKinds.includes(node.kind)) {
    return printStatement(path, options, print);
  }
  switch (node.kind) {
    case "identifier": {
      // this is a hack until https://github.com/glayzzle/php-parser/issues/113 is resolved
      // for reserved words we prefer lowercase case
      if (node.name === "\\array") {
        return "array";
      } else if (node.name === "\\callable") {
        return "callable";
      }

      const lowerCasedName = node.name.toLowerCase();
      const isLowerCase =
        [
          "int",
          "float",
          "bool",
          "string",
          "null",
          "void",
          "iterable",
          "object",
          "self"
        ].indexOf(lowerCasedName) !== -1;

      return isLowerCase ? lowerCasedName : node.name;
    }
    case "case":
      return concat([
        node.test
          ? concat(["case ", path.call(print, "test"), ":"])
          : "default:",
        node.body
          ? node.body.children && node.body.children.length
            ? indent(concat([hardline, path.call(print, "body")]))
            : ";"
          : ""
      ]);
    case "break":
      if (node.level) {
        while (node.level.kind == "parenthesis") {
          node.level = node.level.inner;
        }
        if (node.level.kind == "number" && node.level.value != 1) {
          return concat(["break ", path.call(print, "level")]);
        }
        return "break";
      }
      return "break";
    case "continue":
      if (node.level) {
        while (node.level.kind == "parenthesis") {
          node.level = node.level.inner;
        }
        if (node.level.kind == "number" && node.level.value != 1) {
          return concat(["continue ", path.call(print, "level")]);
        }
        return "continue";
      }
      return "continue";
    case "return": {
      const parts = [];
      parts.push("return");
      if (node.expr) {
        const printedExpr = path.call(print, "expr");
        if (node.expr.kind === "bin") {
          parts.push(
            group(
              concat([
                ifBreak(" (", " "),
                indent(concat([softline, printedExpr])),
                softline,
                ifBreak(")")
              ])
            )
          );
        } else {
          parts.push(" ", printedExpr);
        }
      }
      return concat(parts);
    }
    case "entry": {
      const dangling = comments.printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? concat([hardline, dangling]) : "";
      const printed = concat([path.call(print, "value"), printedComments]);

      if (node.key) {
        return group(
          concat([
            path.call(print, "key"),
            " =>",
            node.value.kind === "array"
              ? concat([" ", printed])
              : indent(concat([line, printed]))
          ])
        );
      }
      return printed;
    }
    case "traituse":
      return group(
        concat([
          "use ",
          join(", ", path.map(print, "traits")),
          node.adaptations
            ? concat([
                " {",
                indent(
                  concat([
                    line,
                    printLines(path, options, print, "adaptations")
                  ])
                ),
                line,
                "}"
              ])
            : ""
        ])
      );
    case "traitprecedence":
      return concat([
        path.call(print, "trait"),
        "::",
        node.method,
        " insteadof ",
        join(", ", path.map(print, "instead"))
      ]);
    case "traitalias":
      return concat([
        path.call(print, "trait"),
        node.trait ? "::" : "",
        node.method || "",
        " as ",
        join(" ", [
          ...(node.visibility ? [node.visibility] : []),
          ...(node.as ? [node.as] : [])
        ])
      ]);
    case "label":
      return concat([node.name, ":"]);
    case "error":
    default:
      return `Have not implemented kind ${node.kind} yet.`;
  }
}

module.exports = genericPrint;
