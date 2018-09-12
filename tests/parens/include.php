<?php

include 'foo.php';
(include 'foo.php');

include $var;
(include $var);
(include ($var));

$var = include 'foo.php';
$var = (include 'foo.php');
$var = include $var;
$var = (include $var);
$var = (include ($var));

function foo() {
    include 'foo.php';
    (include 'foo.php');
}

if (include('vars.php') == TRUE) {}
if ((include 'vars.php') == TRUE) {}

include $path . 'example-config-file.php';
include ($path) . ('example-config-file.php');
include (($path) . ('example-config-file.php'));

include __DIR__ . '/../src/includeFile.php';
include (__DIR__) . ('/../src/includeFile.php');
include ((__DIR__) . ('/../src/includeFile.php'));

include(dirname(dirname(__FILE__)) . '/prepend.php');

include ($_GET['id'].".php");
