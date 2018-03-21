<?php
class Test{
  public function testFunction (/* inline */ $arg) {
    // body
  }

  function testFunction ($arg1, /* inline */ $arg2) {

  }
}

function testFunction (/* inline */ $arg) {
  // body
}

function testFunction ($arg1, /* inline */ $arg2) {

}

