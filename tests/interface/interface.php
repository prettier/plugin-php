<?php

interface testInterface {
    public function setVariable($test);
    public function method(array $array): iterable;
}

interface test2 extends testInterface {
  public function other($hi);
}
