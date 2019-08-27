<?php

// Empty parameter_list
function func1() {}
// parameter_list
function func2($arg) {}
function func3($arg, $arg1, $arg2) {}
// optional_type
function func4(array $arg) {}
function func5(callable $arg) {}
function func6(float $arg) {}
function func7(ArrayAccess $arg) {}
function func8(Foo\Bar $arg) {}
function func9(Foo\Bar\Baz $arg) {}
function func10(namespace\Foo $arg) {}
function func11(namespace\Foo\Bar $arg) {}
function func12(namespace\Foo\Bar\Baz $arg) {}
function func13(\Foo $arg) {}
function func14(\Foo\Baz $arg) {}
function func15(\Foo\Baz\Baz $arg) {}
function func16(?array $arg) {}
function func17(?ArrayAccess $arg) {}
function func18(?Foo\ArrayAccess $arg) {}
function func19(?\Foo\ArrayAccess $arg) {}
// is_reference
function func20(array &$arg) {}
function func21(?array &$arg) {}
// is_variadic
function func22(array &...$arg) {}
function func23(?array &...$arg) {}
// T_VARIABLE '=' expr
function func24(string $arg = 'test') {}
function func25(?string &$arg = 'test') {}
function func26(?array &$arg = ['1', '2', '3']) {}
function func27(array &...$arg) {}
function func28(?array &...$arg ) {}

class Foo extends ArrayIterator {
    function func1(?self $arg) {}
    function func2(?parent $arg) {}
}