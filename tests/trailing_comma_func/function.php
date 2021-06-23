<?php

class f1 {
    function f2(
        int $classFunctionArgumentOne,
        ?float $classFunctionArgumentTwo,
        string $classFunctionArgumentThree,
    ) {
        return fn(
            $labdaFunctionArgumentOne,
            $labdaFunctionArgumentTwo,
            $labdaFunctionArgumentThree,
            $labdaFunctionArgumentFour,
        ) => true;
    }
}

function f3(
    $standaloneFunctionArgumentOne,
    $standaloneFunctionArgumentTwo,
    $standaloneFunctionArgumentThree,
    $standaloneFunctionArgumentFour,
) {
}

f3(
    "abcdefghijklmnopqrstuvwxyz",
    "abcdefghijklmnopqrstuvwxyz",
    "abcdefghijklmnopqrstuvwxyz",
    "abcdefghijklmnopqrstuvwxyz",
);
