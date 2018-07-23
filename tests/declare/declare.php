<?php
declare(ticks=1):
$test = 1;
enddeclare;
declare(ticks=1);
$test = 1;
declare(ticks=1) {
  $test = 1;
}
declare(encoding='ISO-8859-1');
$test = 1;
declare( ticks=1 ):
    $test = 1;
enddeclare;

declare(ticks=1);
$test = 1;

if ($var) {
    declare(ticks=1);
}

declare(ticks=1) {
}

declare(ticks=1):
enddeclare;
