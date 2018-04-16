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
(new Translator(
    $container,
    new MessageFormatter(),
    'en',
    $someOtherVar,
    array('foo' => 'bar')
))
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
