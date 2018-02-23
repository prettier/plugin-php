<?php
define("TEST_CONSTANT", 1);
const OTHER_TEST_CONSTANT = 2;

$test = TEST_CONSTANT;
$test = OTHER_TEST_CONSTANT;

class Constants {
  const TEST_CLASS_CONSTANT = 3;
  public const PUBLIC_TEST_CLASS_CONSTANT = 'value';
  protected const PROTECTED_TEST_CLASS_CONSTANT = 'value';
  private const PRIVATE_TEST_CLASS_CONSTANT = 'value';

  public static function testClassConstant() {
    return self::TEST_CLASS_CONSTANT;
  }
}
