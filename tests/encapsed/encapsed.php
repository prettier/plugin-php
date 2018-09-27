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
