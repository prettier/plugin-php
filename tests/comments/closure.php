<?php

$var = function (/* Comment */) {};
$var = function (/* Comment */ $arg /* Comment */) {};
$var = function ()
// this is a function
{
    return 42;
};
$var = function () // this is a function
{
    return 42;
};
$var = function () { // this is a function
    return 42;
};
$var = function () {
    // this is a function
    return 42;
};

$this
    // Comment
    ->map(function ($protocol) {
        // Comment

        return $protocol;
    })
    // Comment
    ->
    // Comment
    call(function ($arg) {
        // Comment

        return $arg;
    });
