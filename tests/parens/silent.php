<?php

@foo();
(@foo());

$var = @foo();
$var = (@foo());

$var = @call() || @other();
$var = @(call()) || @(other_class());
$var = @(call() || call());

$var = @$cache[$key];
$var = @($cache[$key]);

$var = @new MyClass();
$var = @(new MyClass());

$var = (@include("file.php")) OR die("Could not find file.php!");

$var = @  $_GET['data'];

if (false === @fwrite($this->stream, $message) || ($newline && (false === @fwrite($this->stream, PHP_EOL)))) {
    // should never happen
    throw new RuntimeException('Unable to write output.');
}

try {
    if (($fp = @fopen($filename, "r")) == false) {
        throw new Exception;
    } else {
        do_file_stuff();
    }
} catch (Exception $e) {
    handle_exception();
}

@list($width, $height) = getimagesize($file);
// Todo https://github.com/glayzzle/php-parser/issues/356
// @(list($width, $height) = getimagesize($file));

@$var += 10;
// Todo https://github.com/glayzzle/php-parser/issues/356
// @($var += 10);

echo @(1 / 0);

@$i / 0;
@($i / 0);
