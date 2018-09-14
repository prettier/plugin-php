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

$var = +(--$var);
$var = -(--$var);
$var = ~(--$var);

$var = +($var++);
$var = -($var++);
$var = ~($var++);

$var = +($var--);
$var = -($var--);
$var = ~($var--);

$var = ++$var ** 2;
$var = (++$var) ** 2;

$var = $var++ ** 2;
$var = ($var++) ** 2;

$var = +(+(++$var));
$var = +(+($var++));
$var = ~(-(++$var));
$var = ~(-($var++));

$a->b++;
($a->b++);
++$a->b;
(++$a)->b;

($a->b++)->call();
($a->b++)[1];
($var++)();
$var = call($var->_uuidCounter++);

(--$a->b)->call();
(--$a->b)[1];
(--$var)();
$var = call(--$var->_uuidCounter);
