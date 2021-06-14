<?php

throw new Exception('Division by zero.');
throw (new Exception('Division by zero.'));
throw $e;
throw ($e);
throw new \Exception("Bye");
throw (new \Exception("Bye"));

if (!$var) {
    throw new Exception('Division by zero.');
    throw (new Exception('Division by zero.'));
    throw $e;
    throw ($e);
    throw new \Exception("Bye");
    throw (new \Exception("Bye"));
}

die(throw new \Exception('In Statement'));
$throws = fn() => throw new \RuntimeException('In arrow function');
$value = $a ? $a : throw new \InvalidArgumentException('In ternary');