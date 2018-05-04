<?php
// Comment 1
if (1) { // Comment 2
    // Comment 3
    echo "Foo"; // Comment 4
    // Comment 5
}
// Comment 6
elseif (2) { // Comment 7
    // Comment 8
    echo "Bar";
    // Comment 9
}
// Comment 10
else { // Comment 11
    // Comment 12
    echo "FooBar";
    // Comment 13
} // Comment 14

if (/* Comments */ true /* Comments */) {
} elseif (/* Comments */ false /* Comments */) {
} else {}


if (2 /* MB_OVERLOAD_STRING */ & (int) ini_get('mbstring.func_overload')) {
  mb_internal_encoding('ASCII');
}

// this is a comment on an if
if (false)
    do_nothing();

// and this is a comment on an elseif
elseif (false)
    also_do_nothing();
