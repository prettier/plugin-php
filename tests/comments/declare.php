<?php

declare(ticks=1) {
    // Comment
}

// Comment
declare(ticks=1) {
    // Comment
    $a = 1;
    // Comment
}

// Comment
declare(ticks=1);
// Comment

// Comment
declare(ticks=1):
    // Comment
    $test = 1;
    // Comment
enddeclare;
// Comment

declare(ticks=1) // Comment
{
}

declare(ticks=1) { // Comment
}

declare(ticks=1) // Comment
{
    $a = 1;
}

declare(ticks=1) { // Comment
    $a = 1;
}

declare // Comment
(ticks=1)
{
}

declare /* Comment */ (/* Comment */ticks/* Comment */=/* Comment */1/* Comment */) {}

declare // Comment
(strict_types=1);
