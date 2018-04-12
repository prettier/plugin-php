<?php

$str = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;

$str = <<<'EOT'
My name is "$name". I am printing some $foo->foo.
Now, I am printing some {$foo->bar[1]}.
This should not print a capital 'A': \x41
EOT;
