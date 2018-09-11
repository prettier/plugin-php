<?php

(function () {})();

$var = function () {};
$var = (function () {});
$var = (function () {})();
$var = ((function () {})())();
$func = static function() {};
$func = (static function() {});

function foo() {
    $var = (function () {});
    $var = (function () {})();
}

call(function () {}, function () {}, function () {});
call((function () {}), (function () {}), (function () {}));

var_dump(...(function() use ($type) {})());
