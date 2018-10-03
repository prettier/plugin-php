<?php
interface Logger {
    public function log(string $msg);
}

class Application {
    private $logger;

    public function getLogger(): Logger {
        return $this->logger;
    }

    public function setLogger(Logger $logger) {
        $this->logger = $logger;
    }
}

$app = new Application;
$app->setLogger(new class implements Logger {
    public function log(string $msg) {
        echo $msg;
    }
});
$app->setLogger(new class {
    public function log($msg)
    {
        echo $msg;
    }
});

var_dump(new class(10) extends SomeClass implements SomeInterface {
    private $num;

    public function __construct($num)
    {
        $this->num = $num;
    }

    use SomeTrait;
});

class Outer
{
    private $prop = 1;
    protected $prop2 = 2;

    protected function func1()
    {
        return 3;
    }

    public function func2()
    {
        return new class($this->prop) extends Outer {
            private $prop3;

            public function __construct($prop)
            {
                $this->prop3 = $prop;
            }

            public function func3()
            {
                return $this->prop2 + $this->prop3 + $this->func1();
            }
        };
    }
}

echo get_class(new class {});
$class = new class {};
$class = new class extends Outer {};
// Parenthesis on the same line
$instance = new class extends \Foo implements \HandleableInterface {
    // Class content
};

// Parenthesis on the next line
$instance = new class extends \Foo implements
    \ArrayAccess,
    \Countable,
    \Serializable
{
    // Class content
};

$class = new class {};

$class = new class implements MyOtherClass {};

$class = new class implements MyOtherClass, MyOtherClass1, MyOtherClass2 {};

$class = new class implements VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyOtherClass {};

$class = new class implements MyOtherClass, MyOtherClass, MyOtherOtherOtherClass, MyOtherOtherOtherOtherClass {};

$class = new class extends MyOtherClass {};

$class = new class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass {};

$class = new class extends MyOtherClass implements MyI {};

$class = new class extends MyOtherClass implements MyI, MyII, MyIII {};

$class = new class extends MyOtherClass implements VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass {};

$class = new class extends MyOtherClass implements MyInterface, MyOtherInterface, MyOtherOtherInterface {};

$class = new class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass implements MyI {};

$class = new class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass implements MyI, MyII, MyIII {};

$class = new class extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass implements VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongMyClass {};
