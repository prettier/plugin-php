<?php

// comment 1
try {
    // comment 2
}
// comment 3
catch(Expection $e) {
    // comment 4
}
// comment 5
finally // comment 6
{
    // comment 7
}

// comment 1
try {
    // comment 2
}
// comment 3
finally // comment 4
{
    // comment 5
}

// comment 1
try {
    // comment 2
}
// comment 3
catch(OtherException $e) {
    // comment 4
}
// comment 5
catch(Expection $e) {
    // comment 6
}
// comment 7
finally // comment 8
{
    // comment 9
}
// comment 10

// Comment 1
try { // Comment 2
    // Comment 3
}
    // Comment 4
catch(Exception $e) { // Comment 5
    // Comment 6
}
    // Comment 7
finally { // Comment 8
    // Comment 9
}
// Comment 10

try // Comment
{
    $a =  new Foo();
} catch (Exception $e) {
    $b = new Bar();
} finally // Comment 8
{
    $a = null;
}
