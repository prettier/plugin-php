<?php

$withComments = match($v) {

    // first comment

    'a' => 1,



    /*
     * second comment
     */



    'b' => 2,
    default => null
};
