<?php

$test = $var = $test;
$test = ($var = $test);
$test = $var = &$test;
$test = ($var = &$test);

$a = ($b = $var) + 5;
$a = ($b = &$var) + 5;

$a = ($b = $var) || 5;
$a = ($b = &$var) || 5;

if (($foo = &$bar) && count($foo) > 0) {}
if (($foo = &test1()) && test2($foo) > 0) {}

call(($a =& $b));
