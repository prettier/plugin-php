<?php

// identifier
$obj?->foo;
// variable
$obj?->$var;
// variable variable
$obj?->$$var;
// literal with identifier
$obj?->{foo};
// literal with variable
$obj?->{$var};
// literal with call
$obj?->{call()};
// encapsed (offset type)
$obj?->foo_{'test' . 'bar'};
// variable with literal with call
$obj?->${call()};
