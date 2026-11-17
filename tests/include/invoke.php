<?php
(include 'a.php')();
(require 'b.php')();
(include_once 'c.php')();
(require_once 'd.php')();
$x = (include 'e.php')->prop;
$y = (include 'f.php')['key'];
$z = (include 'g.php')?->method();
$w = (include 'h.php')::CONSTANT;
