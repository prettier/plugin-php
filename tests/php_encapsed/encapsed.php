<?php
$encapsShell = `a ${b}`;
$encaps = "one $b";
// TODO add full "curly" support
// see https://github.com/glayzzle/php-parser/issues/101
$encapsCurly = "two {$b}s";
$encapsCurly2 = "two ${b}s";
$encapsHereDoc = <<<STR
 Hello $a
STR;
$encapsHereDoc2 = <<<STR
Hello foo $a bar
new line
STR;
$encapsedOffset = $a->bar$b;
