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
  shouldPrintHardLineAfterStartInControlStructure,
  shouldPrintHardLineBeforeEndInControlStructure,
  getAlignment,
  getFirstNestedChildNode,
  getLastNestedChildNode,
  isProgramLikeNode,
  getNodeKindIncludingLogical,
  useSingleQuote,
  hasEmptyBody,
  hasNewline,
  isNextLineEmptyAfterNamespace,
  shouldPrintHardlineBeforeTrailingComma,
  isDocNode,
  getAncestorNode,
  isReferenceLikeNode,
  getNextNode
} = require("./util");

function shouldPrintComma(options, level) {
  level = level || "none";

  switch (options.trailingComma) {
    case "all":
      if (level === "all") {
        return true;
      }
    // fallthrough
    case "php7.2":
      if (level === "php7.2") {
        return true;
      }
    // fallthrough
    case "php5":
      if (level === "php5") {
        return true;
      }
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

  let needCurly = true;

  if (
    node.offset.kind === "variable" ||
    (node.offset.kind === "identifier" &&
      typeof node.offset.name === "string") ||
    (node.offset.kind === "encapsed" && node.offset.type === "offset")
  ) {
    needCurly = false;
  }

  return concat([
    "->",
    needCurly ? "{" : "",
    path.call(print, "offset"),
    needCurly ? "}" : ""
  ]);
}

function printStaticLookup(path, options, print) {
  const node = path.getValue();
  const needCurly = !["variable", "identifier"].includes(node.offset.kind);

  return concat([
    "::",
    needCurly ? "{" : "",
    path.call(print, "offset"),
    needCurly ? "}" : ""
  ]);
}

function printOffsetLookup(path, options, print) {
  const node = path.getValue();
  const shouldInline =
    (node.offset && node.offset.kind === "number") ||
    getAncestorNode(path, "encapsed");

  return concat([
    "[",
    node.offset
      ? group(
          concat([
            indent(
              concat([shouldInline ? "" : softline, path.call(print, "offset")])
            ),
            shouldInline ? "" : softline
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
          comments.printAllComments(
            path,
            () => concat([printArgumentsList(path, options, print)]),
            options
          ),
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
        printed: comments.printAllComments(
          path,
          () => printedMemberish,
          options
        )
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

  // Restore parens around `propertylookup` and `staticlookup` nodes with call.
  // $value = ($object->foo)();
  // $value = ($object::$foo)();
  for (let i = 0; i < printedNodes.length; ++i) {
    if (
      printedNodes[i].node.kind === "call" &&
      printedNodes[i - 1] &&
      ["propertylookup", "staticlookup"].includes(
        printedNodes[i - 1].node.kind
      ) &&
      printedNodes[i - 1].needsParens
    ) {
      printedNodes[0].printed = concat(["(", printedNodes[0].printed]);
      printedNodes[i - 1].printed = concat([printedNodes[i - 1].printed, ")"]);
    }
  }

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
    const hasComputed =
      groups[1].length && groups[1][0].node.kind === "offsetlookup";

    if (groups[0].length === 1) {
      const firstNode = groups[0][0].node;

      return (
        (firstNode.kind === "variable" && firstNode.name === "this") ||
        isReferenceLikeNode(firstNode)
      );
    }

    const lastNode = getLast(groups[0]).node;

    return (
      isLookupNode(lastNode) &&
      (lastNode.offset.kind === "identifier" ||
        lastNode.offset.kind === "variable" ||
        lastNode.offset.kind === "encapsed") &&
      hasComputed
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

  const hasEncapsedAncestor = getAncestorNode(path, "encapsed");

  // If we only have a single `->`, we shouldn't do anything fancy and just
  // render everything concatenated together.
  // In `encapsed` node we always print in one line.
  if ((groups.length <= cutoff && !hasComment) || hasEncapsedAncestor) {
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
    secondArg.kind !== "retif" &&
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

  return group(
    concat([
      "(",
      indent(concat([softline, concat(printedArguments)])),
      softline,
      ")"
    ]),
    {
      shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine
    }
  );
}

function shouldInlineRetifFalseExpression(node) {
  return node.kind === "array" && node.items.length !== 0;
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

    const shouldNotHaveWhitespace =
      isDocNode(node.left) ||
      (node.left.kind === "bin" && isDocNode(node.left.right));

    parts.push(
      shouldNotHaveWhitespace ? "" : " ",
      shouldGroup ? group(right) : right
    );
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
    /* istanbul ignore next */
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

  /* istanbul ignore next */
  return `Unimplemented encapsed type ${node.type}`;
}

function printArrayItems(path, options, print) {
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
  }, "items");

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
          ? (isBlockNestedNode && !prevInlineNode) ||
            (isProgramLikeNode(node) && start === 0)
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

function printClassPart(
  path,
  options,
  print,
  part = "extends",
  beforePart = " ",
  afterPart = " "
) {
  const node = path.getValue();
  const printedBeforePart = hasDanglingComments(node[part])
    ? concat([
        hardline,
        path.call(
          partPath => comments.printDanglingComments(partPath, options, true),
          part
        ),
        hardline
      ])
    : beforePart;
  const printedPartItems = Array.isArray(node[part])
    ? group(
        concat([
          join(
            ",",
            path.map(itemPartPath => {
              const printedPart = print(itemPartPath);
              // Check if any of the implements nodes have comments
              return hasDanglingComments(itemPartPath.getValue())
                ? concat([
                    hardline,
                    comments.printDanglingComments(itemPartPath, options, true),
                    hardline,
                    printedPart
                  ])
                : concat([afterPart, printedPart]);
            }, part)
          )
        ])
      )
    : concat([afterPart, path.call(print, part)]);

  return indent(
    concat([
      printedBeforePart,
      part,
      willBreak(printedBeforePart) ? indent(printedPartItems) : printedPartItems
    ])
  );
}

function printClass(path, options, print) {
  const node = path.getValue();

  const declaration = [];

  if (node.isFinal) {
    declaration.push("final ");
  }

  if (node.isAbstract) {
    declaration.push("abstract ");
  }

  const isAnonymousClass = node.kind === "class" && node.isAnonymous;

  // `new` print `class` keyword with arguments
  declaration.push(isAnonymousClass ? "" : node.kind);

  if (node.name) {
    declaration.push(" ", path.call(print, "name"));
  }

  // Only `class` can have `extends` and `implements`
  if (node.extends && node.implements) {
    declaration.push(
      conditionalGroup(
        [
          concat([
            printClassPart(path, options, print, "extends"),
            printClassPart(path, options, print, "implements")
          ]),
          concat([
            printClassPart(path, options, print, "extends"),
            printClassPart(path, options, print, "implements", " ", hardline)
          ]),
          concat([
            printClassPart(path, options, print, "extends", hardline, " "),
            printClassPart(
              path,
              options,
              print,
              "implements",
              hardline,
              node.implements.length > 1 ? hardline : " "
            )
          ])
        ],
        {
          shouldBreak: hasDanglingComments(node.extends)
        }
      )
    );
  } else {
    if (node.extends) {
      declaration.push(
        conditionalGroup([
          printClassPart(path, options, print, "extends"),
          printClassPart(path, options, print, "extends", " ", hardline),
          printClassPart(
            path,
            options,
            print,
            "extends",
            hardline,
            node.extends.length > 1 ? hardline : " "
          )
        ])
      );
    }

    if (node.implements) {
      declaration.push(
        conditionalGroup([
          printClassPart(path, options, print, "implements"),
          printClassPart(path, options, print, "implements", " ", hardline),
          printClassPart(
            path,
            options,
            print,
            "implements",
            hardline,
            node.implements.length > 1 ? hardline : " "
          )
        ])
      );
    }
  }

  const printedDeclaration = group(
    concat([group(concat(declaration)), isAnonymousClass ? line : hardline])
  );

  const hasEmptyClassBody =
    node.body && node.body.length === 0 && !hasDanglingComments(node);
  const printedBody = concat([
    "{",
    indent(
      concat([
        hasEmptyClassBody ? "" : hardline,
        printLines(path, options, print, "body")
      ])
    ),
    comments.printDanglingComments(path, options, true),
    isAnonymousClass && hasEmptyClassBody ? softline : hardline,
    "}"
  ]);

  return concat([printedDeclaration, printedBody]);
}

function printFunction(path, options, print) {
  const node = path.getValue();
  const declaration = [];

  if (node.isFinal) {
    declaration.push("final ");
  }

  if (node.isAbstract) {
    declaration.push("abstract ");
  }

  if (node.visibility) {
    declaration.push(node.visibility, " ");
  }

  if (node.isStatic) {
    declaration.push("static ");
  }

  declaration.push("function ");

  if (node.byref) {
    declaration.push("&");
  }

  if (node.name) {
    declaration.push(path.call(print, "name"));
  }

  declaration.push(printArgumentsList(path, options, print));

  if (node.uses && node.uses.length > 0) {
    declaration.push(
      group(concat([" use ", printArgumentsList(path, options, print, "uses")]))
    );
  }

  if (node.type) {
    declaration.push(
      concat([
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
    );
  }

  const printedDeclaration = concat(declaration);
  const isClosure = node.kind === "closure";
  const printedBody = node.body
    ? concat([
        "{",
        indent(
          concat([hasEmptyBody(path) ? "" : hardline, path.call(print, "body")])
        ),
        isClosure && hasEmptyBody(path) ? "" : hardline,
        "}"
      ])
    : "";

  if (isClosure) {
    return concat([printedDeclaration, " ", printedBody]);
  }

  return conditionalGroup([
    concat([printedDeclaration, node.body ? hardline : "", printedBody]),
    concat([
      printedDeclaration,
      node.body ? (node.arguments.length === 0 ? hardline : " ") : "",
      printedBody
    ])
  ]);
}

function printBodyControlStructure(
  path,
  options,
  print,
  bodyProperty = "body"
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
        node[bodyProperty].kind !== "block" ||
        (node[bodyProperty].children &&
          node[bodyProperty].children.length > 0) ||
        (node[bodyProperty].comments && node[bodyProperty].comments.length > 0)
          ? concat([
              shouldPrintHardLineAfterStartInControlStructure(path)
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

  if (node.what.kind === "variable" || isReferenceLikeNode(node.what)) {
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

  const pureRightNode = rightNode.kind === "cast" ? rightNode.what : rightNode;

  const canBreak =
    (pureRightNode.kind === "bin" &&
      !shouldInlineLogicalExpression(pureRightNode)) ||
    (pureRightNode.kind === "retif" &&
      ((!pureRightNode.trueExpr &&
        !shouldInlineRetifFalseExpression(pureRightNode.falseExpr)) ||
        (pureRightNode.test.kind === "bin" &&
          !shouldInlineLogicalExpression(pureRightNode.test)))) ||
    ((leftNode.kind === "variable" ||
      leftNode.kind === "string" ||
      isLookupNode(leftNode)) &&
      ((pureRightNode.kind === "string" && !stringHasNewLines(pureRightNode)) ||
        isLookupNodeChain(pureRightNode)));

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

function stringHasNewLines(node) {
  return node.raw.includes("\n");
}

function isStringOnItsOwnLine(node, text, options) {
  return (
    (node.kind === "string" ||
      (node.kind === "encapsed" &&
        (node.type === "string" || node.type === "shell"))) &&
    stringHasNewLines(node) &&
    !hasNewline(text, options.locStart(node), { backwards: true })
  );
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
    case "expressionstatement":
      return path.call(print, "expression");
    case "block":
      return concat([
        printLines(path, options, print),
        comments.printDanglingComments(path, options, true)
      ]);
    case "declare": {
      const printDeclareArguments = path => {
        return join(
          ", ",
          path.map(directive => concat([print(directive)]), "directives")
        );
      };

      if (["block", "short"].includes(node.mode)) {
        return concat([
          "declare(",
          printDeclareArguments(path),
          ")",
          node.mode === "block" ? " {" : ":",
          node.children.length > 0
            ? indent(concat([hardline, printLines(path, options, print)]))
            : "",
          comments.printDanglingComments(path, options),
          hardline,
          node.mode === "block" ? "}" : "enddeclare;"
        ]);
      }

      const nextNode = getNextNode(path, node);

      return concat([
        "declare(",
        printDeclareArguments(path),
        ")",
        nextNode && nextNode.kind === "inline" ? "" : ";"
      ]);
    }
    case "declaredirective":
      return concat([path.call(print, "key"), "=", path.call(print, "value")]);
    case "namespace":
      return concat([
        "namespace ",
        node.name && typeof node.name === "string"
          ? concat([node.name, node.withBrackets ? " " : ""])
          : "",
        node.withBrackets ? "{" : ";",
        hasDanglingComments(node)
          ? concat([" ", comments.printDanglingComments(path, options, true)])
          : "",
        node.children.length > 0
          ? node.withBrackets
            ? indent(concat([hardline, printLines(path, options, print)]))
            : concat([
                hardline,
                isNextLineEmptyAfterNamespace(
                  options.originalText,
                  node,
                  options.locStart
                )
                  ? hardline
                  : "",
                printLines(path, options, print)
              ])
          : "",
        node.withBrackets ? concat([hardline, "}"]) : ""
      ]);
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
                ifBreak(shouldPrintComma(options, "php7.2") ? "," : ""),
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
    case "class":
    case "interface":
    case "trait":
      return printClass(path, options, print);
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
        node.trait ? concat([path.call(print, "trait"), "::"]) : "",
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
                node.adaptations.length > 0
                  ? concat([
                      indent(
                        concat([
                          hardline,
                          printLines(path, options, print, "adaptations")
                        ])
                      ),
                      hardline
                    ])
                  : hasDanglingComments(node)
                  ? concat([
                      line,
                      comments.printDanglingComments(path, options, true),
                      line
                    ])
                  : "",
                "}"
              ])
            : ""
        ])
      );
    case "function":
    case "closure":
    case "method":
      return printFunction(path, options, print);
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
          node.visibility || node.visibility === null
            ? concat([node.visibility === null ? "var" : node.visibility, " "])
            : "",
          node.isStatic ? "static " : "",
          node.kind === "property" ? "$" : "const ",
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
    case "if": {
      const parts = [];
      const body = printBodyControlStructure(path, options, print, "body");
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
        const elseOnSameLine = !commentOnOwnLine;
        parts.push(elseOnSameLine ? "" : hardline);

        if (hasDanglingComments(node)) {
          parts.push(
            isNextLineEmpty(options.originalText, node.body, options)
              ? hardline
              : "",
            comments.printDanglingComments(path, options, true),
            commentOnOwnLine ? hardline : " "
          );
        }

        parts.push(
          "else",
          group(
            node.alternate.kind === "if"
              ? path.call(print, "alternate")
              : printBodyControlStructure(path, options, print, "alternate")
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
        printBodyControlStructure(path, options, print, "body"),
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
          printBodyControlStructure(path, options, print, "body")
        ])
      );
    case "for": {
      const body = printBodyControlStructure(path, options, print, "body");

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
      const body = printBodyControlStructure(path, options, print, "body");

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
    case "try": {
      const parts = [];

      parts.push(
        "try",
        printBodyControlStructure(path, options, print, "body")
      );

      if (node.catches) {
        parts.push(concat(path.map(print, "catches")));
      }

      if (node.always) {
        parts.push(
          " finally",
          printBodyControlStructure(path, options, print, "always")
        );
      }

      return concat(parts);
    }
    case "catch": {
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
        printBodyControlStructure(path, options, print, "body")
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
        printBodyControlStructure(path, options, print, "body")
      ]);
    case "case":
      return concat([
        node.test
          ? concat([
              "case ",
              node.test.comments
                ? indent(path.call(print, "test"))
                : path.call(print, "test"),
              ":"
            ])
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
      // Multiline strings as single arguments
      if (
        node.arguments.length === 1 &&
        isStringOnItsOwnLine(node.arguments[0], options.originalText, options)
      ) {
        return concat([
          path.call(print, "what"),
          concat(["(", join(", ", path.map(print, "arguments")), ")"])
        ]);
      }

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
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;

      // Multiline strings as single arguments
      if (
        !isAnonymousClassNode &&
        node.arguments.length === 1 &&
        isStringOnItsOwnLine(node.arguments[0], options.originalText, options)
      ) {
        return concat([
          "new ",
          path.call(print, "what"),
          "(",
          join(", ", path.map(print, "arguments")),
          ")"
        ]);
      }

      const printedWhat = isAnonymousClassNode
        ? concat([
            "class",
            node.arguments.length > 0
              ? printArgumentsList(path, options, print)
              : "",
            group(path.call(print, "what"))
          ])
        : concat([
            path.call(print, "what"),
            printArgumentsList(path, options, print)
          ]);

      return concat(["new ", printedWhat]);
    }
    case "clone":
      return concat([
        "clone ",
        node.what.comments
          ? indent(path.call(print, "what"))
          : path.call(print, "what")
      ]);
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

      const hasEncapsedAncestor = getAncestorNode(path, "encapsed");
      const shouldInline =
        hasEncapsedAncestor ||
        (firstNonMemberParent &&
          (firstNonMemberParent.kind === "new" ||
            (firstNonMemberParent.kind === "assign" &&
              firstNonMemberParent.left.kind !== "variable"))) ||
        node.kind === "offsetlookup" ||
        ((isReferenceLikeNode(node.what) || node.what.kind === "variable") &&
          (node.offset.kind === "identifier" ||
            node.offset.kind === "variable" ||
            node.offset.kind === "encapsed") &&
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
    case "exit":
      return group(
        concat([
          node.useDie ? "die" : "exit",
          "(",
          node.status
            ? isStringOnItsOwnLine(node.status, options.originalText, options)
              ? path.call(print, "status")
              : concat([
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
        node.target.comments
          ? indent(path.call(print, "target"))
          : path.call(print, "target")
      ]);
    case "label":
      return concat([node.name, ":"]);
    case "goto":
      return concat(["goto ", node.label]);
    case "throw":
      return concat([
        "throw ",
        node.what.comments
          ? indent(path.call(print, "what"))
          : path.call(print, "what")
      ]);
    case "silent":
      return concat(["@", path.call(print, "expr")]);
    case "halt":
      return concat([
        hasDanglingComments(node)
          ? concat([
              comments.printDanglingComments(
                path,
                options,
                /* sameIndent */ true
              ),
              hardline
            ])
          : "",
        "__halt_compiler();",
        node.after
      ]);
    case "eval":
      return group(
        concat([
          "eval(",
          isStringOnItsOwnLine(node.source, options.originalText, options)
            ? path.call(print, "source")
            : concat([
                indent(concat([softline, path.call(print, "source")])),
                softline
              ]),
          ")"
        ])
      );
    case "echo": {
      const printedArguments = path.map(childPath => {
        return print(childPath);
      }, "expressions");

      let firstVariable;

      if (printedArguments.length === 1 && !node.expressions[0].comments) {
        [firstVariable] = printedArguments;
      } else if (printedArguments.length > 0) {
        firstVariable =
          isDocNode(node.expressions[0]) || node.expressions[0].comments
            ? indent(printedArguments[0])
            : dedent(printedArguments[0]);
      }

      return group(
        concat([
          node.shortForm ? "" : "echo ",
          firstVariable ? firstVariable : "",
          indent(
            concat(printedArguments.slice(1).map(p => concat([",", line, p])))
          )
        ])
      );
    }
    case "print": {
      return concat([
        "print ",
        node.expression.comments
          ? indent(path.call(print, "expression"))
          : path.call(print, "expression")
      ]);
    }
    case "return": {
      const parts = [];

      parts.push("return");

      if (node.expr) {
        const printedExpr = path.call(print, "expr");

        parts.push(" ", node.expr.comments ? indent(printedExpr) : printedExpr);
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
      return group(
        concat([
          node.kind,
          printArgumentsList(path, options, print, "variables")
        ])
      );
    case "empty":
      return group(
        concat([
          "empty(",
          indent(concat([softline, path.call(print, "expression")])),
          softline,
          ")"
        ])
      );
    case "variable":
      return concat([
        node.byref ? "&" : "",
        "$",
        node.curly ? "{" : "",
        path.call(print, "name"),
        node.curly ? "}" : ""
      ]);
    case "constant":
      return printAssignment(
        node.name,
        path.call(print, "name"),
        " =",
        node.value,
        path.call(print, "value"),
        options
      );
    case "constantstatement":
    case "classconstant":
    case "static": {
      const printed = path.map(childPath => {
        return print(childPath);
      }, "items");

      const hasValue = node.items.some(item => item.kind === "assign");

      let firstVariable;

      if (printed.length === 1 && !node.items[0].comments) {
        [firstVariable] = printed;
      } else if (printed.length > 0) {
        // Indent first item
        firstVariable = indent(printed[0]);
      }

      return group(
        concat([
          node.visibility ? concat([node.visibility, " "]) : "",
          node.kind === "static" ? "static" : "const",
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

      // Todo https://github.com/glayzzle/php-parser/issues/174
      if (getLast(node.items) === null) {
        node.items.pop();
      }

      const lastElem = getLast(node.items);

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

      const isAssociative = !!(node.items[0] && node.items[0].key);
      const shouldBreak = isAssociative && node.loc.source.includes("\n");

      return group(
        concat([
          open,
          indent(concat([softline, printArrayItems(path, options, print)])),
          needsForcedTrailingComma ? "," : "",
          ifBreak(
            !needsForcedTrailingComma && shouldPrintComma(options, "php5")
              ? concat([
                  lastElem && shouldPrintHardlineBeforeTrailingComma(lastElem)
                    ? hardline
                    : "",
                  ","
                ])
              : ""
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
    case "yield": {
      const printedKeyAndValue = concat([
        node.key ? concat([path.call(print, "key"), " => "]) : "",
        path.call(print, "value")
      ]);

      return concat([
        "yield",
        node.key || node.value ? " " : "",
        node.value && node.value.comments
          ? indent(printedKeyAndValue)
          : printedKeyAndValue
      ]);
    }
    case "yieldfrom":
      return concat([
        "yield from ",
        node.value.comments
          ? indent(path.call(print, "value"))
          : path.call(print, "value")
      ]);
    case "unary":
      return concat([node.type, path.call(print, "what")]);
    case "pre":
      return concat([node.type + node.type, path.call(print, "what")]);
    case "post":
      return concat([path.call(print, "what"), node.type + node.type]);
    case "cast":
      return concat([
        "(",
        node.type,
        ") ",
        node.what.comments
          ? indent(path.call(print, "what"))
          : path.call(print, "what")
      ]);
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
      //     $this->hasPlugin('dynamicImports') && $this->lookahead()->type === tt->parenLeft
      //   ) {
      //
      // looks super weird, we want to break the children if the parent breaks
      //
      //   if (
      //     $this->hasPlugin('dynamicImports') &&
      //     $this->lookahead()->type === tt->parenLeft
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
        (node !== parent.body && parent.kind === "for") ||
        (parent.kind === "retif" &&
          (parentParent && parentParent.kind !== "return"));

      const shouldIndentIfInlining = [
        "assign",
        "property",
        "constant"
      ].includes(parent.kind);

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

      const printedFalseExpr =
        node.falseExpr.kind === "bin"
          ? indent(path.call(print, "falseExpr"))
          : path.call(print, "falseExpr");
      const part = concat([
        node.trueExpr ? line : " ",
        "?",
        node.trueExpr
          ? concat([
              " ",
              node.trueExpr.kind === "bin"
                ? indent(path.call(print, "trueExpr"))
                : path.call(print, "trueExpr"),
              line
            ])
          : "",
        ":",
        node.trueExpr
          ? concat([" ", printedFalseExpr])
          : concat([
              shouldInlineRetifFalseExpression(node.falseExpr) ? " " : line,
              printedFalseExpr
            ])
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
      const parentParent = path.getParentNode(1);
      const pureParent =
        parent.kind === "cast" && parentParent ? parentParent : parent;
      const breakLookupNodes = ["propertylookup", "staticlookup"];
      const breakClosingParens = breakLookupNodes.includes(pureParent.kind);

      const printedTest = path.call(print, "test");

      if (!node.trueExpr) {
        const printed = concat([
          printedTest,
          pureParent.kind === "bin" ||
          ["print", "echo", "return", "include"].includes(
            firstNonRetifParent.kind
          )
            ? indent(concat(parts))
            : concat(parts)
        ]);

        // Break between the parens in unaries or in a lookup nodes, i.e.
        //
        //   (
        //     a ?:
        //     b ?:
        //     c
        //   )->call()
        if (
          (pureParent.kind === "call" && pureParent.what === node) ||
          pureParent.kind === "unary" ||
          (isLookupNode(pureParent) && pureParent.kind !== "offsetlookup")
        ) {
          return group(concat([indent(concat([softline, printed])), softline]));
        }

        return maybeGroup(printed);
      }

      return maybeGroup(
        concat([
          node.test.kind === "retif" ? indent(printedTest) : printedTest,
          indent(concat(parts)),
          breakClosingParens ? softline : ""
        ])
      );
    }
    case "boolean":
      return node.value ? "true" : "false";
    case "number":
      return printNumber(node.value);
    case "string": {
      const parent = path.getParentNode();

      if (parent.kind === "encapsedpart") {
        return join(literalline, node.raw.split(/\r?\n/g));
      }

      const quote = useSingleQuote(node, options) ? "'" : '"';

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
        join(literalline, stringValue.split(/\r?\n/g)),
        quote
      ]);
    }
    case "encapsedpart":
      return concat([
        node.curly ? "{" : "",
        path.call(print, "expression"),
        node.curly ? "}" : ""
      ]);
    case "encapsed":
      switch (node.type) {
        case "string":
        case "shell":
        case "heredoc":
          return concat([
            getEncapsedQuotes(node),
            // Respect `indent` for `heredoc` nodes
            node.type === "heredoc" ? literalline : "",
            concat(path.map(print, "value")),
            getEncapsedQuotes(node, { opening: false }),
            node.type === "heredoc" && docShouldHaveTrailingNewline(path)
              ? hardline
              : ""
          ]);
        case "offset":
          return group(
            concat(
              path.map(valuePath => {
                const node = valuePath.getValue();
                const printedValue = print(valuePath);

                if (node.kind !== "identifier") {
                  return concat([
                    "{",
                    indent(concat([softline, printedValue])),
                    softline,
                    "}"
                  ]);
                }

                return printedValue;
              }, "value")
            )
          );
        // istanbul ignore next
        default:
          return `Have not implemented kind ${node.type} yet.`;
      }
    case "inline":
      return join(
        literalline,
        node.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split(/\r?\n/g)
      );
    case "magic":
      return node.value;
    case "nowdoc":
      // Respect `indent` for `nowdoc` nodes
      return concat([
        "<<<'",
        node.label,
        "'",
        literalline,
        join(literalline, node.value.split(/\r?\n/g)),
        literalline,
        node.label,
        docShouldHaveTrailingNewline(path) ? hardline : ""
      ]);
    case "classreference": {
      const parent = path.getParentNode();

      if (parent.kind !== "call" && node.name.toLowerCase() === "null") {
        return node.name.toLowerCase();
      }

      return concat([node.resolution === "rn" ? "namespace\\" : "", node.name]);
    }
    case "parentreference":
      return "parent";
    case "selfreference":
      return "self";
    case "staticreference":
      return "static";
    case "typereference":
      return node.name;
    case "identifier": {
      if (typeof node.name !== "string") {
        return path.call(print, "name");
      }

      return node.name;
    }
    case "error":
    default:
      // istanbul ignore next
      return `Have not implemented kind ${node.kind} yet.`;
  }
}

module.exports = genericPrint;
