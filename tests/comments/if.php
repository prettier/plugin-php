<?php
// Comment 1
if (1) { // Comment 2
    // Comment 3
    echo "Foo"; // Comment 4
    // Comment 5
}
// Comment 6
elseif (2) { // Comment 7
    // Comment 8
    echo "Bar";
    // Comment 9
}
// Comment 10
else { // Comment 11
    // Comment 12
    echo "FooBar";
    // Comment 13
} // Comment 14

if (/* Comments */ true /* Comments */) {
} elseif (/* Comments */ false /* Comments */) {
} else {}


if (2 /* MB_OVERLOAD_STRING */ & (int) ini_get('mbstring.func_overload')) {
  mb_internal_encoding('ASCII');
}

// this is a comment on an if
if (false)
    do_nothing();

// and this is a comment on an elseif
elseif (false)
    also_do_nothing();

if (1)
// comment
{
    false;
}
// comment
else if (2)
    true;
// multi
// ple
// lines
else if (3)
    // existing comment
    true;
// okay?
else if (4) {
    // empty with existing comment
}
// comment
else {
}

if (5) // comment
true;

if (6) // comment
{true;}
else if (7) // comment
true;
else // comment
{true;}

if (8) // comment
// comment
{true;}
else if (9) // comment
// comment
true;
else // comment
// comment
{true;}

if (10) /* comment */ // comment
{true;}
else if (11) /* comment */
true;
else if (12) // comment /* comment */ // comment
true;
else if (13) /* comment */ /* comment */ // comment
true;
else /* comment */
{true;}

if (14) // comment
/* comment */
// comment
{true;}
else if (15) // comment
/* comment */
/* comment */ // comment
true;

if ($cond) {
    stuff();
} /* comment */ else if ($cond) {
    stuff();
}
// comment
else {
    stuff();
}

if ($cond) stuff();
// comment
else stuff();

function f() {
    if ($untrackedChoice === 0) /* Cancel */ {
        return null;
    } else if ($untrackedChoice === 1) /* Add */ {
        yield $repository->addAll($args);
        $shouldAmend = true;
    } else if ($untrackedChoice === 2) /* Allow Untracked */ {
        $allowUntracked = true;
    }
}

function f() {
    if ($untrackedChoice === 0) /* Cancel */
        null;
    else if ($untrackedChoice === 1) /* Add */
        $shouldAmend = true;
    else if ($untrackedChoice === 2) /* Allow Untracked */
        $allowUntracked = true;
}

function f() {
    if ($untrackedChoice === 0) /* Cancel */ // Cancel
        null;
    else if ($untrackedChoice === 1) /* Add */ // Add
        $shouldAmend = true;
    else if ($untrackedChoice === 2) /* Allow Untracked */ // Allow Untracked
        $allowUntracked = true;
}

function f() {
    if ($untrackedChoice === 0)
        /* Cancel */ {
        return null;
    }
    else if ($untrackedChoice === 1)
        /* Add */ {
        yield $repository->addAll($args);
        $shouldAmend = true;
    }
    else if ($untrackedChoice === 2)
        /* Allow Untracked */ {
        $allowUntracked = true;
    }
}

function f() {
    if ($untrackedChoice === 0) {
        /* Cancel */ return null;
    } else if ($untrackedChoice === 1) {
        /* Add */ yield $repository->addAll($args);
        $shouldAmend = true;
    } else if ($untrackedChoice === 2) {
        /* Allow Untracked */ $allowUntracked = true;
    }
}
