<?php
define("TEST_CONSTANT", 1);
const OTHER_TEST_CONSTANT = 2;

$test = TEST_CONSTANT;
$test = OTHER_TEST_CONSTANT;

class Constants {
  const TEST_CLASS_CONSTANT = 3;

  public static function testClassConstant() {
    return self::TEST_CLASS_CONSTANT;
  }
}
