<?php

class Foo extends Bar implements Baz, Buzz {
  public $test;

  function test() {
    return "test";
  }
}

$test = new Foo();

abstract class ReallyReallyReallyLongClassName extends AbstractModelFactoryResourceController implements TooMuchObjectOrientation, ThisIsMadness {
  // variable doc
  public $test;
  public $other = 1;
  public static $staticTest = ['hi'];

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
}

$this->something->method($argument, $this->more->stuff($this->even->more->things->complicatedMethod()));
