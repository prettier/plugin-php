<?php

$withComments = match($v) {

    // first comment

    'a' => 1,



    /*
     * second comment
     */



    'b' => 2,
    // leading comment ...
    'c' => 3,              /* ... and trailing comment */
    'd'           // fourth comment
        => 4,
    default => null            // final comment
};
