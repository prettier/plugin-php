<?php

function f() {
    return /* a */;
}

return // Comment
    ;

return // Comment
    $a;

return // Comment
    [
        $a, $b, $c
    ];

return /* Comment */
    $a;

// Comment
return $a;

return /* Comment */ $a /* Comment */ = /* Comment */ $b /* Comment */;

return // Comment
    new Foo();
