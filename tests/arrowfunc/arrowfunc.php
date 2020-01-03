<?php
$var = fn() => "something";
$var = fn($arg) =>  "something";
$var = fn(&$arg) => "something";
$var = fn($arg, $arg, $arg) => "something";
$var = fn(): ?string => "something";

call(fn($arg) => $arg);
