<?php
$a++;
++$a;

+$a;
-$a;

$a + 1;
$a += 1;
$a - 1;
$a -= 1;
$a * 1;
$a *= 1;
$a / 1;
$a /= 1;
$a % 1;
$a %= 1;
$a ** 1;

$a & $b;
$a &= $b;
$a | $b;
$a |= $b;
$a ^ $b;
$a ^= $b;
~ $a;
$a << $b;
$a <<= $b;
$a >> $b;
$a >>= $b;

$a == $b;
$a === $b;
$a != $b;
$a <> $b;
$a !== $b;
$a < $b;
$a > $b;
$a <= $b;
$a >= $b;
$a <=> $b;

$a and $b;
$a or $b;
$a xor $b;
!$a;
$a && $b;
$a || $b;

$a . $b;
$a .= $b;

$a instanceof stdClass;

$output = `ls -al`;
$a = (bool) "test";

$b = &$a;

$a ?? $b;

$this->reallyLong->testPropertyName = 'a' . $someOtherTest . 'n' . $oneLastOneToMakeLineLong;

'tesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssst' . 'test';

$someReallyReallyReallyLongBooleanVariable + $someReallyReallyReallyLongBooleanVariable;
$someReallyReallyReallyLongBooleanVariable . $someReallyReallyReallyLongBooleanVariable;
$someReallyReallyReallyLongBooleanVariable .= $someReallyReallyReallyLongBooleanVariable;
++$someReallyReallyReallyLongBooleanVariableWithReallyReallyReallyReallyReallyReallyLongName;
--$someReallyReallyReallyLongBooleanVariableWithReallyReallyReallyReallyReallyReallyLongName;
$someReallyReallyReallyLongBooleanVariableWithReallyReallyReallyReallyReallyReallyLongName++;
$someReallyReallyReallyLongBooleanVariableWithReallyReallyReallyReallyReallyReallyLongName--;
$someReallyReallyReallyLongBooleanVariable + $someReallyReallyReallyLongBooleanVariable - $someReallyReallyReallyLongBooleanVariable;

$value = isset($_POST['menu-item-dropdown']) &&
isset($_POST['menu-item-dropdown'][$menuItemDbId])
    ? 'enabled'
    : 'disabled';

($var && $var && $var)->call();
($veryVeryVeryVeryVeryLongVariable && $veryVeryVeryVeryVeryLongVariable && $veryVeryVeryVeryVeryLongVariable)->call();
($veryVeryVeryVeryVeryLongVariable && $veryVeryVeryVeryVeryLongVariable && $veryVeryVeryVeryVeryLongVariable)['key'];

if (
    get_option('woocommerce_product_cart_actions_notification_more_cart') === 'yes' &&
    count($cartItems) > 0
) {
    $a = 1;
}

function f()
{
    if (
        get_option('woocommerce_product_cart_actions_notification_more_cart') === 'yes'
        && count($cartItems) > 0
    ) {
        $a = 1;
    }
}
