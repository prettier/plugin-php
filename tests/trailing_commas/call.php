<?php

foo(
    'constructor',
    'bar',
);

foo(
    'constructor',
    'bar',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

$foo = new Foo(
    'constructor',
    'bar',
);

$foo = new Foo(
    'constructor',
    'bar',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

$foo = new class('constructor', 'bar',){};

$foo = new class(
    'constructor',
    'bar',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
){};

$foo->bar(
    'method',
    'bar',
);

$foo->bar(
    'method',
    'bar',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

$foo(
    'invoke',
    'bar',
);

$foo(
    'invoke',
    'bar',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

$var = strlen($var,);

$var = strlen($var,  'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',);

var_dump(
    $whatIsInThere,
    $probablyABugInThisOne,
    $oneMoreToCheck,
);

var_dump(
    $whatIsInThere,
    $probablyABugInThisOne,
    $oneMoreToCheck,
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

echo $twig->render(
    'index.html',
    compact(
        'title',
        'body',
        'comments',
    )
);

echo $twig->render(
    'index.html',
    compact(
        'title',
        'body',
        'comments',
        'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
    )
);

$newArray = array_merge(
    $arrayOne,
    $arrayTwo,
    ['foo', 'bar'],
);

$newArray = array_merge(
    $arrayOne,
    $arrayTwo,
    $arrayTwo,
    $arrayTwo,
    $arrayTwo,
    $arrayTwo,
    ['foo', 'bar',],
);

$en = 'A trailing %s makes %s a happy developer.';
$text = sprintf(
    $en,
    'comma',
    'Jane',
);

$text = sprintf(
    $en,
    'comma',
    'Jane',
    'very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',
);

call(['very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',],['very-very-very-very-very-very-very-very-very-very-very-very-veru-long-string',],);

call(<<<'EOT'
My name is "$name". I am printing some $foo->foo.
Now, I am printing some {$foo->bar[1]}.
This should not print a capital 'A': \x41
EOT
    ,
);

call(<<<EOT
My name is "$name". I am printing some $foo->foo.
Now, I am printing some {$foo->bar[1]}.
This should not print a capital 'A': \x41
EOT
    ,
);

$sel = $this->connections

    ->concat($this->activities->concat($this->operators))
    ->filter(function ($x) { return $x->selected; });

$sel = $this->connections

    ->concat($this->activities->concat($this->operators))
    ->filter(function ($x) { return $x->selected; }, function ($x) { return $x->selected; },);