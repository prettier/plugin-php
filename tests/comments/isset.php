<?php

if (isset(/* Comment */ $a[1]/* Comment */)) {
    echo "Foo";
}

if (
    isset( // Comment
        $a
    )
) {}

if (
    isset // Comment
    ($a)
) {}
