<?php

print("Hello World");
(print("Hello World"));

print "print() also works without parentheses.";

print "This spans
multiple lines. The newlines will be
output as well";
(print "This spans
multiple lines. The newlines will be
output as well");

print <<<END
This uses the "here document" syntax to output
multiple lines with $variable interpolation. Note
that the here document terminator must appear on a
line with just a semicolon no extra whitespace!
END;

print (<<<END
This uses the "here document" syntax to output
multiple lines with $variable interpolation. Note
that the here document terminator must appear on a
line with just a semicolon no extra whitespace!
END
);

if (print("foo") && print("bar")) {
}

if ((print("foo")) && (print("bar"))) {
}

$var = $var ? print "$string_message<br />" : print "$string_message\n";
$var = $var ? (print "$string_message<br />") : (print "$string_message\n");
$var = $var ? (print ("$string_message<br />")) : (print ("$string_message\n"));

print 1 . print(2) + 3; // 511
print 1 . (print(2)) + 3; // 214

print ($var || $var) && $var;
print (($var || $var) && $var);
