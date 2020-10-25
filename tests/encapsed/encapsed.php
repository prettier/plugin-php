<?php
$encapsShell = `a $b`;
$encaps = "one $b";
$encapsHereDoc = <<<STR
 Hello $a
STR;
$encapsHereDoc2 = <<<STR
Hello foo $a bar
new line
STR;
$encapsHereDoc3 = <<<STR
encapsed variable ${name}
encapsed variable {$value}
STR;
echo <<<"FOOBAR"
Hello World!
FOOBAR;

$str = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;

function foo()
{
    $string = <<<EOJS
some text
should not indent
EOJS;
    $string = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;
}

class test {
    public function get_string(){
        $string = <<<EOJS
         some text
should not indent
EOJS;
        return $string;
    }
}

$code = <<<EOF
<?php
\$kernel = unserialize('$kernel');
\$request = unserialize('$request');
EOF;
$content = sprintf(<<<EOF
foo
EOF
);
$content = array(<<<EOF
foo
EOF
, "bar"
);
$content = array(
    "bar",
    <<<EOF
foo
EOF
);

function foo($a = 1, $b = <<<EOF
Example of string
spanning multiple lines
using nowdoc syntax.
EOF
    , $c = 1
) {
    echo $b;
}

function foo1(
    $a = 1,
    $b = <<<EOF
Example of string
spanning multiple lines
using nowdoc syntax.
EOF
    ,
    $c = 1
) {
    echo $b;
}

function foo1(
    $a = 1,
    $b = <<<EOF
Example of string
spanning multiple lines
using nowdoc syntax.
EOF
) {
    echo $b;
}

$var = "string {$string} string"[1];
$var = $foo->bzr_{1};
$var = $foo->bzr_{'string'};
$var = $foo->bzr_{$baz};
$var = $foo->bzr_{$baz->foo};
$var = $foo->bzr_{$var ? 'one' : 'two'};
$var = $foo->bzr_{$veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar ? $veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar : $veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar};
$var = $foo->bzr_{(function () { return 1; })($var)};

$var = "{$this->target->resource->binary}";
$var = "{$veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongVar()}";
$var = "{$this->target->resource->binary['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVertyVeryLongString']}";
$var = "{$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo}";
$var = "{$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo()}";
$var = "{$this->target->resource->binary} {$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo}";
$var = "{$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo} {$this->target->resource->binary}";
$var = "{$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo} {$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo}";
$var = "{$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo()} {$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo()}";
$var = "My name is {${getName($arg, 'string', 1024, $var ? true : false, ['foo' => 'bar', 'bar' => 'foo'])}}";
$var = "My name is {${getName($veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar, $veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar, $veryVeryVeryVeryVeryVeryVeryVeryVeryLongVar)}}";

$encapsHereDoc = <<<STR
 Hello World {$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo}
 Hello World {$this->target->resource->binary->foo->bar->foobar->bar->foo->foobar->bar->foo()}
STR;


$var =  $this->swift->{'set'}($address, $name);
$var =  $this->swift->{'set' . 'Offset'}($address, $name);
$var =  $this->swift->{"set"}($address, $name);
$var =  $this->swift->{"set{$type}"}($address, $name);

$var = "string ${$var} string";
$var = "string $var string";
$var = "string {$var} string";
$var = "string $var->foo string";
$var = "string {$var->foo} string";
$var = "string $var->foo->baz string";
$var = "string {$var->foo->bar} string";
$var = "string {$var->call()} string";
$var = "string {$var::$foo} string";
$var = "string {$var::call()} string";
$var = "string $var[0] string";
$var = "string {$var[0]} string";
$var = "string $var[0][0] string";
$var = "string {$var[0][0]} string";
$var = "string $var[0]->bar string";
$var = "string {$var[0]->bar} string";
$var = "string {${$var}} string";
$var = "string {${call()}} string";
$var = "string {${$var->foo}} string";
$var = "string {${$var->call()}} string";
$var = "string {${$var::$var}} string";
$var = "string {${$var::call()}} string";
$var = "string $foo->{$baz[1]} string";
$var = "string {$foo->{$baz[1]}} string";
$var = "string {$var->foo->bar/* Comment */} string";
$var = "string {$var->foo->bar  /* Comment */   } string";
$var = "string {$var->foo->bar
} string";

$expected = array(
    'test' => <<<'EOT'
foo
# bar
baz

EOT
,
    'foo' => 'bar'
);
$expected = array(
    'foo' => 'bar',
    'test' => <<<'EOT'
foo
# bar
baz

EOT
);
$expected = array(
    'foo' => <<<'EOT'
foo
# bar
baz

EOT
,
    'bar' =>  <<<'EOT'
foo
# bar
baz

EOT
,
    'baz' =>  <<<'EOT'
foo
# bar
baz

EOT
,
);
$expected = array(
    'test' => <<<'EOT'
foo
# bar
baz

EOT
,
    'collection' => array(
        array(
            'one' => <<<'EOT'
foo
# bar
baz

EOT
        ),
        array(
            'two' => <<<'EOT'
foo
# bar
baz
EOT
        )
    )
);

$var = <<<EOF
string
string
string
EOF
    . $var;

$var = $var . <<<EOF
string
string
string
EOF;

$var = $var . <<<EOF
string
string
string
EOF
    . $var;

$var = <<<EOF
string
string
string
EOF
    . $var
    . $var;

$var = $var . $var . <<<EOF
string
string
string
EOF;

$var = $var . $var . <<<EOF
string
string
string
EOF
    . $var
    . $var;

$var = <<<EOF
string
string
string
EOF
    .
    <<<EOF
string
string
string
EOF;

$var = <<<EOF
string
string
string
EOF
    . $var
    . <<<EOF
string
string
string
EOF;

$var = $var . <<<EOF
string
string
string
EOF
    . $var
    . <<<EOF
string
string
string
EOF
    . $var;

$str = <<<EOD
EOD;

$str = <<<EOD

EOD;

$str = <<<EOD


EOD;

$str = <<<EOD



EOD;

$str = <<<EOD
string
EOD;

$str = <<<EOD
string
string
EOD;

$str = <<<EOD
string
string
string
EOD;

$var = "String {$obj->call()->call()} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj->call()->call()} string";
$var = "String {$obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()->call()} string";
$var = "String {$obj->call()->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()} string";

$var = "String {$array['offset']['offset']} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameArray['offset']['offset']} string";
$var = "String {$array['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongOffset']['offset']} string";
$var = "String {$array['offset']['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongOffset']} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameArray['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongOffset']['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongOffset']} string";

$var = "String {$obj::call()::call()} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj::call()::call()} string";
$var = "String {$obj::veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()::call()} string";
$var = "String {$obj::call()::veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj::veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()::veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()} string";

$var = "String string string string string string string string string string string string string {$obj->call()->call()} string";
$var = "String {$obj->call()->call()} string string string string string string string string string string string string string";

$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall['offset']->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall['offset']} string";
$var = "String {$veryVeryVeryVeryVeryVeryVeryVeryVaryVaryVaryVaryVaryLongNameObj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()['offset']->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCall()['offset']} string";

echo "This is my array value: $anArray[key]";
echo "This is my array value: $anArray[$key]";
echo "This is my array value: {$anArray[key]}";
echo "This is my array value: {$anArray[$var]}";

$message = "Unresolvable dependency resolving [$parameter] in class {$parameter->getDeclaringClass()->getName()}";

$var = "string ${juices['FOO']} string";

// T_VARIABLE
echo "text $foo text.";

// T_VARIABLE '[' encaps_var_offset ']'
echo "text $foo[name] text.";
echo "text $foo[1] text.";
// echo "text $foo[-1] text.";
echo "text $foo[$var] text.";
echo "text $foo[koolaid1] text.";

// T_VARIABLE T_OBJECT_OPERATOR T_STRING
echo "text $foo->bar text.";

// T_DOLLAR_OPEN_CURLY_BRACES expr '}'
echo "text ${$test} text.";
echo "text ${$$$test} text.";
echo "text ${call()} text.";
echo "text ${true || false} text.";
echo "text ${$var ? 'foo' : 'bar'} text.";
echo "text ${'test' + 'test'} text.";
echo "text ${'test'} text.";

// T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '}'
echo "text ${foo} text";

// T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '[' expr ']' '}'
echo "text ${foo['foo']} text";
echo "text ${foo[foo]} text";
echo "text ${foo[call()]} text";
echo "text ${foo[$var ? 'foo' : 'bar']} text";

// T_CURLY_OPEN variable '}'
echo "text {$var} text";
echo "text {$var['test']} text";
echo "text {$var->test} text";
echo "text {$var::$test} text";

echo <<<   END
  a
 b
c
END;

echo <<<	END
  a
 b
c
END;

echo <<<   'END'
  a
 b
c
END;

echo <<<	'END'
  a
 b
c
END;

$php73FlexibleHeredoc = <<<EOD
       $a
      b
     c
     EOD;

$php73FlexibleHeredoc2 = <<<EOD
      $a
     b
    c
  EOD;

$xml = <<<XML
     foo{$bar}bazzzzz
    XML;

function foo() {
    $xml = <<<XML
        foo{$bar}bazzzzz
        XML;
}
