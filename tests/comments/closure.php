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
