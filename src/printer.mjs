import { util as prettierUtil, doc } from "prettier";
import {
  printAllComments,
  hasTrailingComment,
  hasLeadingComment,
  printDanglingComments,
  printComments,
  isBlockComment,
  hasLeadingOwnLineComment,
} from "./comments.mjs";
import pathNeedsParens from "./needs-parens.mjs";
import { locStart, locEnd } from "./loc.mjs";

import {
  getLast,
  getPenultimate,
  lineShouldEndWithSemicolon,
  printNumber,
  shouldFlatten,
  maybeStripLeadingSlashFromUse,
  fileShouldEndWithHardline,
  hasDanglingComments,
  docShouldHaveTrailingNewline,
  isLookupNode,
  isFirstChildrenInlineNode,
  shouldPrintHardLineAfterStartInControlStructure,
  shouldPrintHardLineBeforeEndInControlStructure,
  getAlignment,
  isProgramLikeNode,
  getNodeKindIncludingLogical,
  useDoubleQuote,
  hasEmptyBody,
  isNextLineEmptyAfterNamespace,
  shouldPrintHardlineBeforeTrailingComma,
  isDocNode,
  getAncestorNode,
  isReferenceLikeNode,
  normalizeMagicMethodName,
} from "./util.mjs";

const {
  breakParent,
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
  dedentToRoot,
} = doc.builders;
const { willBreak } = doc.utils;
const {
  isNextLineEmptyAfterIndex,
  hasNewline,
  hasNewlineInRange,
  getNextNonSpaceNonCommentCharacterIndex,
  isNextLineEmpty,
  isPreviousLineEmpty,
} = prettierUtil;

function isMinVersion(actualVersion, requiredVersion) {
  return parseFloat(actualVersion) >= parseFloat(requiredVersion);
}

function shouldPrintComma(options, requiredVersion) {
  if (!options.trailingCommaPHP) {
    return false;
  }

  return isMinVersion(options.phpVersion, requiredVersion);
}

function shouldPrintHardlineForOpenBrace(options) {
  switch (options.braceStyle) {
    case "1tbs":
      return false;
    case "psr-2":
    case "per-cs":
    default:
      return true;
  }
}

function genericPrint(path, options, print) {
  const { node } = path;

  if (typeof node === "string") {
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

  return parts;
}

function printPropertyLookup(path, options, print, nullsafe = false) {
  return [nullsafe ? "?" : "", "->", print("offset")];
}

function printNullsafePropertyLookup(path, options, print) {
  return printPropertyLookup(path, options, print, true);
}

function printStaticLookup(path, options, print) {
  const { node } = path;
  const needCurly = !["variable", "identifier"].includes(node.offset.kind);

  return ["::", needCurly ? "{" : "", print("offset"), needCurly ? "}" : ""];
}

function printOffsetLookup(path, options, print) {
  const { node } = path;
  const shouldInline =
    (node.offset && node.offset.kind === "number") ||
    getAncestorNode(path, "encapsed");

  return [
    "[",
    node.offset
      ? group([
          indent([shouldInline ? "" : softline, print("offset")]),
          shouldInline ? "" : softline,
        ])
      : "",
    "]",
  ];
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
      locEnd(node)
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

    return isNextLineEmpty(originalText, locEnd(node));
  }

  function traverse(path) {
    const { node } = path;

    if (
      node.kind === "call" &&
      (isLookupNode(node.what) || node.what.kind === "call")
    ) {
      printedNodes.unshift({
        node,
        printed: [
          printAllComments(
            path,
            () => printArgumentsList(path, options, print),
            options
          ),
          shouldInsertEmptyLineAfter(node) ? hardline : "",
        ],
      });
      path.call((what) => traverse(what), "what");
    } else if (isLookupNode(node)) {
      // Print *lookup nodes as we standard print them outside member chain
      let printedMemberish = null;

      if (node.kind === "propertylookup") {
        printedMemberish = printPropertyLookup(path, options, print);
      } else if (node.kind === "nullsafepropertylookup") {
        printedMemberish = printNullsafePropertyLookup(path, options, print);
      } else if (node.kind === "staticlookup") {
        printedMemberish = printStaticLookup(path, options, print);
      } else {
        printedMemberish = printOffsetLookup(path, options, print);
      }

      printedNodes.unshift({
        node,
        needsParens: pathNeedsParens(path, options),
        printed: printAllComments(path, () => printedMemberish, options),
      });
      path.call((what) => traverse(what), "what");
    } else {
      printedNodes.unshift({
        node,
        printed: print(),
      });
    }
  }

  const { node } = path;

  printedNodes.unshift({
    node,
    printed: printArgumentsList(path, options, print),
  });
  path.call((what) => traverse(what), "what");

  // Restore parens around `propertylookup` and `staticlookup` nodes with call.
  // $value = ($object->foo)();
  // $value = ($object::$foo)();
  for (let i = 0; i < printedNodes.length; ++i) {
    if (
      printedNodes[i].node.kind === "call" &&
      printedNodes[i - 1] &&
      ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(
        printedNodes[i - 1].node.kind
      ) &&
      printedNodes[i - 1].needsParens
    ) {
      printedNodes[0].printed = ["(", printedNodes[0].printed];
      printedNodes[i - 1].printed = [printedNodes[i - 1].printed, ")"];
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
      hasTrailingComment(printedNodes[i].node)
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
  // 3. expression statements with variable names shorter than the tab width
  //
  // Example:
  // $foo->bar()
  //     ->baz()
  //     ->buzz()

  function shouldNotWrap(groups) {
    const hasComputed =
      groups[1].length && groups[1][0].node.kind === "offsetlookup";

    if (groups[0].length === 1) {
      const firstNode = groups[0][0].node;

      return (
        (firstNode.kind === "variable" &&
          (firstNode.name === "this" ||
            (isExpressionStatement && isShort(firstNode.name)))) ||
        isReferenceLikeNode(firstNode)
      );
    }

    function isShort(name) {
      return name.length < options.tabWidth;
    }

    const lastNode = getLast(groups[0]).node;

    return (
      isLookupNode(lastNode) &&
      (lastNode.offset.kind === "identifier" ||
        lastNode.offset.kind === "variable") &&
      hasComputed
    );
  }

  const isExpressionStatement = path.parent.kind === "expressionstatement";
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

    return result;
  }

  function printIndentedGroup(groups) {
    if (groups.length === 0) {
      return "";
    }

    return indent(group([hardline, join(hardline, groups.map(printGroup))]));
  }

  const printedGroups = groups.map(printGroup);
  const oneLine = printedGroups;

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
  const flatGroups = groups.slice(0, cutoff).flat();

  const hasComment =
    flatGroups.slice(1, -1).some((node) => hasLeadingComment(node.node)) ||
    flatGroups.slice(0, -1).some((node) => hasTrailingComment(node.node)) ||
    (groups[cutoff] && hasLeadingComment(groups[cutoff][0].node));

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

  const expanded = [
    printGroup(groups[0]),
    shouldMerge ? groups.slice(1, 2).map(printGroup) : "",
    shouldHaveEmptyLineBeforeIndent ? hardline : "",
    printIndentedGroup(groups.slice(shouldMerge ? 2 : 1)),
  ];

  const callExpressionCount = printedNodes.filter(
    (tuple) => tuple.node.kind === "call"
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

  return [
    // We only need to check `oneLine` because if `expanded` is chosen
    // that means that the parent group has already been broken
    // naturally
    willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "",
    conditionalGroup([oneLine, expanded]),
  ];
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
  const args = path.node[argumentsKey];

  if (args.length === 0) {
    return [
      "(",
      printDanglingComments(path, options, /* sameIndent */ true),
      ")",
    ];
  }

  let anyArgEmptyLine = false;
  let hasEmptyLineFollowingFirstArg = false;

  const printedArguments = path.map(({ node: arg, isLast, isFirst }) => {
    const parts = [print()];

    if (isLast) {
      // do nothing
    } else if (isNextLineEmpty(options.originalText, locEnd(arg))) {
      if (isFirst) {
        hasEmptyLineFollowingFirstArg = true;
      }

      anyArgEmptyLine = true;
      parts.push(",", hardline, hardline);
    } else {
      parts.push(",", line);
    }

    return parts;
  }, argumentsKey);

  const { node } = path;
  const lastArg = getLast(args);

  const maybeTrailingComma =
    (shouldPrintComma(options, "7.3") &&
      ["call", "new", "unset", "isset"].includes(node.kind)) ||
    (shouldPrintComma(options, "8.0") &&
      ["function", "closure", "method", "arrowfunc", "attribute"].includes(
        node.kind
      ))
      ? indent([
          lastArg && shouldPrintHardlineBeforeTrailingComma(lastArg)
            ? hardline
            : "",
          ",",
        ])
      : "";

  function allArgsBrokenOut() {
    return group(
      ["(", indent([line, ...printedArguments]), maybeTrailingComma, line, ")"],
      { shouldBreak: true }
    );
  }

  const shouldGroupFirst = shouldGroupFirstArg(args);
  const shouldGroupLast = shouldGroupLastArg(args);

  if (shouldGroupFirst || shouldGroupLast) {
    const shouldBreak =
      (shouldGroupFirst
        ? printedArguments.slice(1).some(willBreak)
        : printedArguments.slice(0, -1).some(willBreak)) || anyArgEmptyLine;

    // We want to print the last argument with a special flag
    let printedExpanded;

    path.each(({ isLast, isFirst }) => {
      if (shouldGroupFirst && isFirst) {
        printedExpanded = [
          print([], { expandFirstArg: true }),
          printedArguments.length > 1 ? "," : "",
          hasEmptyLineFollowingFirstArg ? hardline : line,
          hasEmptyLineFollowingFirstArg ? hardline : "",
          printedArguments.slice(1),
        ];
      }

      if (shouldGroupLast && isLast) {
        printedExpanded = [
          ...printedArguments.slice(0, -1),
          print([], { expandLastArg: true }),
        ];
      }
    }, argumentsKey);

    const somePrintedArgumentsWillBreak = printedArguments.some(willBreak);
    const simpleConcat = ["(", ...printedExpanded, ")"];

    return [
      somePrintedArgumentsWillBreak ? breakParent : "",
      conditionalGroup(
        [
          !somePrintedArgumentsWillBreak
            ? simpleConcat
            : ifBreak(allArgsBrokenOut(), simpleConcat),
          shouldGroupFirst
            ? [
                "(",
                group(printedExpanded[0], { shouldBreak: true }),
                ...printedExpanded.slice(1),
                ")",
              ]
            : [
                "(",
                ...printedArguments.slice(0, -1),
                group(getLast(printedExpanded), {
                  shouldBreak: true,
                }),
                ")",
              ],
          group(
            [
              "(",
              indent([line, ...printedArguments]),
              ifBreak(maybeTrailingComma),
              line,
              ")",
            ],
            { shouldBreak: true }
          ),
        ],
        { shouldBreak }
      ),
    ];
  }

  return group(
    [
      "(",
      indent([softline, ...printedArguments]),
      ifBreak(maybeTrailingComma),
      softline,
      ")",
    ],
    {
      shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine,
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
  const { node } = path;

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
          () =>
            printBinaryExpression(
              path,
              print,
              options,
              /* isNested */ true,
              isInsideParenthesis
            ),
          "left"
        )
      );
    } else {
      parts.push(print("left"));
    }

    const shouldInline = shouldInlineLogicalExpression(node);

    const right = shouldInline
      ? [node.type, " ", print("right")]
      : [node.type, line, print("right")];

    // If there's only a single binary expression, we want to create a group
    // in order to avoid having a small right part like -1 be on its own line.
    const { parent } = path;
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

    // The root comments are already printed, but we need to manually print
    // the other ones since we don't call the normal print on bin,
    // only for the left and right parts
    if (isNested && node.comments) {
      parts = printAllComments(path, () => parts, options);
    }
  } else {
    // Our stopping case. Simply print the node normally.
    parts.push(print());
  }

  return parts;
}

function printLookupNodes(path, options, print) {
  const { node } = path;

  switch (node.kind) {
    case "propertylookup":
      return printPropertyLookup(path, options, print);
    case "nullsafepropertylookup":
      return printNullsafePropertyLookup(path, options, print);
    case "staticlookup":
      return printStaticLookup(path, options, print);
    case "offsetlookup":
      return printOffsetLookup(path, options, print);
    /* c8 ignore next 2 */
    default:
      throw new Error(`Have not implemented lookup kind ${node.kind} yet.`);
  }
}

function getEncapsedQuotes(node, { opening = true } = {}) {
  if (node.type === "heredoc") {
    return opening ? `<<<${node.label}` : node.label;
  }

  const quotes = {
    string: '"',
    shell: "`",
  };

  if (quotes[node.type]) {
    return quotes[node.type];
  }

  /* c8 ignore next */
  throw new Error(`Unimplemented encapsed type ${node.type}`);
}

function printArrayItems(path, options, print) {
  const printedElements = [];
  let separatorParts = [];

  path.each(({ node }) => {
    printedElements.push(separatorParts);
    printedElements.push(group(print()));

    separatorParts = [",", line];

    if (node && isNextLineEmpty(options.originalText, locEnd(node))) {
      separatorParts.push(softline);
    }
  }, "items");

  return printedElements;
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
    const printedPartsForGrouping = [
      before || "",
      ...parts.slice(start, end),
      after || "",
    ];
    const newArray = accumulator.concat(
      parts.slice(lastEnd, start),
      alignment
        ? dedentToRoot(
            group(
              align(new Array(alignment).join(" "), printedPartsForGrouping)
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
  const { node, parent: parentNode } = path;

  let lastInlineIndex = -1;

  const parts = [];
  const groupIndexes = [];

  path.map(() => {
    const {
      node: childNode,
      next: nextNode,
      isFirst: isFirstNode,
      isLast: isLastNode,
      index,
    } = path;

    const isInlineNode = childNode.kind === "inline";
    const printedPath = print();
    const canPrintBlankLine =
      !isLastNode &&
      !isInlineNode &&
      (nextNode && nextNode.kind === "case"
        ? !isFirstChildrenInlineNode(path)
        : nextNode && nextNode.kind !== "inline");

    let printed = [
      printedPath,
      canPrintBlankLine ? hardline : "",
      canPrintBlankLine &&
      isNextLineEmpty(options.originalText, locEnd(childNode))
        ? hardline
        : "",
    ];

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
          path.siblings[isInlineNode ? prevLastInlineIndex : lastInlineIndex];
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
          ? [
              isFirstNode && node.kind !== "namespace" && !isBlockNestedNode
                ? "<?php"
                : "",
              node.kind === "namespace" || !isBlockNestedNode ? hardline : "",
              printComments(childNode.leadingComments, options),
              hardline,
              "?>",
            ]
          : isProgramLikeNode(node) && isFirstNode && node.kind !== "namespace"
          ? ""
          : [beforeCloseTagInlineNode, "?>"];

      //FIXME getNode is used to get ancestors, but it seems this means to get next sibling?
      const nextV = path.getNode(index + 1);
      const skipLastComment = nextV && nextV.children && nextV.children.length;

      const afterInline =
        childNode.comments && childNode.comments.length
          ? [
              openTag,
              hardline,
              skipLastComment ? printComments(childNode.comments, options) : "",
              hardline,
            ]
          : isProgramLikeNode(node) && isLastNode
          ? ""
          : [openTag, " "];

      printed = [beforeInline, printed, afterInline];
    }

    parts.push(printed);
  }, childrenAttribute);

  const wrappedParts = wrapPartsIntoGroups(parts, groupIndexes);

  if (node.kind === "program" && !node.extra.parseAsEval) {
    const parts = [];

    const [firstNode] = node.children;
    const hasStartTag = !firstNode || firstNode.kind !== "inline";

    if (hasStartTag) {
      const between = options.originalText.trim().match(/^<\?(php|=)(\s+)?\S/);
      const afterOpenTag = [
        between && between[2] && between[2].includes("\n")
          ? [hardline, between[2].split("\n").length > 2 ? hardline : ""]
          : " ",
        node.comments ? printComments(node.comments, options) : "",
      ];

      const shortEcho =
        firstNode && firstNode.kind === "echo" && firstNode.shortForm;
      parts.push([shortEcho ? "<?=" : "<?php", afterOpenTag]);
    }

    parts.push(wrappedParts);

    const hasEndTag = /\?>\n?$/.test(options.originalText);

    if (hasEndTag) {
      const lastNode = getLast(node.children);
      const beforeCloseTag = lastNode
        ? [
            hasNewlineInRange(
              options.originalText.trimEnd(),
              locEnd(lastNode),
              locEnd(node)
            )
              ? !(
                  lastNode.kind === "inline" &&
                  lastNode.comments &&
                  lastNode.comments.length
                )
                ? hardline
                : ""
              : " ",
            isNextLineEmpty(options.originalText, locEnd(lastNode))
              ? hardline
              : "",
          ]
        : node.comments
        ? hardline
        : "";

      parts.push(lineSuffix([beforeCloseTag, "?>"]));
    }

    return parts;
  }

  return wrappedParts;
}

function printStatements(path, options, print, childrenAttribute) {
  return path.map(({ node, isLast }) => {
    const parts = [];

    parts.push(print());

    if (!isLast) {
      parts.push(hardline);

      if (isNextLineEmpty(options.originalText, locEnd(node))) {
        parts.push(hardline);
      }
    }

    return parts;
  }, childrenAttribute);
}

function printClassPart(
  path,
  options,
  print,
  part = "extends",
  beforePart = " ",
  afterPart = " "
) {
  const value = path.node[part];
  const printedBeforePart = hasDanglingComments(value)
    ? [
        hardline,
        path.call(() => printDanglingComments(path, options, true), part),
        hardline,
      ]
    : beforePart;
  const printedPartItems = Array.isArray(value)
    ? group(
        join(
          ",",
          path.map(({ node }) => {
            const printedPart = print();
            // Check if any of the implements nodes have comments
            return hasDanglingComments(node)
              ? [
                  hardline,
                  printDanglingComments(path, options, true),
                  hardline,
                  printedPart,
                ]
              : [afterPart, printedPart];
          }, part)
        )
      )
    : [afterPart, print(part)];

  return indent([
    printedBeforePart,
    part,
    willBreak(printedBeforePart) ? indent(printedPartItems) : printedPartItems,
  ]);
}

function printAttrs(path, options, print, { inline = false } = {}) {
  const allAttrs = [];
  if (!path.node.attrGroups) {
    return [];
  }
  path.each(() => {
    const attrGroup = ["#["];
    if (!inline && allAttrs.length > 0) {
      allAttrs.push(hardline);
    }
    attrGroup.push(softline);
    path.each(() => {
      const attrNode = path.node;
      if (attrGroup.length > 2) {
        attrGroup.push(",", line);
      }
      const attrStmt = [attrNode.name];
      if (attrNode.args.length > 0) {
        attrStmt.push(printArgumentsList(path, options, print, "args"));
      }
      attrGroup.push(group(attrStmt));
    }, "attrs");
    allAttrs.push(
      group([
        indent(attrGroup),
        ifBreak(shouldPrintComma(options, "8.0") ? "," : ""),
        softline,
        "]",
        inline ? ifBreak(softline, " ") : "",
      ])
    );
  }, "attrGroups");
  if (allAttrs.length === 0) {
    return [];
  }
  return [...allAttrs, inline ? "" : hardline];
}

function printClass(path, options, print) {
  const { node } = path;
  const isAnonymousClass = node.kind === "class" && node.isAnonymous;
  const attrs = printAttrs(path, options, print, { inline: isAnonymousClass });
  const declaration = isAnonymousClass ? [] : [...attrs];

  if (node.isFinal) {
    declaration.push("final ");
  }

  if (node.isAbstract) {
    declaration.push("abstract ");
  }

  if (node.isReadonly) {
    declaration.push("readonly ");
  }

  // `new` print `class` keyword with arguments
  declaration.push(isAnonymousClass ? "" : node.kind);

  if (node.name) {
    declaration.push(" ", print("name"));
  }

  if (node.kind === "enum" && node.valueType) {
    declaration.push(": ", print("valueType"));
  }

  // Only `class` can have `extends` and `implements`
  if (node.extends && node.implements) {
    declaration.push(
      conditionalGroup(
        [
          [
            printClassPart(path, options, print, "extends"),
            printClassPart(path, options, print, "implements"),
          ],
          [
            printClassPart(path, options, print, "extends"),
            printClassPart(path, options, print, "implements", " ", hardline),
          ],
          [
            printClassPart(path, options, print, "extends", hardline, " "),
            printClassPart(
              path,
              options,
              print,
              "implements",
              hardline,
              node.implements.length > 1 ? hardline : " "
            ),
          ],
        ],
        {
          shouldBreak: hasDanglingComments(node.extends),
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
          ),
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
          ),
        ])
      );
    }
  }

  const printedDeclaration = group([
    group(declaration),
    shouldPrintHardlineForOpenBrace(options)
      ? isAnonymousClass
        ? line
        : hardline
      : " ",
  ]);

  const hasEmptyClassBody =
    node.body && node.body.length === 0 && !hasDanglingComments(node);
  const printedBody = [
    "{",
    indent([
      hasEmptyClassBody ? "" : hardline,
      printStatements(path, options, print, "body"),
    ]),
    printDanglingComments(path, options, true),
    isAnonymousClass && hasEmptyClassBody ? softline : hardline,
    "}",
  ];

  return [printedDeclaration, printedBody];
}

function printFunction(path, options, print) {
  const { node } = path;
  const declAttrs = printAttrs(path, options, print, {
    inline: node.kind === "closure",
  });
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
    declaration.push(print("name"));
  }

  declaration.push(printArgumentsList(path, options, print));

  if (node.uses && node.uses.length > 0) {
    declaration.push(
      group([" use ", printArgumentsList(path, options, print, "uses")])
    );
  }

  if (node.type) {
    declaration.push([
      ": ",
      hasDanglingComments(node.type)
        ? [
            path.call(() => printDanglingComments(path, options, true), "type"),
            " ",
          ]
        : "",
      node.nullable ? "?" : "",
      print("type"),
    ]);
  }

  const printedDeclaration = declaration;

  if (!node.body) {
    return [...declAttrs, printedDeclaration];
  }

  const isClosure = node.kind === "closure";
  const printedBody = [
    "{",
    indent([hasEmptyBody(path) ? "" : hardline, print("body")]),
    isClosure && hasEmptyBody(path) ? "" : hardline,
    "}",
  ];

  if (isClosure) {
    return [...declAttrs, printedDeclaration, " ", printedBody];
  }

  if (node.arguments.length === 0) {
    return [
      ...declAttrs,
      printedDeclaration,
      shouldPrintHardlineForOpenBrace(options) ? hardline : " ",
      printedBody,
    ];
  }

  const willBreakDeclaration = declaration.some(willBreak);

  if (willBreakDeclaration) {
    return [printedDeclaration, " ", printedBody];
  }

  return [
    ...declAttrs,
    conditionalGroup([
      [
        printedDeclaration,
        shouldPrintHardlineForOpenBrace(options) ? hardline : " ",
        printedBody,
      ],
      [printedDeclaration, " ", printedBody],
    ]),
  ];
}

function printBodyControlStructure(
  path,
  options,
  print,
  bodyProperty = "body"
) {
  const { node } = path;

  if (!node[bodyProperty]) {
    return ";";
  }

  const printedBody = print(bodyProperty);

  return [
    node.shortForm ? ":" : " {",
    indent(
      node[bodyProperty].kind !== "block" ||
        (node[bodyProperty].children &&
          node[bodyProperty].children.length > 0) ||
        (node[bodyProperty].comments && node[bodyProperty].comments.length > 0)
        ? [
            shouldPrintHardLineAfterStartInControlStructure(path)
              ? node.kind === "switch"
                ? " "
                : ""
              : hardline,
            printedBody,
          ]
        : ""
    ),
    node.kind === "if" && bodyProperty === "body"
      ? ""
      : [
          shouldPrintHardLineBeforeEndInControlStructure(path) ? hardline : "",
          node.shortForm ? ["end", node.kind, ";"] : "}",
        ],
  ];
}

function printAssignment(
  leftNode,
  printedLeft,
  operator,
  rightNode,
  printedRight,
  hasRef,
  options
) {
  if (!rightNode) {
    return printedLeft;
  }

  const printed = printAssignmentRight(
    leftNode,
    rightNode,
    printedRight,
    hasRef,
    options
  );

  return group([printedLeft, operator, printed]);
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

function printAssignmentRight(
  leftNode,
  rightNode,
  printedRight,
  hasRef,
  options
) {
  const ref = hasRef ? "&" : "";

  if (hasLeadingOwnLineComment(options.originalText, rightNode)) {
    return indent([hardline, ref, printedRight]);
  }

  const pureRightNode = rightNode.kind === "cast" ? rightNode.expr : rightNode;

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
    return group(indent([line, ref, printedRight]));
  }

  return [" ", ref, printedRight];
}

function needsHardlineAfterDanglingComment(node) {
  if (!node.comments) {
    return false;
  }

  const lastDanglingComment = getLast(
    node.comments.filter((comment) => !comment.leading && !comment.trailing)
  );

  return lastDanglingComment && !isBlockComment(lastDanglingComment);
}

function stringHasNewLines(node) {
  return node.raw.includes("\n");
}

function isStringOnItsOwnLine(node, text) {
  return (
    (node.kind === "string" ||
      (node.kind === "encapsed" &&
        (node.type === "string" || node.type === "shell"))) &&
    stringHasNewLines(node) &&
    !hasNewline(text, locStart(node), { backwards: true })
  );
}

function printComposedTypes(path, print, glue) {
  return group(
    path.map(({ isFirst }) => (isFirst ? [print()] : [glue, print()]), "types")
  );
}

function printNode(path, options, print) {
  const { node } = path;

  switch (node.kind) {
    case "program": {
      return group([
        printLines(path, options, print),
        printDanglingComments(
          path,
          options,
          /* sameIndent */ true,
          (c) => !c.printed
        ),
      ]);
    }
    case "expressionstatement":
      return print("expression");
    case "block":
      return [
        printLines(path, options, print),
        printDanglingComments(path, options, true),
      ];
    case "declare": {
      const printDeclareArguments = (path) => {
        return join(", ", path.map(print, "directives"));
      };

      if (["block", "short"].includes(node.mode)) {
        return [
          "declare(",
          printDeclareArguments(path),
          ")",
          node.mode === "block" ? " {" : ":",
          node.children.length > 0
            ? indent([hardline, printLines(path, options, print)])
            : "",
          printDanglingComments(path, options),
          hardline,
          node.mode === "block" ? "}" : "enddeclare;",
        ];
      }

      return [
        "declare(",
        printDeclareArguments(path),
        ")",
        path.next?.kind === "inline" ? "" : ";",
      ];
    }
    case "declaredirective":
      return [print("key"), "=", print("value")];
    case "namespace":
      return [
        "namespace ",
        node.name && typeof node.name === "string"
          ? [node.name, node.withBrackets ? " " : ""]
          : "",
        node.withBrackets ? "{" : ";",
        hasDanglingComments(node)
          ? [" ", printDanglingComments(path, options, true)]
          : "",
        node.children.length > 0
          ? node.withBrackets
            ? indent([hardline, printLines(path, options, print)])
            : [
                node.children[0].kind === "inline"
                  ? ""
                  : [
                      hardline,
                      isNextLineEmptyAfterNamespace(options.originalText, node)
                        ? hardline
                        : "",
                    ],
                printLines(path, options, print),
              ]
          : "",
        node.withBrackets ? [hardline, "}"] : "",
      ];
    case "usegroup":
      return group([
        "use ",
        node.type ? [node.type, " "] : "",
        indent([
          node.name
            ? [maybeStripLeadingSlashFromUse(node.name), "\\{", softline]
            : "",
          join([",", line], path.map(print, "items")),
        ]),
        node.name
          ? [
              ifBreak(shouldPrintComma(options, "7.2") ? "," : ""),
              softline,
              "}",
            ]
          : "",
      ]);
    case "useitem":
      return [
        node.type ? [node.type, " "] : "",
        maybeStripLeadingSlashFromUse(node.name),
        hasDanglingComments(node)
          ? [" ", printDanglingComments(path, options, true)]
          : "",
        node.alias ? [" as ", print("alias")] : "",
      ];
    case "class":
    case "enum":
    case "interface":
    case "trait":
      return printClass(path, options, print);
    case "traitprecedence":
      return [
        print("trait"),
        "::",
        print("method"),
        " insteadof ",
        join(", ", path.map(print, "instead")),
      ];
    case "traitalias":
      return [
        node.trait ? [print("trait"), "::"] : "",
        node.method ? print("method") : "",
        " as ",
        join(" ", [
          ...(node.visibility ? [node.visibility] : []),
          ...(node.as ? [print("as")] : []),
        ]),
      ];
    case "traituse":
      return group([
        "use ",
        indent(group(join([",", line], path.map(print, "traits")))),
        node.adaptations
          ? [
              " {",
              node.adaptations.length > 0
                ? [
                    indent([
                      hardline,
                      printStatements(path, options, print, "adaptations"),
                    ]),
                    hardline,
                  ]
                : hasDanglingComments(node)
                ? [line, printDanglingComments(path, options, true), line]
                : "",
              "}",
            ]
          : "",
      ]);
    case "function":
    case "closure":
    case "method":
      return printFunction(path, options, print);
    case "arrowfunc":
      return [
        node.parenthesizedExpression ? "(" : "",
        ...printAttrs(path, options, print, { inline: true }),
        node.isStatic ? "static " : "",
        "fn",
        printArgumentsList(path, options, print),
        node.type ? [": ", node.nullable ? "?" : "", print("type")] : "",
        " => ",
        print("body"),
        node.parenthesizedExpression ? ")" : "",
      ];
    case "parameter": {
      let promoted = "";
      if (node.flags === 1) {
        promoted = "public ";
      } else if (node.flags === 2) {
        promoted = "protected ";
      } else if (node.flags === 4) {
        promoted = "private ";
      }
      const name = [
        ...printAttrs(path, options, print, { inline: true }),
        promoted,
        node.readonly ? "readonly " : "",
        node.nullable ? "?" : "",
        node.type ? [print("type"), " "] : "",
        node.byref ? "&" : "",
        node.variadic ? "..." : "",
        "$",
        print("name"),
      ];

      if (node.value) {
        return group([
          name,
          // see handleFunctionParameter() in ./comments.mjs - since there's
          // no node to attach comments that fall in between the parameter name
          // and value, we store them as dangling comments
          hasDanglingComments(node) ? " " : "",
          printDanglingComments(path, options, true),
          " =",
          printAssignmentRight(
            node.name,
            node.value,
            print("value"),
            false,
            options
          ),
        ]);
      }

      return name;
    }
    case "variadic":
      return ["...", print("what")];
    case "property":
      return group([
        node.readonly ? "readonly " : "",
        node.type ? [node.nullable ? "?" : "", print("type"), " "] : "",
        "$",
        print("name"),
        node.value
          ? [
              " =",
              printAssignmentRight(
                node.name,
                node.value,
                print("value"),
                false,
                options
              ),
            ]
          : "",
      ]);
    case "propertystatement": {
      const attrs = [];
      path.each(() => {
        attrs.push(...printAttrs(path, options, print));
      }, "properties");
      const printed = path.map(print, "properties");

      const hasValue = node.properties.some((property) => property.value);

      let firstProperty;

      if (printed.length === 1 && !node.properties[0].comments) {
        [firstProperty] = printed;
      } else if (printed.length > 0) {
        // Indent first property
        firstProperty = indent(printed[0]);
      }

      const hasVisibility = node.visibility || node.visibility === null;

      return group([
        ...attrs,
        hasVisibility
          ? [node.visibility === null ? "var" : node.visibility, ""]
          : "",
        node.isStatic ? [hasVisibility ? " " : "", "static"] : "",
        firstProperty ? [" ", firstProperty] : "",
        indent(
          printed.slice(1).map((p) => [",", hasValue ? hardline : line, p])
        ),
      ]);
    }
    case "if": {
      const parts = [];
      const body = printBodyControlStructure(path, options, print, "body");
      const opening = group([
        "if (",
        group([indent([softline, print("test")]), softline]),
        ")",
        body,
      ]);

      parts.push(
        opening,
        isFirstChildrenInlineNode(path) || !node.body ? "" : hardline
      );

      if (node.alternate) {
        parts.push(node.shortForm ? "" : "} ");

        const commentOnOwnLine =
          (hasTrailingComment(node.body) &&
            node.body.comments.some(
              (comment) => comment.trailing && !isBlockComment(comment)
            )) ||
          needsHardlineAfterDanglingComment(node);
        const elseOnSameLine = !commentOnOwnLine;
        parts.push(elseOnSameLine ? "" : hardline);

        if (hasDanglingComments(node)) {
          parts.push(
            isNextLineEmpty(options.originalText, locEnd(node.body))
              ? hardline
              : "",
            printDanglingComments(path, options, true),
            commentOnOwnLine ? hardline : " "
          );
        }

        parts.push(
          "else",
          group(
            node.alternate.kind === "if"
              ? print("alternate")
              : printBodyControlStructure(path, options, print, "alternate")
          )
        );
      } else {
        parts.push(node.body ? (node.shortForm ? "endif;" : "}") : "");
      }

      return parts;
    }
    case "do":
      return [
        "do",
        printBodyControlStructure(path, options, print, "body"),
        " while (",
        group([indent([softline, print("test")]), softline]),
        ")",
      ];
    case "while":
    case "switch":
      return group([
        node.kind,
        " (",
        group([indent([softline, print("test")]), softline]),
        ")",
        printBodyControlStructure(path, options, print, "body"),
      ]);
    case "for": {
      const body = printBodyControlStructure(path, options, print, "body");

      // We want to keep dangling comments above the loop to stay consistent.
      // Any comment positioned between the for statement and the parentheses
      // is going to be printed before the statement.
      const dangling = printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? [dangling, softline] : "";

      if (!node.init.length && !node.test.length && !node.increment.length) {
        return [printedComments, group(["for (;;)", body])];
      }

      return [
        printedComments,
        group([
          "for (",
          group([
            indent([
              softline,
              group(join([",", line], path.map(print, "init"))),
              ";",
              line,
              group(join([",", line], path.map(print, "test"))),
              ";",
              line,
              group(join([",", line], path.map(print, "increment"))),
            ]),
            softline,
          ]),
          ")",
          body,
        ]),
      ];
    }
    case "foreach": {
      const body = printBodyControlStructure(path, options, print, "body");

      // We want to keep dangling comments above the loop to stay consistent.
      // Any comment positioned between the for statement and the parentheses
      // is going to be printed before the statement.
      const dangling = printDanglingComments(
        path,
        options,
        /* sameLine */ true
      );
      const printedComments = dangling ? [dangling, softline] : "";

      return [
        printedComments,
        group([
          "foreach (",
          group([
            indent([
              softline,
              print("source"),
              line,
              "as ",
              group(
                node.key
                  ? indent(join([" =>", line], [print("key"), print("value")]))
                  : print("value")
              ),
            ]),
            softline,
          ]),
          ")",
          body,
        ]),
      ];
    }
    case "try": {
      const parts = [];

      parts.push(
        "try",
        printBodyControlStructure(path, options, print, "body")
      );

      if (node.catches) {
        parts.push(path.map(print, "catches"));
      }

      if (node.always) {
        parts.push(
          " finally",
          printBodyControlStructure(path, options, print, "always")
        );
      }

      return parts;
    }
    case "catch": {
      return [
        " catch",
        node.what
          ? [
              " (",
              join(" | ", path.map(print, "what")),
              node.variable ? [" ", print("variable")] : "",
              ")",
            ]
          : "",
        printBodyControlStructure(path, options, print, "body"),
      ];
    }
    case "case":
      return [
        node.test
          ? [
              "case ",
              node.test.comments ? indent(print("test")) : print("test"),
              ":",
            ]
          : "default:",
        node.body
          ? node.body.children && node.body.children.length
            ? indent([
                isFirstChildrenInlineNode(path) ? "" : hardline,
                print("body"),
              ])
            : ""
          : "",
      ];
    case "break":
    case "continue":
      if (node.level) {
        if (node.level.kind === "number" && node.level.value !== "1") {
          return [`${node.kind} `, print("level")];
        }

        return node.kind;
      }

      return node.kind;
    case "call": {
      // Multiline strings as single arguments
      if (
        node.arguments.length === 1 &&
        isStringOnItsOwnLine(node.arguments[0], options.originalText)
      ) {
        return [
          print("what"),
          "(",
          join(", ", path.map(print, "arguments")),
          ")",
        ];
      }

      // chain: Call (*LookupNode (Call (*LookupNode (...))))
      if (isLookupNode(node.what)) {
        return printMemberChain(path, options, print);
      }

      return [print("what"), printArgumentsList(path, options, print)];
    }
    case "new": {
      const isAnonymousClassNode =
        node.what && node.what.kind === "class" && node.what.isAnonymous;

      // Multiline strings as single arguments
      if (
        !isAnonymousClassNode &&
        node.arguments.length === 1 &&
        isStringOnItsOwnLine(node.arguments[0], options.originalText)
      ) {
        return [
          "new ",
          ...path.call(printAttrs, "what"),
          print("what"),
          "(",
          join(", ", path.map(print, "arguments")),
          ")",
        ];
      }

      const parts = [];

      parts.push("new ");

      if (isAnonymousClassNode) {
        parts.push(
          node.what.leadingComments &&
            node.what.leadingComments[0].kind === "commentblock"
            ? [printComments(node.what.leadingComments, options), " "]
            : "",
          ...path.call(
            () => printAttrs(path, options, print, { inline: true }),
            "what"
          ),
          "class",
          node.arguments.length > 0
            ? [" ", printArgumentsList(path, options, print)]
            : "",
          group(print("what"))
        );
      } else {
        const isExpression = ["call", "offsetlookup"].includes(node.what.kind);
        const printed = [
          isExpression ? "(" : "",
          print("what"),
          isExpression ? ")" : "",
          printArgumentsList(path, options, print),
        ];

        parts.push(hasLeadingComment(node.what) ? indent(printed) : printed);
      }

      return parts;
    }
    case "clone":
      return [
        "clone ",
        node.what.comments ? indent(print("what")) : print("what"),
      ];
    case "propertylookup":
    case "nullsafepropertylookup":
    case "staticlookup":
    case "offsetlookup": {
      const { parent } = path;

      // TODO: Use `AstPath.findAncestor` when it's stable
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
          ["identifier", "variable", "encapsedpart"].includes(
            node.offset.kind
          ) &&
          parent &&
          !isLookupNode(parent));

      return [
        print("what"),
        shouldInline
          ? printLookupNodes(path, options, print)
          : group(indent([softline, printLookupNodes(path, options, print)])),
      ];
    }
    case "exit":
      return group([
        node.useDie ? "die" : "exit",
        "(",
        node.expression
          ? isStringOnItsOwnLine(node.expression, options.originalText)
            ? print("expression")
            : [indent([softline, print("expression")]), softline]
          : printDanglingComments(path, options),
        ")",
      ]);
    case "global":
      return group([
        "global ",
        indent(join([",", line], path.map(print, "items"))),
      ]);
    case "include":
      return [
        node.require ? "require" : "include",
        node.once ? "_once" : "",
        " ",
        node.target.comments ? indent(print("target")) : print("target"),
      ];
    case "label":
      return [print("name"), ":"];
    case "goto":
      return ["goto ", print("label")];
    case "throw":
      return [
        "throw ",
        node.what.comments ? indent(print("what")) : print("what"),
      ];
    case "silent":
      return ["@", print("expr")];
    case "halt":
      return [
        hasDanglingComments(node)
          ? [
              printDanglingComments(path, options, /* sameIndent */ true),
              hardline,
            ]
          : "",
        "__halt_compiler();",
        node.after,
      ];
    case "eval":
      return group([
        "eval(",
        isStringOnItsOwnLine(node.source, options.originalText)
          ? print("source")
          : [indent([softline, print("source")]), softline],
        ")",
      ]);
    case "echo": {
      const printedArguments = path.map(print, "expressions");

      let firstVariable;

      if (printedArguments.length === 1 && !node.expressions[0].comments) {
        [firstVariable] = printedArguments;
      } else if (printedArguments.length > 0) {
        firstVariable =
          isDocNode(node.expressions[0]) || node.expressions[0].comments
            ? indent(printedArguments[0])
            : dedent(printedArguments[0]);
      }

      return group([
        node.shortForm ? "" : "echo ",
        firstVariable ? firstVariable : "",
        indent(printedArguments.slice(1).map((p) => [",", line, p])),
      ]);
    }
    case "print": {
      return [
        "print ",
        node.expression.comments
          ? indent(print("expression"))
          : print("expression"),
      ];
    }
    case "return": {
      const parts = [];

      parts.push("return");

      if (node.expr) {
        const printedExpr = print("expr");

        parts.push(" ", node.expr.comments ? indent(printedExpr) : printedExpr);
      }

      if (hasDanglingComments(node)) {
        parts.push(
          " ",
          printDanglingComments(path, options, /* sameIndent */ true)
        );
      }

      return parts;
    }
    case "isset":
    case "unset":
      return group([
        node.kind,
        printArgumentsList(path, options, print, "variables"),
      ]);
    case "empty":
      return group([
        "empty(",
        indent([softline, print("expression")]),
        softline,
        ")",
      ]);
    case "variable": {
      const { parent, grandparent: parentParent } = path;
      const ampersand = parent.kind === "assign" ? "" : node.byref ? "&" : "";
      const dollar =
        (parent.kind === "encapsedpart" &&
          parent.syntax === "simple" &&
          parent.curly) ||
        (parentParent &&
          parent.kind === "offsetlookup" &&
          parentParent.kind === "encapsedpart" &&
          parentParent.syntax === "simple" &&
          parentParent.curly)
          ? ""
          : "$";
      const openCurly = node.curly ? "{" : "";
      const closeCurly = node.curly ? "}" : "";

      return [ampersand, dollar, openCurly, print("name"), closeCurly];
    }
    case "constantstatement":
    case "classconstant": {
      const attrs = printAttrs(path, options, print);
      const printed = path.map(print, "constants");

      let firstVariable;

      if (printed.length === 1 && !node.constants[0].comments) {
        [firstVariable] = printed;
      } else if (printed.length > 0) {
        // Indent first item
        firstVariable = indent(printed[0]);
      }

      return group([
        ...attrs,
        node.final ? "final " : "",
        node.visibility ? [node.visibility, " "] : "",
        "const",
        firstVariable ? [" ", firstVariable] : "",
        indent(printed.slice(1).map((p) => [",", hardline, p])),
      ]);
    }
    case "constant":
      return printAssignment(
        node.name,
        print("name"),
        " =",
        node.value,
        print("value"),
        false,
        options
      );
    case "static": {
      const printed = path.map(print, "variables");

      const hasValue = node.variables.some((item) => item.defaultValue);

      let firstVariable;

      if (printed.length === 1 && !node.variables[0].comments) {
        [firstVariable] = printed;
      } else if (printed.length > 0) {
        // Indent first item
        firstVariable = indent(printed[0]);
      }

      return group([
        "static",
        firstVariable ? [" ", firstVariable] : "",
        indent(
          printed.slice(1).map((p) => [",", hasValue ? hardline : line, p])
        ),
      ]);
    }
    case "staticvariable": {
      return printAssignment(
        node.variable,
        print("variable"),
        " =",
        node.defaultValue,
        print("defaultValue"),
        false,
        options
      );
    }
    case "list":
    case "array": {
      const useShortForm =
        (node.kind === "array" && isMinVersion(options.phpVersion, "5.4")) ||
        (node.kind === "list" &&
          (node.shortForm || isMinVersion(options.phpVersion, "7.1")));
      const open = useShortForm ? "[" : [node.kind, "("];
      const close = useShortForm ? "]" : ")";

      if (node.items.length === 0) {
        if (!hasDanglingComments(node)) {
          return [open, close];
        }

        return group([
          open,
          printDanglingComments(path, options),
          softline,
          close,
        ]);
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
      const needsForcedTrailingComma = lastElem && lastElem.kind === "noop";

      const [firstProperty] = node.items
        .filter((node) => node.kind !== "noop")
        .sort((a, b) => locStart(a) - locStart(b));
      const isAssociative = !!(firstProperty && firstProperty.key);
      const shouldBreak =
        isAssociative &&
        firstProperty &&
        hasNewlineInRange(
          options.originalText,
          locStart(node),
          locStart(firstProperty)
        );

      return group(
        [
          open,
          indent([softline, printArrayItems(path, options, print)]),
          needsForcedTrailingComma ? "," : "",
          ifBreak(
            !needsForcedTrailingComma && shouldPrintComma(options, "5.0")
              ? [
                  lastElem && shouldPrintHardlineBeforeTrailingComma(lastElem)
                    ? hardline
                    : "",
                  ",",
                ]
              : ""
          ),
          printDanglingComments(path, options, true),
          softline,
          close,
        ],
        { shouldBreak }
      );
    }
    case "entry": {
      const ref = node.byRef ? "&" : "";
      const unpack = node.unpack ? "..." : "";
      return node.key
        ? printAssignment(
            node.key,
            print("key"),
            " =>",
            node.value,
            print("value"),
            ref,
            options
          )
        : [ref, unpack, print("value")];
    }
    case "yield": {
      const printedKeyAndValue = [
        node.key ? [print("key"), " => "] : "",
        print("value"),
      ];

      return [
        "yield",
        node.key || node.value ? " " : "",
        node.value && node.value.comments
          ? indent(printedKeyAndValue)
          : printedKeyAndValue,
      ];
    }
    case "yieldfrom":
      return [
        "yield from ",
        node.value.comments ? indent(print("value")) : print("value"),
      ];
    case "unary":
      return [node.type, print("what")];
    case "pre":
      return [node.type + node.type, print("what")];
    case "post":
      return [print("what"), node.type + node.type];
    case "cast":
      return [
        "(",
        node.type,
        ") ",
        node.expr.comments ? indent(print("expr")) : print("expr"),
      ];
    case "assignref":
    case "assign": {
      const hasRef = node.kind === "assignref";

      return printAssignment(
        node.left,
        print("left"),
        [" ", hasRef ? "=" : node.operator],
        node.right,
        print("right"),
        hasRef,
        options
      );
    }
    case "bin": {
      const { parent, grandparent: parentParent } = path;
      const isInsideParenthesis =
        node !== parent.body &&
        (parent.kind === "if" ||
          parent.kind === "while" ||
          parent.kind === "switch" ||
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
        return parts;
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
        return group([indent([softline, ...parts]), softline]);
      }

      // Avoid indenting sub-expressions in some cases where the first sub-expression is already
      // indented accordingly. We should indent sub-expressions where the first case isn't indented.
      const shouldNotIndent =
        (node !== parent.body && parent.kind === "for") ||
        (parent.kind === "retif" &&
          parentParent &&
          parentParent.kind !== "return");

      const shouldIndentIfInlining = [
        "assign",
        "property",
        "constant",
        "staticvariable",
        "entry",
      ].includes(parent.kind);

      const samePrecedenceSubExpression =
        node.left.kind === "bin" && shouldFlatten(node.type, node.left.type);

      if (
        shouldNotIndent ||
        (shouldInlineLogicalExpression(node) && !samePrecedenceSubExpression) ||
        (!shouldInlineLogicalExpression(node) && shouldIndentIfInlining)
      ) {
        return group(parts);
      }

      const rest = parts.slice(1);

      return group([
        // Don't include the initial expression in the indentation
        // level. The first item is guaranteed to be the first
        // left-most expression.
        parts.length > 0 ? parts[0] : "",
        indent(rest),
      ]);
    }
    case "retif": {
      const parts = [];
      const { parent } = path;

      // TODO: Use `AstPath.findAncestor` when it's stable
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
          ? indent(print("falseExpr"))
          : print("falseExpr");
      const part = [
        node.trueExpr ? line : " ",
        "?",
        node.trueExpr
          ? [
              " ",
              node.trueExpr.kind === "bin"
                ? indent(print("trueExpr"))
                : print("trueExpr"),
              line,
            ]
          : "",
        ":",
        node.trueExpr
          ? [" ", printedFalseExpr]
          : [
              shouldInlineRetifFalseExpression(node.falseExpr) ? " " : line,
              printedFalseExpr,
            ],
      ];

      parts.push(part);

      // We want a whole chain of retif to all break if any of them break.
      const maybeGroup = (doc) =>
        parent === firstNonRetifParent ? group(doc) : doc;

      // Break the closing parens to keep the chain right after it:
      // ($a
      //   ? $b
      //   : $c
      // )->call()
      const parentParent = path.grandparent;
      const pureParent =
        parent.kind === "cast" && parentParent ? parentParent : parent;
      const breakLookupNodes = [
        "propertylookup",
        "nullsafepropertylookup",
        "staticlookup",
      ];
      const breakClosingParens = breakLookupNodes.includes(pureParent.kind);

      const printedTest = print("test");

      if (!node.trueExpr) {
        const printed = [
          printedTest,
          pureParent.kind === "bin" ||
          ["print", "echo", "return", "include"].includes(
            firstNonRetifParent.kind
          )
            ? indent(parts)
            : parts,
        ];

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
          return group([indent([softline, printed]), softline]);
        }

        return maybeGroup(printed);
      }

      return maybeGroup([
        node.test.kind === "retif" ? indent(printedTest) : printedTest,
        indent(parts),
        breakClosingParens ? softline : "",
      ]);
    }
    case "boolean":
      return node.value ? "true" : "false";
    case "number":
      return printNumber(node.value);
    case "string": {
      const { parent } = path;

      if (parent.kind === "encapsedpart") {
        const parentParent = path.grandparent;
        let closingTagIndentation = 0;
        const flexible = isMinVersion(options.phpVersion, "7.3");
        let linebreak = literalline;
        if (parentParent.type === "heredoc") {
          linebreak = flexible ? hardline : literalline;
          const lines = parentParent.raw.split("\n");
          closingTagIndentation = lines[lines.length - 1].search(/\S/);
          if (closingTagIndentation === -1) {
            closingTagIndentation = lines[lines.length - 2].search(/\S/);
          }
        }
        return join(
          linebreak,
          node.raw
            .split("\n")
            .map((s, i) =>
              i > 0 || node.loc.start.column === 0
                ? s.substring(closingTagIndentation)
                : s
            )
        );
      }

      const quote = useDoubleQuote(node, options) ? '"' : "'";

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

      return [
        node.raw[0] === "b" ? "b" : "",
        quote,
        join(literalline, stringValue.split("\n")),
        quote,
      ];
    }
    case "intersectiontype": {
      return printComposedTypes(path, print, "&");
    }
    case "uniontype": {
      return printComposedTypes(path, print, "|");
    }
    case "encapsedpart": {
      const open =
        (node.syntax === "simple" && node.curly) || node.syntax === "complex"
          ? [node.curly ? "$" : "", "{"]
          : "";
      const close =
        (node.syntax === "simple" && node.curly) || node.syntax === "complex"
          ? "}"
          : "";

      return [open, print("expression"), close];
    }
    case "encapsed":
      switch (node.type) {
        case "string":
        case "shell":
        case "heredoc": {
          const flexible = isMinVersion(options.phpVersion, "7.3");
          const linebreak = flexible ? hardline : literalline;
          return [
            getEncapsedQuotes(node),
            // Respect `indent` for `heredoc` nodes
            node.type === "heredoc" ? linebreak : "",
            ...path.map(print, "value"),
            getEncapsedQuotes(node, { opening: false }),
            node.type === "heredoc" && docShouldHaveTrailingNewline(path)
              ? hardline
              : "",
          ];
        }
        /* c8 ignore next 2 */
        default:
          throw new Error(`Have not implemented kind ${node.type} yet.`);
      }
    case "inline":
      return join(
        literalline,
        node.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split("\n")
      );
    case "magic":
      return node.value;
    case "nowdoc": {
      const flexible = isMinVersion(options.phpVersion, "7.3");
      const linebreak = flexible ? hardline : literalline;
      return [
        "<<<'",
        node.label,
        "'",
        linebreak,
        join(linebreak, node.value.split("\n")),
        linebreak,
        node.label,
        docShouldHaveTrailingNewline(path) ? hardline : "",
      ];
    }
    case "name":
      return [node.resolution === "rn" ? "namespace\\" : "", node.name];
    case "literal":
      return print("value");
    case "parentreference":
      return "parent";
    case "selfreference":
      return "self";
    case "staticreference":
      return "static";
    case "typereference":
      return node.name;
    case "nullkeyword":
      return "null";
    case "identifier": {
      const { parent } = path;

      if (parent.kind === "method") {
        node.name = normalizeMagicMethodName(node.name);
      }

      return print("name");
    }
    case "match": {
      const arms = path.map(() => {
        const armNode = path.node;

        const maybeLeadingComment = hasLeadingComment(armNode)
          ? [printComments(armNode.leadingComments, options), hardline]
          : [];
        const maybeTrailingComma =
          !path.isLast || options.trailingCommaPHP ? "," : "";
        const maybeTrailingComment = hasTrailingComment(armNode)
          ? [
              " ",
              printComments(
                armNode.comments.filter((c) => c.trailing),
                options
              ),
            ]
          : [];

        const conds =
          armNode.conds === null
            ? "default"
            : path.map(
                ({ isFirst }) => [",", line, print()].slice(isFirst ? 2 : 0),
                "conds"
              );
        const body = print("body");
        const maybeEmptyLineBetweenArms =
          !path.isFirst &&
          isPreviousLineEmpty(options.originalText, locStart(armNode))
            ? hardline
            : "";

        return [
          "",
          hardline,
          maybeEmptyLineBetweenArms,
          ...maybeLeadingComment,
          group([
            group([conds, indent(line)]),
            "=> ",
            body,
            maybeTrailingComma,
            ...maybeTrailingComment,
          ]),
        ].slice(!path.isFirst ? 0 : 1);
      }, "arms");
      return group([
        "match (",
        group([indent([softline, print("cond")]), softline]),
        ") {",
        group(indent([...arms])),
        " ",
        softline,
        "}",
      ]);
    }

    case "noop":
      return node.comments ? printComments(node.comments, options) : "";
    case "namedargument":
      return [node.name, ": ", print("value")];

    case "enumcase":
      return group([
        "case ",
        print("name"),
        node.value
          ? [
              " =",
              printAssignmentRight(
                node.name,
                node.value,
                print("value"),
                false,
                options
              ),
            ]
          : "",
      ]);
    case "variadicplaceholder":
      return "...";

    /* c8 ignore next 3 */
    case "error":
    default:
      throw new Error(`Have not implemented kind '${node.kind}' yet.`);
  }
}

export default genericPrint;
