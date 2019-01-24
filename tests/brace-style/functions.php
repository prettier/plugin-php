<?php

function hello()
{
    return "hello";
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

$anonymous = function($name) use ($otherthing, &$reference_test){
    printf("Hello %s", $name);
    $reference_test += 1;
};
$anonymousLongVariableName = function($name, $more, $params, $looooooooooooooooooooooooooooooooong) use ($all, $kinds, $of, $stuff) {
    printf("Hello %s", $name);
};
