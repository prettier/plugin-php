<?php

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

$test = new Foo();

abstract class ReallyReallyReallyLongClassName extends AbstractModelFactoryResourceController implements TooMuchObjectOrientation, ThisIsMadness {
  // variable doc
  public $test;
  public $other = 1;
  public static $staticTest = ['hi'];
  protected $fillable = ['title', 'requester_id', 'type', 'summary', 'proof'];
  protected $fillable2 = ['title', 'description', 'requester_id', 'type', 'summary', 'proof'];

  /**
   * test constructor
   *
   * @param \Test\Foo\Bar $test        hi
   * @param int           $test_int    test
   * @param string        $test_string test
   *
   * @return \Some\Test
   */
  public function __construct($test, $test_int = null, $test_string = 'hi') {
    parent::__construct($test_int ?: 1);
    $this->other = $test_string;
    $this->current_version = $current_version ?: new Content_Version_Model();
    self::$staticTest = $test_int;
  }

  public static function test_static_constructor($test, $test_int, $test_string) {
    $model = new self($test, $test_int, $test_string);
    $model = new self($really_really_really_really_really_really_really_really_long_array, $test_int, $test_string);
    return $model;
  }

  public function test_pass_by_reference(&$test)
  {
    $test + 1;
  }

  /**
   * This is a function
   */
  private function hi($input) {
    $test = 1;

    //testing line spacing
    $other_test = 2;


    $one_more_test = 3;
    return $input . $this->test;

  }

  public function reallyReallyReallyReallyReallyReallyReallyLongMethodName($input, $otherInput = 1) {
    return true;
  }

  // doc test
  public static function testStaticFunction($input) {
    return self::$staticTest[0];
  }

  public function returnTypeTest() : string
  {
    return 'hi';
  }

  final public static function bar()
  {
    // Nothing
  }

  abstract protected function zim();

  public function method(iterable $iterable): array {
    // Parameter broadened and return type narrowed.
  }

  public function method1() { return 'hi'; }

  public function method2() {
      return 'hi'; }

  public function method3()
    { return 'hi'; }

  public function testReturn(?string $name): ?string
  {
        return $name;
  }

  public function swap(&$left, &$right): void
  {
      if ($left === $right) {
          return;
      }

      $tmp = $left;
      $left = $right;
      $right = $tmp;
  }

  public function test(object $obj): object
  {
    return new SplQueue();
  }
}

$this->something->method($argument, $this->more->stuff($this->even->more->things->complicatedMethod()));

class A {}

$someVar = new ReaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalyLongClassName();

class ClassName

extends ParentClass

implements \ArrayAccess, \Countable

{

    // constants, properties, methods

}

class FooBar { public $property; public $property2; public function method() {} public function method2() {} }

class FooBarFoo
{
    public function fooBarBaz ( $x,$y ,$z, $foo , $bar ) { /* Comment */ }
}
