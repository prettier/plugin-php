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
