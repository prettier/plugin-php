<?php

call();
(call());

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

call(($a), (($b)), ((($c))));
call($a = $b);
call(($a = $b));
call($a = new Foo());
call(($a = new Foo()));
call($a = (new Foo()));
call(($a = (new Foo())));
$foo->call(($a = (new Foo())));
Foo::call(($a = (new Foo())));
