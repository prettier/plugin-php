<?php
namespace Test\test\test;

use Some\other\test;

/**
 * @property \Test\test $test
 */
class Foo extends Bar implements Baz, Buzz {
  public $test;

  function test() {
    return "test";
  }

  public function &passByReferenceTest() {
    $a = 1;
    return $a;
  }
}
