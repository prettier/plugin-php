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

return new class( $this->taxonomy, $this->post_types ) extends Taxonomy_Config {
	// body of anonymous class
	public function get_args() {
		// body of member function of anonymous class
		return []; // after return in member function of anonymous class
	} // after member function on anonymous class

};

$test = new class($arg1) extends Test {
  // some comment
};

$test = new class {
  //some comment
};
