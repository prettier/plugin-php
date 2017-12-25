<?php
$encapsShell = `a ${b}`;
// TODO add full "curly" support
// see https://github.com/glayzzle/php-parser/issues/101
$encapsCurly = "two {$b}s";
$encapsCurly2 = "two ${b}s";
