<?php

$variable = FormUtil::isEmpty($this->modelData) ||
    // arrays, countables
    ((is_array($this->modelData) || $this->modelData instanceof \Countable) && 0 === count($this->modelData)) ||
    // traversables that are not countable
    ($this->modelData instanceof \Traversable && 0 === iterator_count($this->modelData));

if (2 /* MB_OVERLOAD_STRING */ & (int) ini_get('mbstring.func_overload')) {
    mb_internal_encoding('ASCII');
}

$bool = /*Comment */ true /*Comment */ || /*Comment */ false /*Comment */;
