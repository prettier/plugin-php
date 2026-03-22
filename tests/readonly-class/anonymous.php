<?php

new readonly class() {};
new readonly class {};
new readonly class($one, $two, $three) {};

$class = new readonly class {};
$class = new readonly class() {};
$class = new readonly class { public int $x = 0; };
$class = new readonly class implements MyInterface {};
$class = new readonly class implements MyInterface, MyOtherInterface {};
$class = new readonly class extends MyParent {};
$class = new readonly class extends MyParent implements MyInterface {};
$class = new readonly class extends MyParent implements MyInterface, MyOtherInterface {};

$class = new readonly class implements VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyOtherClass {};
$class = new readonly class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass {};
$class = new readonly class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass implements MyI, MyII, MyIII {};

$class = new readonly class($one, $two) implements MyInterface {};
$class = new readonly class($one, $two) extends MyParent implements MyInterface {};
