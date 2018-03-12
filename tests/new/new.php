<?php
new Foo;
new Foo();
$a = new Foo;
$b = new Foo();
$c = new Foo([1, 2, 3], "foo", $variable);
$bar = 'MyClassName';
$foo = new $bar;
$foo = new $bar();

abstract class A
{
    public static function create()
    {
        $a = new static;
        $b = new static();
    }

}
