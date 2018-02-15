<?php

function hello(){
    return "hello";
}

function return_x($x){
    return $x;
}

function two_args($x, $y) {
    return $x;
}

function reeeeeeeeeeaaaaaaaallllllllyyyyyy_llloooooooonnnnnnggggg($soooooooooooo_looooooooonnnng, $eeeeeeeeevvveeeeeeeennnn_loooooonnngggeeeerrrr) {
    return $soooooooooooo_looooooooonnnng;
}

function variadicTest($one, ...$others) {
  // test
  $hi = 2;
  return count($others);
}

function pass_by_reference_test($x, int &$a) {
  $a += 1;
}

//leaving out array and callable until https://github.com/glayzzle/php-parser/issues/113 is fixed
function type_hinting_test(bool $bool_test, float $float_test, iterable $iterable_test, int $int_test, string $string_test = '') {
  return $int_test;
}

$anonymous = function($name) use ($otherthing, &$reference_test){
  printf("Hello %s", $name);
  $reference_test += 1;
};
$anonymousLongVariableName = function($name, $more, $params, $looooooooooooooooooooooooooooooooong) use ($all, $kinds, $of, $stuff) {
  printf("Hello %s", $name);
};

$arr = [1,2,3];
array_map(function($entry) {
  return $entry * 2;
}, $arr);

$silent = @hello();
