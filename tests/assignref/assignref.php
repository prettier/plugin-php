<?php

$var = &$var;

class Foo {
    public function test() {
        $var = &self::$darwinCache[$k];
    }
}

$a = &$b / 100;

$var = $arr['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'];
$var = &$arr['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'];
$var = $arr['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'];
$var = &$arr['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'];
$variable['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'] = $variable->registered[1];
$variable['veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString'] = &$variable->registered[1];

$obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = $obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = $obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongValue;
$obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = $obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = $obj->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongProperty = &$veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongValue;

$test =
    $superSupersuperSupersuperSupersuperSupersuperSuperLong
    ->exampleOfOrderOfGetterAndSetterReordered;
$test =
    &$superSupersuperSupersuperSupersuperSupersuperSuperLong
    ->exampleOfOrderOfGetterAndSetterReordered;

$this->long->expression->before->array->statesArray[$state->getCirculationStateId()] = $state->getName();
$this->long->expression->before->array->statesArray[$state->getCirculationStateId()] = &$state->getName();

$cached_var = &drupal_static(__FUNCTION__);

$test = ['key' => &$value];
$test = ['key' => &$value['something']];
