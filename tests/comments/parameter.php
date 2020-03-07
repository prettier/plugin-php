<?php

function foo(/* Comment */ $a, /* Comment */ array /* Comment2 */ $b /* Comment */ = /* Comment */ [] /* Comment */) {}

function bar(/* Comment */ &$a /* Comment */) {}

function baz(/* Comment */ $a, /* Comment */ array /* Comment3 */ &$b /* Comment */ = /* Comment */ [] /* Comment */) {}

class MyClass {
    public function foo(/* Comment */ $a, /* Comment */ array /* Comment2 */ $b /* Comment */ = /* Comment */ [] /* Comment */) {}

    public function bar(/* Comment */ &$a /* Comment */) {}

    public function baz(/* Comment */ $a, /* Comment */ array /* Comment3 */ &$b /* Comment */ = /* Comment */ [] /* Comment */) {}
}