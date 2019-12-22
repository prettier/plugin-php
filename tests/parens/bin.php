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

if (false || true) {};
if ((false || true)) {};
if (false or true) {};
if ((false or true)) {};
if (true && false) {};
if ((true && false)) {};
if (true and false) {};
if ((true and false)) {};

if (!$foo or $bar == -1) {}
if ((!$foo or $bar == -1)) {}
if ((!$foo or $bar) == -1) {}
if (!$foo or ($bar == -1)) {}

do {} while ($foo and $bar);
while ($foo or $bar < 10) {}
for ($foo or $bar;;) {}
switch ($foo or $bar) {}

$a ** $b ** $c;
($a ** $b) ** $c;
$a->b ** $c;
(-$a) ** $b;
$a ** -$b;
-($a**$b);
($a * $b) ** $c;
$a ** ($b * $c);
($a % $b) ** $c;

$var = $var + $var ?? '';
$var = $var + ($var ?? '');
$var = ($var + $var) ?? '';
$var = $var ?? null + 1;
$var = ($var ?? null) + 1;
$var = $var && ($var ?? true);
$var = ($var ?? true) && $var;
$var = $var && ($var ?? null) === true;
$var = ($var ?? null) === true && $var;

$findAll = $cachesNames === [];
$findAll = ($cachesNames === []);

$isNamespaced = strpos($fixture, '\\') !== false;
$isNamespaced = (strpos($fixture, '\\') !== false);

$var = $a['apply_time'] > $b['apply_time'] ? -1 : +1;
$var = ($a['apply_time'] > $b['apply_time']) ? -1 : +1;

$var = $page > 0 || $page == 0 && $this->forcePageParam;
$var = $page > 0 || ($page == 0 && $this->forcePageParam);

@foo() || @foo();
(@foo()) || (@foo());
$var = @foo() || @foo();
$var = (@foo() || @foo());

@$i / 0;
@($i) / 0;

$a = (false && foo());
$b = (true  || foo());
$c = (false and foo());
$d = (true  or  foo());

$f = false or true;
$h = true and false;

$my_file = call('non_existent_file') or die("Failed opening file: error was '$php_errormsg'");
($my_file = call('non_existent_file')) or die("Failed opening file: error was '$php_errormsg'");

$my_file = call('non_existent_file') and die("Failed opening file: error was '$php_errormsg'");
($my_file = call('non_existent_file')) and die("Failed opening file: error was '$php_errormsg'");

$var = $obj->foo ?? "default";
$var = $foo ? $bar ?? $foo : $baz;
$var = $foo ?? ($bar ?? $baz);
$var = ($foo ?? $baz) || $baz;
$var = $foo ?? $baz || $baz;
$var = ($foo && $baz) ?? $baz;
$var = $foo && ($baz ?? $baz);
