<?php

abstract class AbstractClass
{
    abstract protected function getValue();
    abstract protected function prefixValue($prefix);

    public function printOut() {
        print $this->getValue() . "\n";
    }
}

class Foo
{
    function hello()
    {
        return "hello";
    }

    function hello_1($arg)
    {
        return "hello";
    }

    function bar($arg = '')
    {
        echo "In bar(); argument was '$arg'.<br />\n";
    }

    function veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongName()
    {
        return "hello";
    }

    function veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongName(): ?string
    {
        return "hello";
    }

    function reeeeeeeeeeaaaaaaaallllllllyyyyyy_llloooooooonnnnnnggggg($soooooooooooo_looooooooonnnng, $eeeeeeeeevvveeeeeeeennnn_loooooonnngggeeeerrrr) {
        return $soooooooooooo_looooooooonnnng;
    }

    function type_hinting_test(array $array_test, callable $callable_test, bool $bool_test, float $float_test, iterable $iterable_test, int $int_test, string $string_test = '') {
        return $int_test;
    }

    function veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongNameOther(
        $string,
        $max_length,
        // @codingStandardsIgnoreLine
        $ellipses = ' … ', // the spaces are non-breaking spaces
        &$flag = null
    ) {
        return "hello";
    }

    static function staticmethod() {}
}
