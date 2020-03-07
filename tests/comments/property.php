<?php

$var = new class {
    public $name =
        // Comment 1
        // Comment 2
        'string';
};

$var = new class {
    public $name = // Comment 1
        // Comment 2
        'string';
};

$var = new class {
    public
        // Comment 1
        $name
        // Comment 2
        =
        // Comment 3
        'string';
};

$var = new class {
    public
        // Comment 1
        static
        // Comment 2
        $name
        // Comment 3
        =
        // Comment 4
        'string';
};

class Foo {
    var $name1 = // Comment 1
        // Comment 2
        'string';
    private $name2 = // Comment 1
        // Comment 2
        'string';
    protected $name3 = // Comment 1
        // Comment 2
        'string';
    public $name4 = // Comment 1
        // Comment 2
        'string';

    public $bar = // Comment 1
        // Comment 2
        <<<'EOT'
bar
EOT;

    public $baz = // Comment 1
        // Comment 2
        <<<EOT
baz
EOT;

    public $var1 = // Comment 1
        // Comment 2
        'hello ' . 'world';

    public static $my_static = // Comment 1
        // Comment 2
        'foo';
}