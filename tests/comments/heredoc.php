<?php
$str = /* Comment */<<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD;
/* Comment */

echo $str;

// Comment
$var = <<<HERE
string
HERE;
// Comment
