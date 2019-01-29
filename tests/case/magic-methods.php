<?php

// The function names __construct(), __destruct(), __call(), __callStatic(), __get(), __set(), __isset(), __unset(), __sleep(), __wakeup(), __toString(), __invoke(), __set_state(), __clone() and __debugInfo() are magical in PHP classes.
// You cannot have functions with these names in any of your classes unless you want the magic functionality associated with them.

class Connection
{
    public function __CONSTRUCT()
    {
    }

    public function __DESTRUCT()
    {
    }

    public function __CALL($name, $arguments)
    {
    }

    public static function __CALLSTATIC($name, $arguments)
    {
    }

    public function __GET($name)
    {
    }

    public function __SET($name, $value)
    {
    }

    public function __ISSET($name)
    {
    }

    public function __UNSET($name)
    {
    }

    public function __SLEEP()
    {
    }

    public function __WAKEUP()
    {
    }

    public function __TOSTRING()
    {
    }

    public function __INVOKE($x)
    {
    }

    public function __SET_STATE($an_array)
    {
    }

    public function __CLONE()
    {
    }

    public function __DEBUGINFO()
    {
    }
}
