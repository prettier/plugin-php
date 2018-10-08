<?php

$var = new class {
    const CONSTANT =
        // Comment 1
        // Comment 2
        'string';
};

$var = new class {
    const CONSTANT = // Comment 1
        // Comment 2
        'string';
};

$var = new class {
    const
        // Comment 1
        CONSTANT
        // Comment 2
        =
        // Comment 3
        'string';
};

$var = new class {
    public
        // Comment 1
        const
        // Comment 2
        CONSTANT
        // Comment 3
        =
        // Comment 4
        'string';
};
