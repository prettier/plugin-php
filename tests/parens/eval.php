<?php

eval('return 1;');
(eval('return 1;'));
(eval(('return 1;')));

$var = eval('return 1;');
$var = (eval('return 1;'));
$var = (eval(('return 1;')));

if (eval('return 1;')) {}
if ((eval('return 1;'))) {}

if ((eval('return 1;')) === 1) {}
