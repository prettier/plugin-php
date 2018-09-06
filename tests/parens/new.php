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
