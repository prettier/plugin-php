<?php
$string = 'this is a simple string';
$string = 'You can also have embedded\n newlines in
strings this way as it is
okay to do';
$string = "You can also have embedded\n newlines in
strings this way as it is
okay to do";
$string = 'Arnold once said: "I\'ll be back"';
$string = 'You deleted C:\\*.*?';
$string = 'You deleted C:\*.*?';
$string = 'This will not expand: \n a newline';
$string = 'Variables do not $expand $either';
$string = 'qwe{$a}rty';
$string = 'qwe${a}rty';
$string = 'qwe{${$a}}rty';
$string = "foo\nbar";
$string = "foo\rbar";
$string = "foo\tbar";
$string = "foo\vbar";
$string = "foo\ebar";
$string = "foo\fbar";
$string = "foo\\bar";
$string = "foo\\\bar";
$string = "foo\\\\bar";
$string = "foo\$bar";
$string = "foo\\\$bar";
$string = "foo\"bar";
$string = "foo\"";
$string = "foo'bar";
$string = "foo\377bar";
$string = "foo\3";
$string = "foo\xFFbar";
$string = "foo\xr";
$string = "foo\x";
$string = "foo\u{ff}bar";
$string = "foo\ubar";
$string = "foo\u";
$string = "simple $encapsed";
$string = "simple $encapsed[0]";
$string = "encapsed variable ${name}.";
$string = "encapsed variable {$value}.";
$string = "encapsed offset {$value[0]}.";
$string = "encapsed {$method->call()}.";
$string = "combined ${$encapsed}.";
$string = "He drank some $juices[koolaid1] juice.";
$string = "$people->john drank some $juices[0] juice.";
$string = "This is { $great}";
$string = "This is {$great}";
$string = "This square is {$square->width}00 centimeters broad.";
$string = "This works: {$arr['key']}";
$string = "This works: {$arr[4][3]}";
$string = "This works: " . $arr['foo'][3];
$string = "This works too: {$obj->values[3]->name}";
$string = "This is the value of the var named $name: {${$name}}";
$string = "This is the value of the var named by the return value of getName(): {${getName()}}";
$string = "This is the value of the var named by the return value of getName(): {${getName($arg1, $arg2, $arg3)}}";
$string = "This is the value of the var named by the return value of \$object->getName(): {${$object->getName()}}";
$string = "I'd like an {${beers::softdrink}}\n";
$string = "I'd like an {${beers::$ale}}\n";
$test = "\\";
$test = '\\';
printf("Query run in $queryTimeTaken seconds.\n");
$test = "You can also have embedded\n newlines in
strings this way as it is
okay to do";
$test = '/(<a\b[^><]*)>/i';
$string = "\"encapsed $escaping\"";
$string = 'VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString';
$string = "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString\n";
$string = "ShortString\n";
$string = 'ShortString\n';
$string = "\u{aa}";
$string = "\u{0000aa}";
$string = "\u{9999}";
