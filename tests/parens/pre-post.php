<?php

++$var;
(++$var);

$var++;
($var++);

--$var;
(--$var);

$var--;
($var--);

$var = ++$var;
$var = (++$var);

$var = +(++$var);
$var = -(++$var);
$var = ~(++$var);

$var = +($var++);
$var = -($var++);
$var = ~($var++);

$var = ++$var ** 2;
$var = (++$var) ** 2;

$var = $var++ ** 2;
$var = ($var++) ** 2;

$var = +(+(++$var));
$var = +(+($var++));
$var = ~(-(++$var));
$var = ~(-($var++));
