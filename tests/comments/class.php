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


namespace Tribe\Project\Twig;

interface Template_Interface {
	/**
	 * Build the data that will be available to the template
	 *
	 * @return array
	 */
	public function get_data(): array;

	/**
	 * Render the template and return it as a string
	 *
	 * @return string The rendered template
	 */
	public function render(): string;
}


class Foo {/* Comment */}
interface FooI {/* Comment */}
trait FooT {/* Comment */}

// 424 : Method failure
class ResponseMethodFailure 
  // behaves as an error
  extends ResponseNotAcceptable
  implements
    // Some comment
    FooBar,
    // Another comment
    BarBaz
{

}

// 424 : Method failure
class ResponseMethodFailure
    extends // behaves as an error
        ResponseNotAcceptable
    implements
        // Some comment
        FooBar,
        // Another comment
        BarBaz
{

}


// 424 : Method failure
class ResponseMethodFailure
    extends
        // behaves as an error
        ResponseNotAcceptable
    implements
        // Some comment
        FooBar,
        // Another comment
        BarBaz
{

}

// 424 : Method failure
class ResponseMethodFailure extends ResponseNotAcceptable implements
    // Some comment
    FooBar,
    // Another comment
    BarBaz
{

}

class MyClass
{
}

// Comment
class MyClass
{

}

class MyClass
{
    // Comment
}

$var = new class {};

// Comment
$var = new class {};

$var = new class {
    // Comment
};

$foo = /*a*/ new /* b */ class {};
