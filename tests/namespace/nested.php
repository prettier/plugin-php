<?php

namespace foo {
    function bar($a, $b) {
        return $a + $b;
    }
    echo bar(2, 3);
}

namespace Name\Space {
    const FOO = 42;
    function f() { echo __FUNCTION__."\n"; }
}
