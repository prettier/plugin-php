<?php

call();
// TODO: uncomment after resolve https://github.com/glayzzle/php-parser/issues/194#issuecomment-430657284
// (call());

$var = call();
$var = (call());
$var = call()();
$var = (call())();
$var = (call()());
$var = ((call())());

$var = $foo->call();
$var = ($foo)->call();
$var = ($foo->call());
$var = $foo->call()->call();
$var = ($foo)->call()->call();
$var = (($foo)->call())->call();
$var = ((($foo)->call())->call());

$var = call((call()));
$var = call(...(call()));
$var = (call((call())));
$var = (call((call()), (call())));

$var = $func();
$var = ($func)();
$var = ($func());
$var = (($func)());

$var = $this->$name();
$var = ($this)->$name();
$var = ($this->$name());
$var = (($this)->$name());

$var = Foo::call();
$var = (Foo::call());

$var = (array("Foo", "bar"))();
$var = (array(new Foo, "baz"))();
$var = ((string) 1234)();
$var = "Foo::bar"();
$var = ("Foo::bar")();
