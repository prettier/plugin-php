<?php

$str = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;

$str = <<<'EOT'
My name is "$name". I am printing some $foo->foo.
Now, I am printing some {$foo->bar[1]}.
This should not print a capital 'A': \x41
EOT;

$str = <<<'EOL'
"test" foo 'test'
EOL;

$str = array(<<<'EOF'
foo
EOF
, "bar"
);

$str = array(
    "bar",
    <<<'EOF'
foo
EOF
);

$str = sprintf(<<<'EOF'
foo
EOF
);

$str = sprintf(<<<'EOF'
foo
EOF
, true);

$str = sprintf(<<<EOD
foo
EOD
, true);

function foo($a = 1, $b = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD
, $c = 1
) {
    echo $b;
}

function foo1(
    $a = 1,
    $b = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD
    ,
    $c = 1
) {
    echo $b;
}

function foo1(
    $a = 1,
    $b = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD
) {
    echo $b;
}

$var = <<<'EOF'
string
string
string
EOF
    . $var;

$var = $var . <<<'EOF'
string
string
string
EOF;

$var = $var . <<<'EOF'
string
string
string
EOF
    . $var;

$var = <<<'EOF'
string
string
string
EOF
    . $var
    . $var;

$var = $var . $var . <<<'EOF'
string
string
string
EOF;

$var = $var . $var . <<<'EOF'
string
string
string
EOF
    . $var
    . $var;

$var = <<<'EOF'
string
string
string
EOF
    .
    <<<'EOF'
string
string
string
EOF;

$var = <<<'EOF'
string
string
string
EOF
    . $var
    . <<<'EOF'
string
string
string
EOF;

$var = $var . <<<'EOF'
string
string
string
EOF
    . $var
    . <<<'EOF'
string
string
string
EOF
    . $var;

$str = <<<'EOD'
EOD;

$str = <<<'EOD'

EOD;

$str = <<<'EOD'


EOD;

$str = <<<'EOD'



EOD;

$str = <<<'EOD'
string
EOD;

$str = <<<'EOD'
string
string
EOD;

$str = <<<'EOD'
string
string
string
EOD;

static $var =  <<<'EOD'
string
string
string
EOD;

static
    $var =  <<<'EOD'
    string
    string
    string
EOD
    ,
    $foo;

static
    $foo,
    $var =  <<<'EOD'
string
string
string
EOD;

call(
    <<<'EOD'
string
string
string
EOD
);

call(
    $a,
    <<<'EOD'
string
string
string
EOD
);

call(
    <<<'EOD'
string
string
string
EOD
    ,
    $b
);

$var = new class(
    <<<'EOD'
string
string
string
EOD
) {};

$var = new class(
    $a,
    <<<'EOD'
string
string
string
EOD
) {};

$var = new class(
    <<<'EOD'
string
string
string
EOD
    ,
    $b
) {};

echo <<<'EOD'
string
string
string
EOD;

echo
$a,
<<<'EOD'
string
string
string
EOD;

echo <<<'EOD'
string
string
string
EOD
,
$a;

print  <<<'EOD'
string
string
string
EOD;

return  <<<'EOD'
string
string
string
EOD;

eval(
<<<'EOD'
string
string
string
EOD
);

include <<<'EOD'
string
string
string
EOD;

exit(
<<<'EOD'
string
string
string
EOD
);

const MIN_VALUE = <<<'EOD'
string
string
string
EOD;

$var = (bool) <<<'EOD'
string
string
string
EOD;

class Foo {
    public $var = <<<'EOD'
string
string
string
EOD;
    public const FOO = <<<'EOD'
string
string
string
EOD;

    public function test($var = <<<'EOD'
string
string
string
EOD
    ) {
    }
    public function test1($var, $var = <<<'EOD'
string
string
string
EOD
    ) {
    }
    public function test2($var = <<<'EOD'
string
string
string
EOD
        ,
      $var
    ) {
    }
}

declare(ticks=1) {
    <<<'EOD'
string
string
string
EOD;
    $str = <<<'EOD'
string
string
string
EOD;
}

function foo() {
    <<<'EOD'
string
string
string
EOD;
    $str = <<<'EOD'
string
string
string
EOD;
}

$var = function () {
    <<<'EOD'
string
string
string
EOD;
    $str = <<<'EOD'
string
string
string
EOD;
};

$a = [
    <<<'EOD'
string
string
string
EOD
];

$a = [
    <<<'EOD'
string
string
string
EOD
    ,
];

$a = [
    $a,
    <<<'EOD'
string
string
string
EOD
];

$a = [
    <<<'EOD'
string
string
string
EOD
    ,
    $a
];

$a = [
    'key' => <<<'EOD'
string
string
string
EOD
];

$a = [
    'key' => <<<'EOD'
string
string
string
EOD
    ,
];

$a = [
    'other-key' => $a,
    'key' => <<<'EOD'
string
string
string
EOD
];

$a = [
    'key' => <<<'EOD'
string
string
string
EOD
    ,
    'other-key' => $a
];

switch ($i) {
    case <<<'TXT'
string
TXT
    :
        print <<<'TXT'
string
TXT;
        break;

    case <<<'TXT'
other
TXT
    :
        break;
    default:
        print <<<'TXT'
string
TXT;
}


