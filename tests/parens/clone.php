<?php

clone $a;
(clone $a);

$var = clone $a;
$var = clone $a();
$var = (clone $a)();
$var = (clone $a);
$var = (clone $a)->foo;
$var = (clone $a->foo);
$var = (clone $a)->foo();

$var = (clone foo())->bar()->foo();
$var = ((clone foo())->bar())->foo();
$var = (((clone foo())->bar())->foo());
$var = (((clone foo())->bar())->foo())[0];
$var = ((((clone foo())->bar())->foo())[0])[1];
$var = (((clone foo())->bar())->foo())->baz();
$var = (clone $foo())->bar;
$var = (clone $bar->y)->x;
$var = (clone $foo)[0];
$var = (clone $foo)[0]['string'];

$var = clone $a->b;
$var = clone $a->b();
$var = (clone $a)->b();
$var = ((clone $a)->b());

$var = (clone ($var));
$var = (clone($var));
$var = (clone($var->foo));
$var = (clone($var->foo))->foo;
