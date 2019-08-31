<?php

$var = &$var;

class Foo {
    public function test() {
        $var = &self::$darwinCache[$k];
    }
}
