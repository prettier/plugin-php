<?php

$var = 1;
($var = 1);
$var = $var = 1;
$var = ($var = 1);
($var = $var = 1);
($var = ($var = 1));
$var = $var = $var = $var;
$var = $var = ($var = $var);
$var = ($var = $var = $var);
$var = ($var = ($var = $var));
($var = ($var = ($var = $var)));

$var = $var++;
$var = ($var++);
$var = ++$var;
$var = (++$var);

$var = $var--;
$var = ($var--);
$var = --$var;
$var = (--$var);

$var = ~$var;
$var = (~$var);

$var = !$var;
$var = (!$var);

$var = $var += 10;
$var = ($var += 10);

$var = 10 + 20 + 30;
$var = (10 + 20) + 30;
$var = 10 + (20 + 30);

$var = '10' . '20' . '30';
$var = ('10' . '20') . '30';
$var = '10' . ('20' . '30');

$var = 10 + 20 % 30;
$var = (10 + 20) % 30;
$var = 10 + (20 % 30);

$var = 10 ** 20 ** 30;
$var = (10 ** 20) ** 30;
$var = 10 ** (20 ** 30);

$var = (10 == 20) == 30;
$var = 10 == (20 == 30);

$var = (10 === 20) === 30;
$var = 10 === (20 === 30);

$var = 10 * 20 % 30;
$var = (10 * 20) % 30;
$var = 10 * (20 % 30);

$var = 10 * 20 / 30;
$var = (10 * 20) / 30;
$var = 10 * (20 / 30);

$var = 10 / 20 * 30;
$var = (10 / 20) * 30;
$var = 10 / (20 * 30);

$var = 10 << 20 << 30;
$var = (10 << 20) << 30;
$var = 10 << (20 << 30);

$var = 10 >> 20 >> 30;
$var = (10 >> 20) >> 30;
$var = 10 >> (20 >> 30);

$var = 10 ^ 20 ^ 30;
$var = (10 ^ 20) ^ 30;
$var = 10 ^ (20 ^ 30);

$var = 10 | 20 | 30;
$var = (10 | 20) | 30;
$var = 10 | (20 | 30);

$var = false || true;
$var = (false || true);
$var = false or true;
$var = (false or true);
$var = true && false;
$var = (true && false);
$var = true and false;
$var = (true and false);

$var = $var || $var();
$var = ($var || $var)();
$var = $var && $var();
$var = ($var && $var)();
$var = call($var || $var);
$var = call(($var || $var));
$var = call($var && $var);
$var = call(($var && $var));

$var = +($var || $var);
$var = -($var || $var);
$var = ~($var || $var);

$var = ($var || $var)->foo;
$var = ($var || $var)->foo();
$var = ($var || $var)[1];

$var = $var || $var && $var;
$var = ($var || $var) && $var;
$var = $var || ($var && $var);

$var = $var & ($var || 'test');
$var = ($var || 'test') & $var;
$var = $var & ($var . 'test');
$var = ($var . 'test') & $var;
$var = ($var & $var) || 'test';
$var = $var || ('test' & $var);

$var = ($var || $var) % 100;
$var = ($var + $var) % 100;
$var = 100 % ($var || $var);
$var = 100 % ($var + $var);
$var = $var || ($var % 100);
$var = $var + ($var % 100);
$var = (100 % $var) || $var;
$var = (100 % $var) + $var;

$var = ($var + $var) >> 1;
$var = (($var - 1) >> $var) & $var;
$var = $var > $var ? 0 : ($var - $var) >> $var;
$var = (($var - $var) >> $var) + 1;

if ($var < 1 << ($var + $var)) {}

$var = $var < $var ? 0 : ((($var - 1) >> $var) << $var);
$var = 1 - (2 * ($var[3] >> 7));
$var = ((($var[3] << 1) & 0xff) | ($var[2] >> 7)) - 127;
$var = (($var[2] & 0x7f) << 16) | ($var[1] << 8) | $var[0];

$var = 2 / 3 * 10 / 2 + 2;

$var = (($var / $var) * $var - $var / 2) * call($var);
$var = (($var / $var) * $var - $var / 2) * call($var);

$var = $var % 10 - 5;
$var = $var * $var % 10;
$var = $var % 10 > 5;
$var = $var % 10 == 0;

$var = $var + $var / $var;
$var = $var / $var + $var;

$var = $var * $var % $var;
$var = $var / $var % $var;
$var = $var % $var * $var;
$var = $var % $var / $var;

$var = $var % $var % $var;

$var = $var << $var >> $var;
$var = $var >> $var << $var;
$var = $var >> $var >> $var;
$var = $var + $var >> $var;
$var = ($var + $var) >> $var;
$var = $var + ($var >> $var);

$var = $var | $var & $var;
$var = $var & $var | $var;
$var = $var ^ $var ^ $var;
$var = $var & $var & $var;
$var = $var | $var | $var;
$var = $var & $var >> $var;
$var = $var << $var | $var;

$var = $var ? 'foo' : 'bar' . 'test';
$var = ($var ? 'foo' : 'bar') . 'test';
$var = $var ? 'foo' : ('bar' . 'test');

call(($var + $var));

$var = call(($var + $var));

$var = $var + $var ** 2;
$var = ($var + $var) ** 2;
$var = $var + ($var ** 2);
$var = (+$var) ** 2;
$var = +$var ** 2;

$var = $foo instanceof Foo;
$var = $foo instanceof Foo || $foo instanceof Foo;
$var = ($foo instanceof Foo) || ($foo instanceof Foo);
$var = (($foo) instanceof Foo);

$var = !$var;
$var = !($var);
$var = (!($var));
$var = !!$var;
$var = !!($var);
$var = !(!($var));
$var = (!(!($var)));
$var = !!!$var;
$var = !!!($var);
$var = !!(!($var));
$var = !(!(!($var)));
$var = (!(!(!($var))));

$var = !$var || !$var;
$var = (!($var) || !($var));
$var = !(!($var) || !($var));

$var = $var + $var * $var;
$var = ($var + $var) * $var;

$var = @foo() || @foo();
$var = @(foo() || foo());

($var += ($var += ($var += $var)));
($var -= ($var -= ($var -= $var)));
($var *= ($var *= ($var *= $var)));
($var **= ($var **= ($var **= $var)));
($var /= ($var /= ($var /= $var)));
($var .= ($var .= ($var .= $var)));
($var %= ($var %= ($var %= $var)));
($var &= ($var &= ($var &= $var)));
($var |= ($var |= ($var |= $var)));
($var ^= ($var ^= ($var ^= $var)));
($var <<= ($var <<= ($var <<= $var)));
($var >>= ($var >>= ($var >>= $var)));

$var = $var | $var | $var;
$var = $var | ($var | $var);
$var = ($var | $var) | $var;
$var = $var & $var & $var;
$var = $var & ($var & $var);
$var = ($var & $var) & $var;

$var = $var ^ $var | $var;
$var = ($var ^ $var) | $var;
$var = $var | $var ^ $var;
$var = $var | ($var ^ $var);
$var = ($var | $var) ^ $var;

$var = $var & $var | $var;
$var = ($var & $var) | $var;
$var = $var | $var & $var;
$var = $var | ($var & $var);
$var = ($var | $var) & $var;

$var = $var == $var || false;
$var = ($var == $var) || false;
$var = $var == ($var || false);

$var = false || $var == $var;
$var = false || ($var == $var);
$var = ($var || false) == $var;

$var = 'string' . true ? '1' : '2';
$var = 'string' . (true ? '1' : '2');

$var = 'string' . (100 + 100);
$var = (100 + 100) . 'string';
$var = 'string' . ($var || 100);
$var = ($var || 100) . 'string';
$var = 'string' . ($var * 100);
$var = ($var * 100) . 'string';
$var = 'string' . !$var;
$var = !$var . 'string';
$var = 'string' . ($var | 100);
$var = ($var | 100) . 'string';

$var = $var . $var % $var;
$var = ($var . $var) % $var;
$var = $var % $var . $var;
$var = $var % ($var . $var);

$var = '100' - '100' - '100';
$var = ('100' - '100') - '100';
$var = '100' - ('100' - '100');
