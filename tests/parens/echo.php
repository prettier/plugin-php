<?php

echo "Hello World";
echo ("Hello World");

echo "Sum: ", 1 + 2;
echo "Hello ", isset($name) ? $name : "John Doe", "!";
echo "Hello ", (isset($name) ? $name : "John Doe"), "!";

echo 'Sum: ' . (1 + 2);
echo 'Hello ' . isset($name) ? $name : 'John Doe' . '!';
echo 'Hello ' . (isset($name) ? $name : 'John Doe') . '!';

echo $some_var ? 'true': 'false';
echo ($some_var ? 'true': 'false');

echo 'This ', 'string ', 'was ', 'made ', 'with multiple parameters.', chr(10);
echo ('This '), ('string '), ('was '), ('made '), ('with multiple parameters.'), (chr(10));
echo 'This ' . 'string ' . 'was ' . 'made ' . 'with concatenation.' . "\n";
echo ('This ') . ('string ') . ('was ') . ('made ') . ('with concatenation.') . ("\n");

echo <<<END
This uses the "here document" syntax to output
multiple lines with $variable interpolation. Note
that the here document terminator must appear on a
line with just a semicolon. no extra whitespace!
END;

echo (<<<END
This uses the "here document" syntax to output
multiple lines with $variable interpolation. Note
that the here document terminator must appear on a
line with just a semicolon. no extra whitespace!
END
);

echo (function () { return 'test'; })();
echo ((function () { return 'test'; })());
