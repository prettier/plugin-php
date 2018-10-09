<?php

foo(/* Comment */ $a /* Comment */, /* Comment */ [] /* Comment */, /* Comment */ ($a + 2) /* Comment */);
foo(/* A */);
$foo->bar(/* B */);

render( // Comment
    'string',
    $container
);

$var->render( // Comment
    'string',
    $var
);

render(
    'string',
    $container
    // Comment
);

$var->render(
    'string',
    $var
    // Comment
);

$var->render(
    // Comment
    'string',
    // Comment
    $var
    // Comment
);
