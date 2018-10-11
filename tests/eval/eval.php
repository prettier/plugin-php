<?php
eval('return 1;');
eval("return $a;");
eval("$veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongVariableName = $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongVariableValue;");
eval("VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongText" . "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongText" . "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongText");
eval('string
string
string');
eval(
    'string
string
string'
);
eval("string
string
string
$var");
eval(
    "string
string
string
$var"
);
eval(`string
string
string
$var`);
eval(
`string
string
string
$var`
);
eval(<<<FOO
string
string
string
$var
FOO
);
eval(<<<'FOO'
string
string
string
FOO
);
