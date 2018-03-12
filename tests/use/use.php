<?php
namespace foo;

use My\Full\Classname as Another;
use MyVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeyLongNamespace\Full\Classname as Another;
use function some\Full\fn_a;
use function My\Full\functionName as func;
use const My\Full\CONSTANT;
use My\Full\Classname as Another, My\Full\NSname;
use MyVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeyLongNamespace\Full\Classname as Another, MyVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeyLongNamespace\Full\NSname;
use some\Full\{ClassA, ClassB, ClassC as C};
use function some\Full\{fn_a, fn_b, fn_c};
use const some\Full\{ConstA, ConstB, ConstC};
use Vendor\Package\SomeNamespace\{
    SubnamespaceOne\ClassA,
    SubnamespaceOne\ClassB,
    SubnamespaceTwo\ClassY,
    ClassZ
};
