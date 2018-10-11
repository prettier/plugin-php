<?php

$var = 1;
namespace foo {
    function bar($a, $b) {
        return $a + $b;
    }
    echo bar(2, 3);
}
$var = 1;
