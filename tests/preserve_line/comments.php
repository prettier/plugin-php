<?php

function a() {
  $a = 5; // comment

  return $a;
}

function a() {
  $a = 5; /* comment */

  return $a;
}

function a() {
  $a = 5; /* comment */ /* comment */

  return $a;
}

function a() {
  $a = 5; /* comment */ /* comment */ // comment
  return $a;
}

function a() {
  $a = 5; /* comment */ /* comment */ // comment

  return $a;
}
