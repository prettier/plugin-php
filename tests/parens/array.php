<?php

array();
(array());

[];
([]);

$var = array();
$var = (array());

$var = [];
$var = ([]);

$var = array("1", "2", "3");
$var = (array("1", "2", "3"));
$var = array(array("1"), array("2"), array("3"));
$var = (array(array("1"), array("2"), array("3")));
$var = array((array("1")), (array("2")), (array("3")));
$var = (array((array("1")), (array("2")), (array("3"))));

$var = array("foo", "bar")();
$var = (array("foo", "bar"))();
$var = ((array("foo", "bar")))();

$var = ["foo", "bar"]();
$var = (["foo", "bar"])();
$var = ((["foo", "bar"]))();

$arr = [$var, $other_var];
$arr = [($var), ($other_var)];
$arr = [('key') => ($var), ('other-key') => ($other_var)];
$arr = ([('key') => ($var), ('other-key') => ($other_var)]);

[$var, $other_var] = $arr;
[($var), ($other_var)] = $arr;
[('key') => ($var), ('other-key') => ($other_var)] = $arr;

$var = array(1, 2, 3)[1];
$var = (array(1, 2, 3))[1];
$var = [1, 2, 3][1];
$var = ([1, 2, 3])[1];
$var = array(new stdClass())[0];
$var = (array((new stdClass())))[0];
$var = [new stdClass()][0];
$var = ([(new stdClass())])[0];
