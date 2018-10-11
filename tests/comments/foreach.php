<?php
// Comment
foreach ($iterable as $value) { // Comment
    // Comment
    echo 'Foo'; // Comment
    // Comment
} // Comment


foreach (/* Comments */ $iterable /* Comments */ as /* Comments */ $value /* Comments */) {}

foreach (/* Comments */ $iterable /* Comments */ as /* Comments */ $key /* Comments */ => /* Comments */ $value /* Comments */) {}

foreach ($x
/*a*/
as //b
$y) //c
{};

foreach ($x as /*a*/ //b
$y) {}; //c

foreach ($x /*a*/ as $y) {}; //b //c

foreach ($x
//a
as $y) {};

foreach($x as
//a
$y) {};

foreach (
    // Comment
    $arr as &$value
) {
}

foreach (
    $arr
    as $key =>
        // Comment
        $value
) {
}
