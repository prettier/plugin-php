<?php
$handler = (match ($kind) {
    'a' => fn() => 1,
    default => fn() => 2,
})();
$first = (match ($kind) { default => [1, 2] })[0];
$name = (match ($kind) { default => $object })->name;
$value = (match ($kind) { default => $object })?->name;
$result = (match ($kind) { default => $object })->handle();
$constant = (match ($kind) { default => Foo::class })::BAR;
$property = (match ($kind) { default => Foo::class })::$bar;
$instance = (match ($kind) { default => Foo::class })::create();
$plain = match ($kind) { default => 1 } + 1;
