<?php
$variable = @foo();
/* Intentional file error */
$my_file = @file('non_existent_file') or die ("Failed opening file: error was '$php_errormsg'");

// this works for any expression, not just functions:
$value = @$cache[$key];
// will not issue a notice if the index $key doesn't exist.
$variable = @foo(['veryVeryVeryVeryVeryVeryVeryLongKey' => 'veryVeryVeryVeryVeryVeryLongValue']);
$variable = @foo()->veryVeryVeryVeryVeryLongMethod()->veryVeryVeryVeryVeryLongMethod()->veryVeryVeryVeryVeryLongMethod();
$variable = @foo('VeryVeryVeryVeryVeryVeryLongArgument', 'VeryVeryVeryVeryVeryVeryLongArgument', 'VeryVeryVeryVeryVeryVeryLongArgument');
