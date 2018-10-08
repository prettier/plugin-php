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
