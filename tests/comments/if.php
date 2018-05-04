<?php
// Comment
if (1) { // Comment
    // Comment
    echo "Foo"; // Comment
    // Comment
}
// Comment
elseif (2) { // Comment
    // Comment
    echo "Bar";
    // Comment
}
// Comment
else { // Comment
    // Comment
    echo "FooBar";
    // Comment
} // Comment

if (/* Comments */ true /* Comments */) {
} elseif (/* Comments */ false /* Comments */) {
} else {}


if (2 /* MB_OVERLOAD_STRING */ & (int) ini_get('mbstring.func_overload')) {
  mb_internal_encoding('ASCII');
}
