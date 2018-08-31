<?php
DECLARE(ticks=1);

NAMESPACE Vendor\Package;

USE FooClass;
USE BarClass AS Bar;

INTERFACE iTemplate {}

ABSTRACT CLASS AbstractClass
{
    ABSTRACT PROTECTED FUNCTION getValue();
    ABSTRACT PROTECTED FUNCTION prefixValue($prefix);

    PUBLIC function printOut() {
        PRINT $this->getValue();
    }
}

TRAIT ezcReflectionReturnInfo {
    FUNCTION getReturnType() { /* 1 */ }
    FUNCTION getReturnDescription() { /* 2 */ }
}

FINAL CLASS MyClass EXTENDS Bar IMPLEMENTS iTemplate
{
    USE A, B {
        B::smallTalk INSTEADOF A;
        A::bigTalk INSTEADOF B;
        B::bigTalk AS talk;
    }

    CONST CONSTANT = 'CONSTANT';

    PUBLIC $public = 'Public';

    PROTECTED $protected = 'Protected';

    PRIVATE $private = 'Private';

    VAR $foo = 'Bar';

    FUNCTION printHello()
    {
        ECHO $this->public;

        $myclass = NEW MyClass();

        $true = TRUE;
        $false = FALSE;
        $null = NULL;
        $other_null = nUlL;
        $null_string = "NULL";

        IF ($expr1) {
            // IF body
        } ELSEIF ($expr2) {
            // ELSEIF body
        } ELSE IF ($expr3) {
            // ELSE IF body
        } ELSE {
            // Else body
        }

        SWITCH ($expr) {
            CASE 0:
                ECHO 'First case, with a break';
                BREAK;
            CASE 1:
            CASE 4:
                ECHO 'Third case, return instead of break';
                RETURN;
            DEFAULT:
                ECHO 'Default case';
                BREAK;
        }

        WHILE (LIST($key, $value) = foo($arr)) {
            if (!($key % 2)) {
                CONTINUE;
            }

            do_something_odd($value);
        }

        DO {
            // Structure body
        } WHILE ($expr);

        FOR ($i = 0; $i < 10; $i++) {
            // For body
        }

        FOREACH ($iterable AS $key => $value) {
            // Foreach body
        }

        TRY {
            // Try body
        } CATCH (FirstExceptionType $e) {
            // Catch body
        } FINALLY {
            restore_error_handler();
        }

        $noArgs_longVars = FUNCTION () USE (
            $longVar1,
            $longerVar2,
            $muchLongerVar3
        ) {
            // Body
        };

        $obj2 = CLONE $obj;

        IF (EMPTY($var)) {
            ECHO '$var или 0, или пусто, или вообще не определена';
        }

        IF (ISSET($var)) {
            ECHO '$var определена, даже если она пустая';
        }

        __line__;
        __file__;
        __dir__;
        __function__;
        __class__;
        __trait__;
        __method__;
        __namespace__;

        $c = (FALSE AND foo());
        $d = (TRUE OR foo());
        $c = (FALSE XOR foo());

        $array = ARRAY(1, 1, 1);

        IF ($step <= 0) {
            THROW NEW LogicException('Logic');
        }

        FOR ($i = $start; $i <= $limit; $i += $step) {
            YIELD $i;
        }

        GLOBAL $foo;
        UNSET($foo);

        var_dump($a INSTANCEOF MyClass);

        $bar = (INT) $foo;

        DIE();
        EXIT();
        EVAL('test');
    }

    PUBLIC FUNCTION MyPublic()
    {
        ECHO self::CONSTANT;
    }

    PROTECTED FUNCTION MyProtected()
    {
        REQUIRE('somefile.php');
        REQUIRE_ONCE('somefile.php');
        INCLUDE('somefile.php');
        INCLUDE_ONCE('somefile.php');
    }

    PRIVATE FUNCTION MyPrivate()
    {
        GOTO a;
        ECHO 'Foo';

        a:
        ECHO 'Bar';
    }

    FINAL PUBLIC STATIC FUNCTION bar(CALLABLE $callback, $coffeeMaker = NULL)
    {
        IF ($a == 5):
            ECHO "5";
        ELSEIF ($a == 6):
            ECHO "6";
        ELSE:
            ECHO "other";
        ENDIF;

        $i = 1;

        WHILE ($i <= 10):
            ECHO $i;
            $i++;
        ENDWHILE;

        FOR (;;):
            if ($i > 10) {
                BREAK;
            }

            ECHO $i;
            $i++;
        ENDFOR;

        FOREACH ($array AS $element):
            echo $element;
        ENDFOREACH;

        SWITCH ($var):
            CASE 1:
            CASE 2:
                ECHO "Goodbye!";
                BREAK;
            DEFAULT:
                ECHO "I only understand 1 and 2.";
        ENDSWITCH;
    }

    PUBLIC FUNCTION method(
        INT $param1,
        FLOAT $param2,
        BOOL $param3,
        STRING $param4,
        ITERABLE $param5,
        OBJECT $param6,
        ClassA $param7,
        SELF $param8,
        Name\Space\ClassA $param8
    ): VOID
    {
        // Nothing
    }
}

__HALT_COMPILER();
