<?php
function from() {
  yield 1;
  yield 2;
  yield 3;
  yield $test => 3;
}
function gen() {
  yield 0;
  yield from from();
  yield 4;
}


function gen_one_to_three() {
    for ($i = 1; $i <= 3; $i++) {
        yield $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongValues;
        yield $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongObjName->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMethod();
        yield from $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongObjName->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMethod();
    }
}
