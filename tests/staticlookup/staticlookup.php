<?php
Foo::aStaticMethod();
$classname = 'Foo';
$classname::aStaticMethod();
print $classname::$my_static . "\n";
Foo::method([
    'foo' => 'bar',
    'bar' => 'foo',
    'foobar' => 'barfoo',
    'barfoo' => 'foobar'
]);
MyClass::$aStaticProp;
MyClass::$aStaticProp = 1;
$classname::$aStaticProp;
