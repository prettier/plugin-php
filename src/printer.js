"use strict";

const {
  breakParent,
  concat,
  join,
  line,
  lineSuffix,
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
  isNextLineEmpty,
  isNextLineEmptyAfterIndex,
  getNextNonSpaceNonCommentCharacterIndex
} = require("prettier").util;
const comments = require("./comments");
const pathNeedsParens = require("./needs-parens");

const {
  getLast,
  getPenultimate,
  isLastStatement,
  lineShouldEndWithSemicolon,
  printNumber,
  shouldFlatten,
  maybeStripLeadingSlashFromUse,
  fileShouldEndWithHardline,
  hasDanglingComments,
  hasLeadingComment,
  hasTrailingComment,
  docShouldHaveTrailingNewline,
  isLookupNode,
  isFirstChildrenInlineNode,
  shouldPrintHardLineBeforeEndInControlStructure,
  getAlignment,
  getFirstNestedChildNode,
  getLastNestedChildNode,
  isProgramLikeNode,
  getNodeKindIncludingLogical
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

  const printedWithoutParens = printNode(path, options, print);

  if (
    node.kind === "program" &&
    node.children.length === 0 &&
    node.comments === 0
  ) {
    return concat(["<?php", hardline]);
  }

  if (node.kind === "inline") {
    return printedWithoutParens;
  }

  const parts = [];
  const needsParens = pathNeedsParens(path, options);

  if (needsParens) {
    parts.unshift("(");
  }

  parts.push(printedWithoutParens);

  if (needsParens) {
    parts.push(")");
  }

  if (lineShouldEndWithSemicolon(path)) {
    parts.push(";");
  }

  if (fileShouldEndWithHardline(path)) {
    parts.push(hardline);
  }

  return concat(parts);
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
  //   call (isLookupNode d (
  //     call (isLookupNode c (
  //       isLookupNode b (
  //         call (variable a)
  //       )
  //     ))
  //   ))
  // and we transform it into (notice the reversed order)
  //   [identifier a, call, isLookupNode b, isLookupNode c, call,
  //    isLookupNode d, call]
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
      (isLookupNode(node.what) || node.what.kind === "call")
    ) {
      printedNodes.unshift({
        node,
        printed: concat([
          printArgumentsList(path, options, print),
          shouldInsertEmptyLineAfter(node) ? hardline : ""
        ])
      });
      path.call(what => traverse(what), "what");
    } else if (isLookupNode(node)) {
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
        needsParens: pathNeedsParens(path, options),
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
  //   [identifier a, call, isLookupNode b, isLookupNode c, call,
  //    isLookupNode d, call]
  // will be grouped as
  //   [
  //     [identifier a, Call],
  //     [isLookupNode b, isLookupNode c, call],
  //     [isLookupNode d, call]
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
      (isLookupNode(printedNodes[i].node) &&
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
        isLookupNode(printedNodes[i].node) &&
        isLookupNode(printedNodes[i + 1].node)
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
    if (hasSeenCallExpression && isLookupNode(printedNodes[i].node)) {
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

  function shouldNotWrap(groups) {
    if (groups[0].length === 1) {
      const firstNode = groups[0][0].node;

      return (
        (firstNode.kind === "variable" && firstNode.name === "this") ||
        firstNode.kind === "identifier"
      );
    }

    const lastNode = getLast(groups[0]).node;

    return (
      isLookupNode(lastNode) &&
      (lastNode.offset.kind === "constref" ||
        lastNode.offset.kind === "variable")
    );
  }

  const shouldMerge =
    groups.length >= 2 && !groups[1][0].node.comments && shouldNotWrap(groups);

  function printGroup(printedGroup) {
    const result = [];

    for (let i = 0; i < printedGroup.length; i++) {
      // Checks if the next node (i.e. the parent node) needs parens
      // and print accordingl y
      if (printedGroup[i + 1] && printedGroup[i + 1].needsParens) {
        result.push(
          "(",
          printedGroup[i].printed,
          printedGroup[i + 1].printed,
          ")"
        );
        i++;
      } else {
        result.push(printedGroup[i].printed);
      }
    }

    return concat(result);
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
  let addCurly = true;

  if (node.offset.kind === "variable") {
    addCurly = false;
  } else if (
    node.offset.kind === "constref" &&
    typeof node.offset.name === "string"
  ) {
    addCurly = false;
  }

  return addCurly ? concat(["{", doc, "}"]) : doc;
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
      getNodeKindIncludingLogical(parent) !==
        getNodeKindIncludingLogical(node) &&
      getNodeKindIncludingLogical(node.left) !==
        getNodeKindIncludingLogical(node) &&
      getNodeKindIncludingLogical(node.right) !==
        getNodeKindIncludingLogical(node);

    parts.push(" ", shouldGroup ? group(right) : right);
  } else {
    // Our stopping case. Simply print the node normally.
    parts.push(path.call(print));
  }

  return parts;
}

function printLookupNodes(path, options, print) {
  const node = path.getValue();

  switch (node.kind) {
    case "propertylookup":
      return printPropertyLookup(path, options, print);
    case "staticlookup":
      return printStaticLookup(path, options, print);
    case "offsetlookup":
      return printOffsetLookup(path, options, print);
    default:
      return `Have not implemented lookup kind ${node.kind} yet.`;
  }
}

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

function printArrayItems(path, options, printPath, print) {
  const printedElements = [];
  let separatorParts = [];

  path.each(childPath => {
    printedElements.push(concat(separatorParts));
    printedElements.push(group(print(childPath)));

    separatorParts = [",", line];

    if (
      childPath.getValue() &&
      isNextLineEmpty(options.originalText, childPath.getValue(), options)
    ) {
      separatorParts.push(softline);
    }
  }, printPath);

  return concat(printedElements);
}

// Wrap parts into groups by indexes.
// It is require to have same indent on lines for all parts into group.
// The value of `alignment` option indicates how many spaces must be before each part.
//
// Example:
// <div>
//     <?php
//     echo '1';
//     echo '2';
//     echo '3';
//     ?>
// </div>
function wrapPartsIntoGroups(parts, indexes) {
  if (indexes.length === 0) {
    return parts;
  }

  let lastEnd = 0;

  return indexes.reduce((accumulator, index) => {
    const { start, end, alignment, before, after } = index;
    const printedPartsForGrouping = concat([
      before || "",
      concat(parts.slice(start, end)),
      after || ""
    ]);
    const newArray = accumulator.concat(
      parts.slice(lastEnd, start),
      alignment
        ? dedentToRoot(
            group(
              concat([
                align(new Array(alignment).join(" "), printedPartsForGrouping)
              ])
            )
          )
        : group(printedPartsForGrouping),
      end === parts.length - 1 ? parts.slice(end) : ""
    );

    lastEnd = end;

    return newArray;
  }, []);
}

function printLines(path, options, print, childrenAttribute = "children") {
  const node = path.getValue();
  const parentNode = path.getParentNode();

  let lastInlineIndex = -1;

  const parts = [];
  const groupIndexes = [];

  path.map((childPath, index) => {
    const childNode = childPath.getValue();
    const isInlineNode = childNode.kind === "inline";
    const printedPath = print(childPath);
    const children = node[childrenAttribute];
    const nextNode = children[index + 1];
    const canPrintBlankLine =
      !isLastStatement(childPath) &&
      !isInlineNode &&
      (nextNode && nextNode.kind === "case"
        ? !isFirstChildrenInlineNode(path)
        : nextNode && nextNode.kind !== "inline");

    let printed = concat([
      printedPath,
      canPrintBlankLine ? hardline : "",
      canPrintBlankLine &&
      isNextLineEmpty(options.originalText, childNode, options)
        ? hardline
        : ""
    ]);

    const isFirstNode = index === 0;
    const isLastNode = children.length - 1 === index;
    const isBlockNestedNode =
      node.kind === "block" &&
      parentNode &&
      ["function", "closure", "method", "try", "catch"].includes(
        parentNode.kind
      );

    let beforeCloseTagInlineNode = isBlockNestedNode && isFirstNode ? "" : " ";

    if (isInlineNode || (!isInlineNode && isLastNode && lastInlineIndex >= 0)) {
      const prevLastInlineIndex = lastInlineIndex;

      if (isInlineNode) {
        lastInlineIndex = index;
      }

      const shouldCreateGroup =
        (isInlineNode && !isFirstNode) || (!isInlineNode && isLastNode);

      if (shouldCreateGroup) {
        const start =
          (isInlineNode ? prevLastInlineIndex : lastInlineIndex) + 1;
        const end = isLastNode && !isInlineNode ? index + 1 : index;
        const prevInlineNode =
          children[isInlineNode ? prevLastInlineIndex : lastInlineIndex];
        const alignment = prevInlineNode
          ? getAlignment(prevInlineNode.raw)
          : "";
        const shouldBreak = end - start > 1;
        const before = shouldBreak
          ? isBlockNestedNode && !prevInlineNode
            ? ""
            : hardline
          : "";
        const after =
          shouldBreak && childNode.kind !== "halt"
            ? isBlockNestedNode && isLastNode
              ? ""
              : hardline
            : "";

        if (shouldBreak) {
          beforeCloseTagInlineNode = "";
        }

        groupIndexes.push({ start, end, alignment, before, after });
      }
    }

    if (isInlineNode) {
      const openTag =
        nextNode && nextNode.kind === "echo" && nextNode.shortForm
          ? "<?="
          : "<?php";
      const beforeInline =
        childNode.leadingComments && childNode.leadingComments.length
          ? concat([
              isFirstNode ? openTag : "",
              hardline,
              comments.printComments(childNode.leadingComments, options),
              "?>"
            ])
          : isProgramLikeNode(node) && isFirstNode
            ? ""
            : concat([beforeCloseTagInlineNode, "?>"]);
      const afterInline =
        childNode.comments && childNode.comments.length
          ? concat([
              openTag,
              hardline,
              comments.printComments(childNode.comments, options),
              "?>"
            ])
          : isProgramLikeNode(node) && isLastNode
            ? ""
            : concat([openTag, " "]);

      printed = concat([beforeInline, printed, afterInline]);
    }

    parts.push(printed);
  }, childrenAttribute);

  const wrappedParts = wrapPartsIntoGroups(parts, groupIndexes);

  if (node.kind === "program" && !node.extra.parseAsEval) {
    if (!wrappedParts.length && node.comments) {
      wrappedParts.push(
        hardline,
        comments.printComments(node.comments, options)
      );
    }

    const originalText = node.loc.source;
    const firstNestedChildNode = getFirstNestedChildNode(node);
    const lastNestedChildNode = getLastNestedChildNode(node);
    const hasStartTag =
      firstNestedChildNode && firstNestedChildNode.kind !== "inline";
    const hasEndTag =
      lastNestedChildNode &&
      lastNestedChildNode.kind !== "inline" &&
      originalText.trim().endsWith("?>");

    let afterOpenTag = " ";
    let beforeCloseTag = " ";

    if (hasStartTag) {
      const between = originalText.trim().match(/^<\?(php|=)(\s+)?\S/);

      if (between && between[2]) {
        afterOpenTag =
          between[2].includes("\n") && wrappedParts.length > 0
            ? concat([
                hardline,
                between[2].split("\n").length > 2 ? hardline : ""
              ])
            : " ";
      }
    }

    if (hasEndTag) {
      const between = originalText.trim().match(/\S(\s*)?\?>$/);

      beforeCloseTag =
        between && between[1] && between[1].includes("\n")
          ? hardline
          : wrappedParts.length > 0
            ? " "
            : "";
    }

    return concat([
      hasStartTag ? concat(["<?php", afterOpenTag]) : "",
      concat(wrappedParts),
      hasEndTag ? lineSuffix(concat([beforeCloseTag, "?>"])) : ""
    ]);
  }

  return concat(wrappedParts);
}

function printDeclarationBlock({
  declaration,
  argumentsList = [],
  returnTypeContents = "",
  bodyContents = "",
  node,
  path,
  options
}) {
  const isClassLikeNode = ["class", "interface", "trait"].includes(node.kind);
  const printedDeclaration = group(declaration);
  const printedSignature = !isClassLikeNode
    ? group(
        concat([
          "(",
          argumentsList.length
            ? concat([
                indent(
                  concat([softline, join(concat([",", line]), argumentsList)])
                ),
                softline
              ])
            : "",
          ")",
          returnTypeContents ? concat([": ", returnTypeContents]) : ""
        ])
      )
    : "";

  const hasEmptyBody =
    ((node.kind === "function" || node.kind === "method") &&
      node.body &&
      node.body.children &&
      node.body.children.length === 0 &&
      !node.body.comments) ||
    (isClassLikeNode && node.body && node.body.length === 0 && !node.comments);

  const printedBody = bodyContents
    ? concat([
        "{",
        indent(concat([hasEmptyBody ? "" : hardline, bodyContents])),
        comments.printDanglingComments(path, options, true),
        node.kind === "class" && node.isAnonymous && hasEmptyBody
          ? ""
          : hardline,
        "}"
      ])
    : "";

  if (isClassLikeNode) {
    return concat([
      group(
        concat([
          printedDeclaration,
          printedSignature,
          bodyContents && node.kind === "class" && node.isAnonymous
            ? line
            : hardline
        ])
      ),
      printedBody
    ]);
  }

  return conditionalGroup([
    concat([
      printedDeclaration,
      printedSignature,
      bodyContents ? hardline : "",
      printedBody
    ]),
    concat([
      printedDeclaration,
      printedSignature,
      bodyContents ? (argumentsList.length === 0 ? hardline : " ") : "",
      printedBody
    ])
  ]);
}

function printBodyControlStructure(
  path,
  print,
  bodyProperty = "body",
  options = {}
) {
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
        (node[bodyProperty].comments && node[bodyProperty].comments.length > 0)
          ? concat([
              isFirstChildrenInlineNode(path)
                ? node.kind === "switch"
                  ? " "
                  : ""
                : hardline,
              printedBody
            ])
          : ""
      ])
    ),
    node.kind === "if" && bodyProperty === "body"
      ? ""
      : concat([
          shouldPrintHardLineBeforeEndInControlStructure(path) ? hardline : "",
          node.shortForm ? concat(["end", node.kind, ";"]) : "}"
        ])
  ]);
}

function printAssignment(
  leftNode,
  printedLeft,
  operator,
  rightNode,
  printedRight,
  options
) {
  if (!rightNode) {
    return printedLeft;
  }

  const printed = printAssignmentRight(
    leftNode,
    rightNode,
    printedRight,
    options
  );

  return group(concat([printedLeft, operator, printed]));
}

function isLookupNodeChain(node) {
  if (!isLookupNode(node)) {
    return false;
  }

  if (node.what.kind === "variable") {
    return true;
  }

  return isLookupNodeChain(node.what);
}

function printAssignmentRight(leftNode, rightNode, printedRight, options) {
  if (
    comments.hasLeadingOwnLineComment(options.originalText, rightNode, options)
  ) {
    return indent(concat([hardline, printedRight]));
  }

  const canBreak =
    (rightNode.kind === "bin" && !shouldInlineLogicalExpression(rightNode)) ||
    (rightNode.kind === "retif" &&
      rightNode.test.kind === "bin" &&
      !shouldInlineLogicalExpression(rightNode.test)) ||
    ((leftNode.kind === "variable" ||
      leftNode.kind === "string" ||
      isLookupNode(leftNode)) &&
      ((rightNode.kind === "string" && !rightNode.raw.includes("\n")) ||
        isLookupNodeChain(rightNode)));

  if (canBreak) {
    return group(indent(concat([line, printedRight])));
  }

  return concat([" ", printedRight]);
}

function needsHardlineAfterDanglingComment(node) {
  if (!node.comments) {
    return false;
  }

  const lastDanglingComment = getLast(
    node.comments.filter(comment => !comment.leading && !comment.trailing)
  );

  return lastDanglingComment && !comments.isBlockComment(lastDanglingComment);
}

function printNode(path, options, print) {
  const node = path.getValue();

  switch (node.kind) {
    case "program": {
      return group(
        concat([
          printLines(path, options, print),
          comments.printDanglingComments(
            path,
            options,
            /* sameIndent */ true,
            c => !c.printed
          )
        ])
      );
    }
    case "block":
      return concat([
        printLines(path, options, print),
        comments.printDanglingComments(path, options, true)
      ]);
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
          node.children.length > 0
            ? concat([hardline, concat(path.map(print, "children"))])
            : "",
          hardline,
          "enddeclare;"
        ]);
      } else if (node.mode === "block") {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ") {",
          node.children.length > 0
            ? indent(concat([hardline, concat(path.map(print, "children"))]))
            : "",
          hardline,
          "}"
        ]);
      }

      return concat(["declare(", printDeclareArguments(path), ");"]);
    }
    case "namespace": {
      const printed = printLines(path, options, print);
      const hasName = node.name && typeof node.name === "string";

      return concat([
        "namespace ",
        hasName ? node.name : "",
        node.withBrackets
          ? concat([hasName ? " " : "", "{"])
          : concat([
              ";",
              // Second hardline for newline between `namespace` and first child node
              node.children.length > 0 ? concat([hardline, hardline]) : ""
            ]),
        node.children.length > 0
          ? node.withBrackets
            ? indent(concat([hardline, printed]))
            : printed
          : "",
        node.withBrackets ? concat([hardline, "}"]) : ""
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
          node.name
            ? concat([
                ifBreak(shouldPrintComma(options) ? "," : ""),
                softline,
                "}"
              ])
            : ""
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
          ? printArgumentsList(path, options, print)
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
                      concat([
                        // check if the extends node has a comment
                        hasDanglingComments(node.extends)
                          ? concat([
                              hardline,
                              path.call(
                                extendsPath =>
                                  comments.printDanglingComments(
                                    extendsPath,
                                    options,
                                    true
                                  ),
                                "extends"
                              ),
                              hardline
                            ])
                          : line,
                        "extends ",
                        path.call(print, "extends")
                      ])
                    )
                  : "",
                node.implements
                  ? concat([
                      line,
                      "implements",
                      group(
                        indent(
                          concat([
                            join(
                              ",",
                              path.map(implementsPath => {
                                // check if any of the implements nodes have comments
                                return hasDanglingComments(
                                  implementsPath.getValue()
                                )
                                  ? concat([
                                      hardline,
                                      comments.printDanglingComments(
                                        implementsPath,
                                        options,
                                        true
                                      ),
                                      hardline,
                                      print(implementsPath)
                                    ])
                                  : concat([line, print(implementsPath)]);
                              }, "implements")
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
        bodyContents: printLines(path, options, print, "body"),
        node,
        path,
        options
      });
    }
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
        bodyContents: printLines(path, options, print, "body"),
        node,
        path,
        options
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
        bodyContents: printLines(path, options, print, "body"),
        node,
        path,
        options
      });
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
    case "traituse":
      return group(
        concat([
          "use ",
          indent(group(join(concat([",", line]), path.map(print, "traits")))),
          node.adaptations
            ? concat([
                " {",
                indent(
                  concat([
                    hardline,
                    printLines(path, options, print, "adaptations")
                  ])
                ),
                hardline,
                "}"
              ])
            : ""
        ])
      );
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
                        comments.printDanglingComments(typePath, options, true),
                      "type"
                    ),
                    " "
                  ])
                : "",
              node.nullable ? "?" : "",
              path.call(print, "type")
            ])
          : "",
        bodyContents: node.body ? path.call(print, "body") : "",
        node,
        path,
        options
      });
    case "closure": {
      const hasEmptyBody =
        node.body &&
        node.body.children &&
        node.body.children.length === 0 &&
        !node.body.comments;

      return concat([
        node.isStatic ? "static " : "",
        "function ",
        node.byref ? "&" : "",
        printArgumentsList(path, options, print),
        node.uses && node.uses.length > 0
          ? group(
              concat([
                " use ",
                printArgumentsList(path, options, print, "uses")
              ])
            )
          : "",
        node.type
          ? concat([
              ": ",
              hasDanglingComments(node.type)
                ? concat([
                    path.call(
                      typePath =>
                        comments.printDanglingComments(typePath, options, true),
                      "type"
                    ),
                    " "
                  ])
                : "",
              node.nullable ? "?" : "",
              path.call(print, "type")
            ])
          : "",
        " {",
        indent(
          concat([hasEmptyBody ? "" : hardline, path.call(print, "body")])
        ),
        concat([hasEmptyBody ? "" : hardline, "}"])
      ]);
    }
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
                        comments.printDanglingComments(typePath, options, true),
                      "type"
                    ),
                    " "
                  ])
                : "",
              node.nullable ? "?" : "",
              path.call(print, "type")
            ])
          : "",
        bodyContents: node.body ? concat([path.call(print, "body")]) : "",
        node,
        path,
        options
      });
    }
    case "parameter": {
      const name = concat([
        node.nullable ? "?" : "",
        node.type ? concat([path.call(print, "type"), " "]) : "",
        node.byref ? "&" : "",
        node.variadic ? "..." : "",
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
            concat([
              " =",
              printAssignmentRight(
                node.name,
                node.value,
                path.call(print, "value"),
                options
              )
            ])
          ])
        );
      }

      return name;
    }
    case "variadic":
      return concat(["...", path.call(print, "what")]);
    case "property":
      return group(
        concat([
          node.visibility ? concat([node.visibility, " "]) : "",
          node.isStatic ? "static " : "",
          "$",
          node.name,
          node.value
            ? concat([
                " =",
                printAssignmentRight(
                  node.name,
                  node.value,
                  path.call(print, "value"),
                  options
                )
              ])
            : ""
        ])
      );
    case "constant":
    case "classconstant":
      return concat([
        node.visibility ? concat([node.visibility, " "]) : "",
        "const ",
        node.name,
        " = ",
        path.call(print, "value")
      ]);
    case "if": {
      const parts = [];
      const body = printBodyControlStructure(path, print, "body", options);
      const opening = group(
        concat([
          "if (",
          group(
            concat([
              indent(concat([softline, path.call(print, "test")])),
              softline
            ])
          ),
          ")",
          body
        ])
      );

      parts.push(
        opening,
        isFirstChildrenInlineNode(path) || !node.body ? "" : hardline
      );

      if (node.alternate) {
        parts.push(node.shortForm ? "" : "} ");

        const commentOnOwnLine =
          (hasTrailingComment(node.body) &&
            node.body.comments.some(
              comment => comment.trailing && !comments.isBlockComment(comment)
            )) ||
          needsHardlineAfterDanglingComment(node);

        if (hasDanglingComments(node)) {
          parts.push(
            comments.printDanglingComments(path, options, true),
            commentOnOwnLine ? hardline : " "
          );
        }

        parts.push(
          "else",
          group(
            node.alternate.kind === "if"
              ? path.call(print, "alternate")
              : printBodyControlStructure(path, print, "alternate", options)
          )
        );
      } else {
        parts.push(node.body ? (node.shortForm ? "endif;" : "}") : "");
      }

      return concat(parts);
    }
    case "do":
      return concat([
        "do",
        printBodyControlStructure(path, print, "body", options),
        " while (",
        group(
          concat([
            indent(concat([softline, path.call(print, "test")])),
            softline
          ])
        ),
        ")"
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
          printBodyControlStructure(path, print, "body", options)
        ])
      );
    case "for": {
      const body = printBodyControlStructure(path, print, "body", options);

      // We want to keep dangling comments above the loop to stay consistent.
      // Any comment positioned between the for statement and the parentheses
      // is going to be printed before the statement.
      const dangling = comments.printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? concat([dangling, softline]) : "";

      if (!node.init.length && !node.test.length && !node.increment.length) {
        return concat([printedComments, group(concat(["for (;;)", body]))]);
      }

      return concat([
        printedComments,
        group(
          concat([
            "for (",
            group(
              concat([
                indent(
                  concat([
                    softline,
                    group(
                      concat([
                        join(concat([",", line]), path.map(print, "init"))
                      ])
                    ),
                    ";",
                    line,
                    group(
                      concat([
                        join(concat([",", line]), path.map(print, "test"))
                      ])
                    ),
                    ";",
                    line,
                    group(
                      join(concat([",", line]), path.map(print, "increment"))
                    )
                  ])
                ),
                softline
              ])
            ),
            ")",
            body
          ])
        )
      ]);
    }
    case "foreach": {
      const body = printBodyControlStructure(path, print, "body", options);

      // We want to keep dangling comments above the loop to stay consistent.
      // Any comment positioned between the for statement and the parentheses
      // is going to be printed before the statement.
      const dangling = comments.printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? concat([dangling, softline]) : "";

      return concat([
        printedComments,
        group(
          concat([
            "foreach (",
            group(
              concat([
                indent(
                  concat([
                    softline,
                    path.call(print, "source"),
                    line,
                    "as ",
                    group(
                      node.key
                        ? indent(
                            join(concat([" =>", line]), [
                              path.call(print, "key"),
                              path.call(print, "value")
                            ])
                          )
                        : path.call(print, "value")
                    )
                  ])
                ),
                softline
              ])
            ),
            ")",
            body
          ])
        )
      ]);
    }
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
        printBodyControlStructure(path, print, "body", options)
      ]);
    case "case":
      return concat([
        node.test
          ? concat(["case ", path.call(print, "test"), ":"])
          : "default:",
        node.body
          ? node.body.children && node.body.children.length
            ? indent(
                concat([
                  isFirstChildrenInlineNode(path) ? "" : hardline,
                  path.call(print, "body")
                ])
              )
            : ";"
          : ""
      ]);
    case "break":
    case "continue":
      if (node.level) {
        if (node.level.kind == "number" && node.level.value != 1) {
          return concat([`${node.kind} `, path.call(print, "level")]);
        }

        return node.kind;
      }

      return node.kind;
    case "call": {
      // chain: Call (*LookupNode (Call (*LookupNode (...))))
      if (isLookupNode(node.what)) {
        return printMemberChain(path, options, print);
      }

      return concat([
        path.call(print, "what"),
        printArgumentsList(path, options, print)
      ]);
    }
    case "new": {
      // TODO: maybe need rewrite after resolve https://github.com/glayzzle/php-parser/issues/187
      // If the child node is an anonymous class, we need to store the arguments in `what` node
      // so the child class node can access them later.
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;

      if (isAnonymousClassNode) {
        node.what.arguments = node.arguments;
      }

      return group(
        concat([
          "new ",
          path.call(print, "what"),
          isAnonymousClassNode ? "" : printArgumentsList(path, options, print)
        ])
      );
    }
    case "clone":
      return concat(["clone ", path.call(print, "what")]);
    case "propertylookup":
    case "staticlookup":
    case "offsetlookup": {
      const parent = path.getParentNode();

      let firstNonMemberParent;
      let i = 0;

      do {
        firstNonMemberParent = path.getParentNode(i);
        i++;
      } while (firstNonMemberParent && isLookupNode(firstNonMemberParent));

      const shouldInline =
        (firstNonMemberParent &&
          (firstNonMemberParent.kind === "new" ||
            (firstNonMemberParent.kind === "assign" &&
              firstNonMemberParent.left.kind !== "variable"))) ||
        node.kind === "offsetlookup" ||
        ((node.what.kind === "identifier" || node.what.kind === "variable") &&
          (node.offset.kind === "constref" ||
            node.offset.kind === "variable") &&
          (parent && !isLookupNode(parent)));

      return concat([
        path.call(print, "what"),
        shouldInline
          ? printLookupNodes(path, options, print)
          : group(
              indent(concat([softline, printLookupNodes(path, options, print)]))
            )
      ]);
    }
    case "constref":
      if (typeof node.name === "object") {
        return path.call(print, "name");
      }

      return node.name;
    case "retif": {
      const parts = [];
      const parent = path.getParentNode();

      // Find the outermost non-retif parent, and the outermost retif parent.
      let currentParent;
      let i = 0;

      do {
        currentParent = path.getParentNode(i);
        i++;
      } while (currentParent && currentParent.kind === "retif");
      const firstNonRetifParent = currentParent || parent;

      const printedTrueExpr = path.call(print, "trueExpr");
      const printedFalseExpr = path.call(print, "falseExpr");
      const part = concat([
        line,
        "?",
        node.trueExpr
          ? concat([
              " ",
              node.trueExpr.kind === "bin"
                ? indent(printedTrueExpr)
                : printedTrueExpr,
              line
            ])
          : "",
        ": ",
        node.falseExpr.kind === "bin"
          ? indent(printedFalseExpr)
          : printedFalseExpr
      ]);

      parts.push(part);

      // We want a whole chain of retif to all break if any of them break.
      const maybeGroup = doc =>
        parent === firstNonRetifParent ? group(doc) : doc;

      // Break the closing parens to keep the chain right after it:
      // ($a
      //   ? $b
      //   : $c
      // )->call()
      const breakLookupNodes = ["propertylookup", "staticlookup"];
      const breakClosingParens = breakLookupNodes.includes(parent.kind);

      const printedTest = path.call(print, "test");

      return maybeGroup(
        concat([
          node.test.kind === "retif" ? indent(printedTest) : printedTest,
          indent(concat(parts)),
          breakClosingParens ? softline : ""
        ])
      );
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
    case "global":
      return group(
        concat([
          "global ",
          indent(concat([join(concat([",", line]), path.map(print, "items"))]))
        ])
      );
    case "include":
      return concat([
        node.require ? "require" : "include",
        node.once ? "_once" : "",
        " ",
        path.call(print, "target")
      ]);
    case "label":
      return concat([node.name, ":"]);
    case "goto":
      return concat(["goto ", node.label]);
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
      return concat(["__halt_compiler();", node.after]);
    case "eval":
      return group(
        concat([
          "eval(",
          indent(concat([softline, path.call(print, "source")])),
          softline,
          ")"
        ])
      );
    case "echo": {
      const printedArguments = path.map((argumentPath, index) => {
        const argumentNode = argumentPath.getValue();
        let printed = print(argumentPath);

        if (
          (argumentNode.kind === "encapsed" &&
            argumentNode.type === "heredoc") ||
          argumentNode.kind === "nowdoc"
        ) {
          return printed;
        }

        if (index === 0) {
          printed = dedent(printed);
        }

        return printed;
      }, "arguments");

      return indent(
        group(
          concat([
            node.shortForm ? "" : "echo ",
            group(join(concat([",", line]), printedArguments))
          ])
        )
      );
    }
    case "print": {
      return concat(["print ", path.call(print, "arguments")]);
    }
    case "return": {
      const parts = [];

      parts.push("return");

      if (node.expr) {
        const printedExpr = path.call(print, "expr");

        if (comments.returnArgumentHasLeadingComment(options, node.expr)) {
          parts.push(indent(concat([hardline, printedExpr])));
        } else if (node.expr.kind === "bin") {
          parts.push(group(indent(concat([" ", printedExpr]))));
        } else {
          parts.push(" ", printedExpr);
        }
      }

      if (hasDanglingComments(node)) {
        parts.push(
          " ",
          comments.printDanglingComments(path, options, /* sameIndent */ true)
        );
      }

      return concat(parts);
    }
    case "isset":
    case "unset":
    case "empty":
      return group(
        concat([node.kind, printArgumentsList(path, options, print)])
      );
    case "variable":
      return concat([
        node.byref ? "&" : "",
        "$",
        node.curly ? "{" : "",
        path.call(print, "name"),
        node.curly ? "}" : ""
      ]);
    case "static": {
      const printed = path.map(childPath => {
        return print(childPath);
      }, "items");

      const hasValue = node.items.some(item => item.kind === "assign");

      let firstVariable;

      if (printed.length === 1) {
        [firstVariable] = printed;
      } else if (printed.length > 1) {
        // Indent first item
        firstVariable = indent(printed[0]);
      }

      return group(
        concat([
          "static",
          firstVariable ? concat([" ", firstVariable]) : "",
          indent(
            concat(
              printed
                .slice(1)
                .map(p => concat([",", hasValue ? hardline : line, p]))
            )
          )
        ])
      );
    }
    case "list":
    case "array": {
      const open = node.shortForm ? "[" : concat([node.kind, "("]);
      const close = node.shortForm ? "]" : ")";
      const index = node.kind === "array" ? "items" : "arguments";

      if (node[index].length === 0) {
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

      // Todo https://github.com/glayzzle/php-parser/issues/174
      if (getLast(node[index]) === null) {
        node[index].pop();
      }

      const lastElem = getLast(node[index]);

      // PHP allows you to have empty elements in an array which
      // changes its length based on the number of commas. The algorithm
      // is that if the last argument is null, we need to force insert
      // a comma to ensure PHP recognizes it.
      //   [,] === $arr;
      //   [1,] === $arr;
      //   [1,,] === $arr;
      //
      // Note that getLast returns null if the array is empty, but
      // we already check for an empty array just above so we are safe
      const needsForcedTrailingComma = lastElem === null;

      const isAssociative = !!(node[index][0] && node[index][0].key);
      const shouldBreak = isAssociative && node.loc.source.includes("\n");

      return group(
        concat([
          open,
          indent(
            concat([softline, printArrayItems(path, options, index, print)])
          ),
          needsForcedTrailingComma ? "," : "",
          ifBreak(
            !needsForcedTrailingComma && shouldPrintComma(options) ? "," : ""
          ),
          comments.printDanglingComments(path, options, true),
          softline,
          close
        ]),
        { shouldBreak }
      );
    }
    case "entry":
      return printAssignment(
        node.key,
        path.call(print, "key"),
        " =>",
        node.value,
        path.call(print, "value"),
        options
      );
    case "yield":
      return concat([
        "yield",
        node.key || node.value ? " " : "",
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value")
      ]);
    case "yieldfrom":
      return concat(["yield from ", path.call(print, "value")]);
    case "unary":
      return concat([node.type, path.call(print, "what")]);
    case "pre":
      return concat([node.type + node.type, path.call(print, "what")]);
    case "post":
      return concat([path.call(print, "what"), node.type + node.type]);
    case "cast":
      return concat(["(", node.type, ") ", path.call(print, "what")]);
    case "assign": {
      return printAssignment(
        node.left,
        path.call(print, "left"),
        // Assignments nested inside a static declaration doesn't have the operator set, so printing manually
        concat([" ", node.operator ? node.operator : "="]),
        node.right,
        path.call(print, "right"),
        options
      );
    }
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
      //   )->call()
      if (
        parent.kind === "unary" ||
        (isLookupNode(parent) && parent.kind !== "offsetlookup")
      ) {
        return group(
          concat([indent(concat([softline, concat(parts)])), softline])
        );
      }

      // Avoid indenting sub-expressions in some cases where the first sub-expression is already
      // indented accordingly. We should indent sub-expressions where the first case isn't indented.
      const shouldNotIndent =
        parent.kind === "return" ||
        (node !== parent.body && parent.kind === "for") ||
        (parent.kind === "retif" &&
          (parentParent && parentParent.kind !== "return"));

      const shouldIndentIfInlining =
        parent.kind === "assign" || parent.kind === "property";

      const samePrecedenceSubExpression =
        node.left.kind === "bin" && shouldFlatten(node.type, node.left.type);

      if (
        shouldNotIndent ||
        (shouldInlineLogicalExpression(node) && !samePrecedenceSubExpression) ||
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
    case "boolean":
      return node.value ? "true" : "false";
    case "number":
      return printNumber(node.value);
    case "string": {
      const quote = node.isDoubleQuote ? '"' : "'";

      let stringValue = node.raw;

      if (node.raw[0] === "b") {
        stringValue = stringValue.slice(1);
      }

      // We need to strip out the quotes from the raw value
      if (['"', "'"].includes(stringValue[0])) {
        stringValue = stringValue.substr(1);
      }

      if (['"', "'"].includes(stringValue[stringValue.length - 1])) {
        stringValue = stringValue.substr(0, stringValue.length - 1);
      }

      return concat([
        node.raw[0] === "b" ? "b" : "",
        quote,
        stringValue,
        quote
      ]);
    }
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
            }

            if (node.kind === "variable") {
              if (typeof node.name === "object") {
                return concat([
                  node.curly ? "${" : "",
                  path.call(print, "name"),
                  node.curly ? "}" : ""
                ]);
              }

              if (node.curly) {
                return concat(["{$", node.name, "}"]);
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
      return join(
        literalline,
        node.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split("\n")
      );
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
    case "identifier": {
      const parent = path.getParentNode();

      if (parent.kind === "constref" && node.name.toLowerCase() !== "null") {
        return node.name;
      }

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
          "self",
          "parent"
        ].indexOf(lowerCasedName) !== -1;

      return isLowerCase ? lowerCasedName : node.name;
    }
    case "error":
    default:
      return `Have not implemented kind ${node.kind} yet.`;
  }
}

module.exports = genericPrint;
