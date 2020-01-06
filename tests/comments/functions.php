<?php

function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */) {}
function foo($a): /* 5 */ ?string /* 6 */ {}
function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */): /* 5 */ ?string /* 6 */ {}
function emptyFn(/*Comment */) {}
function func( // Comment
) {}
function func(
    // Comment
) {}
function foo(
    // Comment
    int $a,
    // Comment
    string $b,
    bool // Comment
    $c
) {}

function foo()
// this is a function
{
    return 42;
}
function foo() // this is a function
{
    return 42;
}
function foo() { // this is a function
    return 42;
}
function foo() {
    // this is a function
    return 42;
}
function foo // this is a function
() {
    return 42;
}
