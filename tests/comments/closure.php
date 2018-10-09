<?php

$var = function (/* Comment */) {};
$var = function (/* Comment */ $arg /* Comment */) {};
$var = function () {
    // Comment
};
$var = function () {
    // Comment

    return 'string';
};
$var->call(function () {
    // Comment
});
$var->call(function () {
    // Comment

    return 'string';
});
$var->call(function () {
    // Comment

    return 'string';
})->call();

