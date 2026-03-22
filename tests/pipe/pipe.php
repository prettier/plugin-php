<?php

$result = "Hello, World!" |> strtoupper(...);
$result = "Hello, World!" |> strtoupper(...) |> trim(...);
$result = "Hello, World!" |> strtoupper(...) |> trim(...) |> htmlspecialchars(...);

return $value |> transform(...);
echo $value |> format(...);

if ($x |> validate(...)) {}

$result = $value |> fn1(...) ?? $fallback;
$result = $value ?? $fallback |> fn1(...);

foo($value |> transform(...), $other);

$veryLongVariableName |> someVeryLongFunctionName(...) |> anotherVeryLongFunctionName(...);
