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

$anonymous = function($name) use ($otherthing){
  printf("Hello %s", $name);
};
$anonymousLongVariableName = function($name, $more, $params, $looooooooooooooooooooooooooooooooong) use ($all, $kinds, $of, $stuff) {
  printf("Hello %s", $name);
};

$arr = [1,2,3];
array_map(function($entry) {
  return $entry * 2;
}, $arr);
