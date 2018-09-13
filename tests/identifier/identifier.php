<?php

function int(int $var) {}
function intI(iNt $var) {}
function intII(int $var): int {}
function intIII(int $var): iNt {}
function intIIII(int $var): INT {}
function float(float $var) {}
function floatI(fLoAt $var) {}
function bool(bool $var) {}
function boolI(bOoL $var) {}
function string(string $var) {}
function stringI(sTrInG $var) {}
function iterable(iterable $var) {}
function iterableI(iTeRaBlE $var) {}
function object(object $var) {}
function objectI(oBjEcT $var) {}
function arrayI(array $var) {}
function arrayII(aRrAy $var) {}
function arrayIII(ARRAY $var) {}
function arrayIIII($var) : array {}
function arrayIIIII($var) : aRrAy {}
function arrayIIIIII($var) : ARRAY {}
function callableI(callable $var) {}
function callableII(cAlLaBlE $var) {}
function void(): void {}
function voidI(): vOiD {}
function null($var = null) {}
function nullI($var = nUlL) {}
function something(something $var) {}
function somethingI(sOmEtHiNg $var) {}
function somethingII(SOMETHING $var) {}

class A {
    public static function test() {
        self::who();
        sElF::who();
        parent::who();
        pArEnt::who();
        static::who();
        sTaTic::who();
    }
}

// Should don't change

$var = $array[int];
$var = $array[iNt];

$var = $array->{int};
$var = $array->{iNt};
