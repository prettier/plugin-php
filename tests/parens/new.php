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
    array(),
    array('foo' => 'bar')
))))
?>
