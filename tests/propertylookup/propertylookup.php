<?php

$a = $obj->value;
$a = &$obj->getValue();
$a = &$obj->getValue()->getValue()->getValue()->getValue()->getValue()->getValue()->getValue()->getValue()->getValue();
$var = &$var->aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
$obj->value = 2;

$b = $this->foo;
$b = $this->{foo};
$b = $this->{foo['bar']};
$b = $this->{'foo' . $bar};
$b = $this->{self::STUFF};
$object = $this->{'bar' . $foo}->buzz();

$this->loooooooooooongloooooooooooongloooooooooooonglookup = "teeeeeeeeeeeeeeeeeeeeest";
$this->loooooooooooong->loooooooooooong->loooooooooooong->lookup = "teeeeeeeeeeest";
$this->loooooooooooong->loooooooooooong->loooooooooooong->lookup = $other->looooooooooong->stuff;
$this->loooooooooooong->lookup = (int) $this->getRequest()->getParam(
  'instance-resource-id'
);

$obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty;
$obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty();

$var = $var->aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
$var->aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = $var->aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
