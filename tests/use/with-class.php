<?php
namespace foo;
use My\Full\Classname as Another;
class A {}

namespace bar;
use My\Full\Classname as Another;
use some\Full\{ClassA, ClassB, ClassC as C};
use function My\Full\functionName as func;
class A {}

namespace foobar;

use My\Full\Classname as Another;

class A {}
