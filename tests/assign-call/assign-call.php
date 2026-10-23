<?php
($fib = function () { return 42; })(10);

$result = ($fib = function ($n) use (&$fib) {
    return $n <= 1 ? $n : $fib($n - 1) + $fib($n - 2);
})(10);

($fn = fn () => 42)();

call($a = $b);
