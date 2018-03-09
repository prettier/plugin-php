<?php
$encapsShell = `a $b`;
$encaps = "one $b";
$encapsHereDoc = <<<STR
 Hello $a
STR;
$encapsHereDoc2 = <<<STR
Hello foo $a bar
new line
STR;
