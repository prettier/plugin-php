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

if (true)
    // Comment
    echo 'foo';
else if (false)
    // Comment
    echo 'bar';
else
    // Comment
    echo 'baz';

if (true) // Comment
    echo 'foo';
else if (false) // Comment
    echo 'bar';
else // Comment
    echo 'baz';

// If the values implements the Arrayable interface we can just call this
// toArray method on the instances which will convert both models and
// collections to their proper array form and we'll set the values.
if ($value instanceof Arrayable) {
    $relation = $value->toArray();
}
// If the value is null, we'll still go ahead and set it in this list of
// attributes since null is used to represent empty relationships if
// if it a has one or belongs to type relationships on the models.
elseif (is_null($value)) {
    $relation = $value;
}

// Comment
if (true) {
    call();
}
// Comment
elseif (false) {
    call();
}

// Comment
if (true) {
    call();
}

// Comment
elseif (false) {
    call();
}

// Comment
if (true) {
    call();
}
// Comment
elseif (false) {
    call();
}
// Comment
else {
    call();
}

// Comment
if (true) {
    call();
}

// Comment
elseif (false) {
    call();
}

// Comment
else {
    call();
}


// Comment
if (true) {
    call();
}



// Comment
elseif (false) {
    call();
}



// Comment
else {
    call();
}


if (true) {
    echo 'test';
} /* comment */ else if (false) {
    echo 'test';
}
// comment
else {
    echo 'test';
}

if (true) echo 'test';
// comment
else echo 'test';

if ($code === 92 /* '\' */) {}
if ($code === 92 /* '\' */ /* '\' */) {}

if ($code === 92) /* '\' */ {}
if ($code === 92) { /* '\' */ }

if (
1
    // Comment
) {
    $a;
}

if ($var)// Comment
{
    $a = 1;
}

if ( // Comment
    $var
) {
    $a = 1;
}

if ($var) // Comment
    $a = 1;
else if ($var) // Comment
    $a = 2;
else // Comment
    $a = 3;

if (/* Comment*/ $var /* Comment*/) /* Comment*/ {}
