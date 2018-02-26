<?php
define("TEST_CONSTANT", 1);
const OTHER_TEST_CONSTANT = 2;
const ONE = 1;
const TWO = ONE * 2;

$test = TEST_CONSTANT;
$test = OTHER_TEST_CONSTANT;

class Constants {
  const TEST_CLASS_CONSTANT = 3;
  public const PUBLIC_TEST_CLASS_CONSTANT = 'value';
  protected const PROTECTED_TEST_CLASS_CONSTANT = 'value';
  private const PRIVATE_TEST_CLASS_CONSTANT = 'value';
  public const THREE = TWO + 1;
  public const ONE_THIRD = ONE / self::THREE;
  public const SENTENCE = 'The value of THREE is ' . self::THREE;

  public static function testClassConstant() {
    return self::TEST_CLASS_CONSTANT;
  }

  public function f($a = ONE + self::THREE) {
    return $a;
  }
}
