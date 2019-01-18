<?php

$var->bar;
($var->bar);

$var->bar();
($var->bar());

$var::bar();
($var::bar());

$var = $var->bar;
$var = ($var->bar);
$var = $var->bar->foo;
$var = ($var->bar)->foo;
$var = ($var->bar->foo);
$var = (($var->bar)->foo);

$var = $var::foo();
$var = ($var::foo());
$var = $var::foo()::bar();
$var = ($var::foo())::bar();
$var = ($var::foo()::bar());
$var = (($var::foo())::bar());

$var = $var->bar();
$var = ($var->bar());
$var = $var->bar()->foo();
$var = ($var->bar())->foo();
$var = ($var->bar()->foo());
$var = (($var->bar())->foo());

$var = ((object) ($var->bar())->foo());
$var = (object) (($var->bar())->foo());

$var = $var[0];
$var = $var[0][1];
$var = ($var[0]);
$var = ($var[0][1]);
$var = $var[0]->foo;
$var = ($var[0])->foo;
$var = ($var[0][1])->foo;
$var = ($var[0])[1]->foo;
$var = (($var[0])[1])->foo;
$var = $var[0]::foo;
$var = ($var[0])::foo;
$var = ($var[0][1])::foo;
$var = ($var[0])[1]::foo;
$var = (($var[0])[1])::foo;
$var = $var[0]->foo();
$var = ($var[0])->foo();
$var = ($var[0][1])->foo();
$var = ($var[0])[1]->foo();
$var = (($var[0])[1])->foo();
$var = $var[0]::foo();
$var = ($var[0])::foo();
$var = ($var[0][1])::foo();
$var = ($var[0])[1]::foo();
$var = (($var[0])[1])::foo();

$var = $var[0]->foo()->baz;
$var = ((($var[0])->foo())->baz);

$var = (new Foo())->bar;
// TODO: uncomment after resolve https://github.com/glayzzle/php-parser/issues/185
// $var = (new Foo())::bar;
$var = (new Foo())->bar();
$var = (new Foo())::bar();
$var = (new Foo())[1];

$var = $var->bar()();
$var = ($var->bar())();
$var = ($var->bar()());
$var = (($var->bar())());

$var = $var::bar()();
$var = ($var::bar())();
$var = ($var::bar()());
$var = (($var::bar())());

$var = ($var)->bar;
$var = (($var)->bar);
$var = ($var)->bar();
$var = (($var)->bar());
