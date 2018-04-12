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
