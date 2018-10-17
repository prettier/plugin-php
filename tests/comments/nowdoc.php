<?php
$str = /* Comment */<<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;
/* Comment */

echo $str;

// Comment
$var = <<<'NOW'
string
NOW;
// Comment
