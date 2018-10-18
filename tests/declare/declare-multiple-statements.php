<?php

declare(ticks=1) {
    $a = 1;
    $b = 2;
}

declare(ticks=2) {
    function test() {
        $a = 1;
    }
}
