<?php

// Comment
declare(strict_types=1);
// Comment

// Comment
namespace Vendor\Package;
// Comment

// Comment
use Vendor\Package\{ClassA as A, ClassB, ClassC as C};
// Comment
// Comment
use Vendor\Package\SomeNamespace\ClassD as D;
// Comment

// Comment
use function Vendor\Package\{functionA, functionB, functionC};
// Comment

// Comment
use const Vendor\Package\{ConstantA, ConstantB, ConstantC};
// Comment

// Comment
class Foo extends Bar implements FooInterface
{
    // Comment
    public function sampleFunction(int $a, int $b = null): array
    {
        // Comment
        if ($a === $b) {
            // Comment
            bar();
        } elseif ($a > $b) {
            $foo->bar($arg1);
        } else {
            BazClass::bar($arg2, $arg3);
        }
        // Comment
    }

    // Comment
    final public static function bar()
    {
        // method body
    }
}
// Comment
