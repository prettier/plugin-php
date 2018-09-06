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
