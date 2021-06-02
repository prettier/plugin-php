<?php
function a(int|float $a):int|float {}

class UnionClass {
    public int|float $v = 0;

    public function __construct(public bool|int $flag) {}

    public function get():bool|int|float {}
}

interface UnionInterface { function do(string|int $in):string|bool; }
