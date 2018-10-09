<?php

// Comment
echo // Comment
    $foo, // Comment
    $bar // Comment
; // Comment

/* Comment */echo/* Comment */$foo/* Comment */,/* Comment */$bar/* Comment */;/* Comment */

echo // Comment
    $a;

echo // Comment
    call();

echo // Comment
    call($veryVeryVeryVeryVeryVeryVeryLongArg, $veryVeryVeryVeryVeryVeryVeryLongArg, $veryVeryVeryVeryVeryVeryVeryLongArg);

echo // Comment
<<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD;

echo // Comment
    <<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD
    ,
    $a;
