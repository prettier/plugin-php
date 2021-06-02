<?php

$really_really_really_long_variable_name = match(getValue()) {
  true => implode(',',[1,2,3]),
    false => $a || 'Empty',
    null => null,
    default => throw new \InvalidArgumentException('Unknown Value'),
};

$boolStr = match($v) {true => 'true', false => 'false'};

$boolish = match($v) {
    true, 1 => true,
    false,0,'',null => false,
    default => null
};

$a = match(true) {
    test() => 'Good',
    test2() => 'Two',
    default => 'fail'
};

$nest = match(match($a) {true => 1, false => 2}) {
    1 => match($b) {
        'ok' => true,
        'fail' => false,
        default => false
    },
    2 => 'null'
};