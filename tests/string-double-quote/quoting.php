<?php
// rewrite simple strings
'rewrite me';
// don't rewrite complex strings
'$foo';
'{$foo}';
'${foo} bar';
'${$foo}';
'\n';
'\r';
'\t';
'\v';
'\e';
'\f';
'\f';
'\f';
'\'';
'\$';
'don\'t';
'\1';
'\12';
'\123';
'\x0';
'\xAF';
'\u{aa}';
'\u{0000aa}';
'\u{9999}';
'multi
line';
'\\';
"\\";
"'";
'"';
b'binary string';
b'binary string';
b'binary string\n';
b'binary string\n';
