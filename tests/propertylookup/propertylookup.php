<?php

$a = $obj->value;
$a = &$obj->getValue();
$obj->value = 2;

$b = $this->{foo};
$b = $this->{foo['bar']};
$b = $this->{'foo' . $bar};
