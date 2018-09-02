<?php

$foo = ['foo', 'bar'];
$foo = ['foo', 'bar',];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2'];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2',];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar'];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar',];
$foo = array('foo', 'bar');
$foo = array('foo', 'bar',);
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2');
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2',);
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar');
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar',);
$packages = array_merge(
    idx($composer, 'require', []),
    idx($composer, 'require-dev', [])
);
