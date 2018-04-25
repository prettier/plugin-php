<?php

class Foo {
    public function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */): /* 5 */ ?string /* 6 */ {}

    public function emptyMethod(/* comments */) {}

    /* comment */ protected /* comment */ static /* comment */ $foo /* comment */;
}
