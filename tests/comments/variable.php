<?php

$obj = // Comment 1
[
'key' => 'val'
];

$obj // Comment 2
= [
'key' => 'val'
];

$obj = [ // Comment 3
'key' => 'val'
];

$obj = [
// Comment 4
'key' => 'val'
];

$obj = // Comment 5
[
'val'
];

$obj // Comment 6
= [
'val'
];

$obj = [ // Comment 7
'val'
];

$obj = [
// Comment 8
'val'
];

$obj = // Comment 9
'val';

$obj = // Comment
'
val
val
';

$obj = // Comment
        '
    val
    val
    ';

$obj = // Comment
    "val";

$obj = // Comment
"
val
val
";

$obj = // Comment
        "
    val
    val
    ";

$obj = // Comment
    "val ${$var}";

$obj = // Comment
"
val 
${$var}
";

$obj = // Comment
    "
    val 
    ${$var}
    ";
