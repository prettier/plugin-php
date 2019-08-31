<?php

foo(
    'constructor',
    'bar',
);

$foo = new Foo(
    'constructor',
    'bar',
);

$foo = new class('constructor', 'bar',){};

$foo->bar(
    'method',
    'bar',
);

$foo(
    'invoke',
    'bar',
);

$var = strlen($var,);

var_dump(
    $whatIsInThere,
    $probablyABugInThisOne,
    $oneMoreToCheck,
);

echo $twig->render(
    'index.html',
    compact(
        'title',
        'body',
        'comments',
    )
);

$newArray = array_merge(
    $arrayOne,
    $arrayTwo,
    ['foo', 'bar'],
);

$en = 'A trailing %s makes %s a happy developer.';
$text = sprintf(
    $en,
    'comma',
    'Jane',
);