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

$extraLongMatch = match($a) {
    'foo', 'foo2', 'foo3', 'foo4',
    'foo5', 'foo6', 'foo7', 'foo8',
    'foo9', 'foo10', 'foo11', 'foo12',
    => ['bar'],
    'bar', 'bar2', 'bar3', 'bar4',
    'bar5', 'bar6', 'bar7', 'bar8',
    'bar9', 'bar10', 'bar11', 'bar12',
    => 'some really long value in the return part of the match statement',
    'cd' => [],
    default => [],
};

// Whitespace in match expressions is handled like in function/method arguments:
// - none above the first arm or below the last arm
// - empty lines are preserved between arms
// - multiple empty lines are collapsed into one
match ($a) {

    'a' => 1,


    'b' => 2

};
