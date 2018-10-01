<?php
(new Translator(
    $container,
    new MessageFormatter(),
    'en',
    array(),
    array('foo' => 'bar')
))
?>
<?php
(((new Translator(
    $container,
    new MessageFormatter(),
    'en',
    $someOtherVar,
    array('foo' => 'bar')
))))
?>
<?php
(new Translator(
    $container,
    new MessageFormatter(),
    'en',
    $someOtherVar,
    ['foo' => 'bar']
))
?>
<?php

$var = new Foo();
$var = (new Foo());
$var = (new Foo())->c();
$var = (new class {
    public function log($msg)
    {
        echo $msg;
    }
});
$var = (new foo())->bar();
$var = (new foo())->bar()->foo();
$var = ((new foo())->bar())->foo();
$var = (((new foo())->bar())->foo());
$var = (((new foo())->bar())->foo())[0];
$var = ((((new foo())->bar())->foo())[0])[1];
$var = (((new foo())->bar())->foo())->baz();
$var = (new $foo())->bar;
$var = (new $bar->y)->x;
$var = (new foo)[0];
$var = (new foo)[0]['string'];

$var = new $a->b;
$var = new $a->b();
$var = (new $a)->b();
$var = ((new $a)->b());

(new class {})->foo;
(new class {})->foo();
(new class {})();
(new class {})['foo'];

$var = (new class {})->foo;
