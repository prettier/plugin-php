<?php
$test = 1;
$test = (1);
$test = ((1));
$test = (((1)));

$var = (true);
$var = (false);

$var = ('string');
$var = ("string");
$var = ("string");

$var = (1234); // decimal number
$var = (-123); // a negative number
$var = -(123); // a negative number
$var = (0123); // octal number (equivalent to 83 decimal)
$var = (0x1A); // hexadecimal number (equivalent to 26 decimal)
$var = (0b11111111); // binary number (equivalent to 255 decimal)

$var = (__LINE__);

$var = (<<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD
);
$var = (
<<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD
);

$var = (<<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD
);

$var = (
<<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD
);

$var = ($var);
$var = ($$var);

function foo($a = (1), $b = ('string'), $c = (true), $d = (__LINE__))
{
    echo "Example function.\n";
}
