<?php

interface testInterface {
    public function setVariable($test);
    public function method(array $array): iterable;
}

interface test2 extends testInterface {
  public function other($hi);
}

interface EmptyInterface {}

interface EmptyInterfaceWithComments { /* Comment */ }

interface Foo extends MyClass {}

interface Foo extends MyClass, MyOtherClass, OtherClass {}

interface Foo extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName {}

interface VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName extends VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName {}

interface VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName extends Foo {}

interface Foo extends MyClass, MyOtherClass, MyOtherOtherOtherClass, MyVeryVeryVeryLongClassName {}

interface VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName extends MyClass, MyOtherClass, MyOtherOtherOtherClass, MyVeryVeryVeryLongClassName {}
