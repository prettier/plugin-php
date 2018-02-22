<?php
namespace \test\testing;

include "test.php";
include_once "other.php";
require "test/test.php";
require_once "other/other.php";

include("test.php");
include_once("other.php");
require("test/test.php");
require_once("other/other.php");

if ((include 'vars.php') == TRUE) {
  echo 'OK';
}

include 'php/product' . $variable . '.php';

include ( "test.php" );
include_once ( "other.php" );
require ( "test/test.php" );
require_once ( "other/other.php" );
