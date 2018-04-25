<?php

function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */) {}
function foo($a): /* 5 */ ?string /* 6 */ {}
function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */): /* 5 */ ?string /* 6 */ {}
function emptyFn(/*Comment */) {}
