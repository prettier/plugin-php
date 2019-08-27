<?php

$var = $var
    // Comment
    ->each() // Comment
    // Comment
    ->map() // Comment
    // Comment
    ->first() // Comment
    // Comment
    ->dump();

$var = $a /* Comment*/->/*Comment*/ bar;
$var = $a/* Comment */['test'];
$var = $a /* Comment */->/* Comment */ bar();
$var = $a /* Comment */::/* Comment */ bar();

$a /* Comment*/->/*Comment*/ bar/* Comment */;
$a/* Comment */['test'];
$a /* Comment */->/* Comment */ bar();
$a /* Comment */::/* Comment */ bar();
