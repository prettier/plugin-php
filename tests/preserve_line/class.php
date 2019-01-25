<?php

class Foo
{


    // property declaration
    public $var = 'a default value';
    public $var_1 = 'a default value';


    public $var_2 = 'a default value';

    // method declaration
    public function displayVar() {
        echo $this->var;
    }
    public function displayVar1() {
        echo $this->var_1;
    }


    public function displayVar2() {
        echo $this->var_2;
    }

    const CONSTANT = 'constant value';
    const CONSTANT_1 = 'constant value';


    const CONSTANT_2 = 'constant value';

    // Comment


    // Comment
    public function __sleep()
    {
        return array('dsn', 'username', 'password');
    }
    // Comment


    // Comment
    private $dsn;
    // Comment


}
