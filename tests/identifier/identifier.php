<?php

// Functions

function int(int $var): int {}
function intI(iNt $var): iNt {}

function float(float $var): float {}
function floatI(fLoAt $var): fLoAt {}

function bool(bool $var): bool {}
function boolI(bOoL $var): bOoL {}

function string(string $var): string {}
function stringI(sTrInG $var): sTrInG {}

function iterable(iterable $var): iterable {}
function iterableI(iTeRaBlE $var): iTeRaBlE {}

function object(object $var): object {}
function objectI(oBjEcT $var): Object {}

function arrayI(array $var): array {}
function arrayI(aRrAy $var): aRrAy {}

function callableI(callable $var): callable {}
function callableII(cAlLaBlE $var): cAlLaBlE {}

function void(): void {}
function voidI(): vOiD {}

function null($var = null) {}
function nullII($var = NULL) {}

function something(something $var): something {}
function somethingI(sOmEtHiNg $var): sOmEtHiNg {}

// Closures

$var = function (int $var): int {};
$var = function (iNt $var): iNt {};

$var = function (float $var): float {};
$var = function (fLoAt $var): fLoAt {};

$var = function (bool $var): bool {};
$var = function (bOoL $var): bOoL {};

$var = function (string $var): string {};
$var = function (sTrInG $var): sTrInG {};

$var = function (iterable $var): iterable {};
$var = function (iTeRaBlE $var): iTeRaBlE {};

$var = function (object $var): object {};
$var = function (oBjEcT $var): Object {};

$var = function (array $var): array {};
$var = function (aRrAy $var): aRrAy {};

$var = function (callable $var): callable {};
$var = function (cAlLaBlE $var): cAlLaBlE {};

$var = function (): void {};
$var = function (): vOiD {};

$var = function ($var = null) {};
$var = function ($var = NULL) {};

$var = function (something $var): something {};
$var = function (sOmEtHiNg $var): sOmEtHiNg {};

class A {
    public $var = null;
    public $var1 = nUuL;
    public $var2 = NULL;

    public static function test() {
        self::who();
        sElF::who();
        parent::who();
        pArEnt::who();
        static::who();
        sTaTic::who();
    }

    public function newSelf() {
        return new SeLf();
    }

    public function newParent() {
        return new pArEnT();
    }

    public function returnSelf(): sElF {
        return $this;
    }

    public function returnParent(): pArEnT {
        return $this;
    }

    public function foo(self $arg) {}
    public function foo2(sElF $arg) {}
    public function foo3(parent $arg) {}
    public function foo4(pArEnT $arg) {}

    // methods
    function int(int $var): int {}
    function intI(iNt $var): iNt {}

    function float(float $var): float {}
    function floatI(fLoAt $var): fLoAt {}

    function bool(bool $var): bool {}
    function boolI(bOoL $var): bOoL {}

    function string(string $var): string {}
    function stringI(sTrInG $var): sTrInG {}

    function iterable(iterable $var): iterable {}
    function iterableI(iTeRaBlE $var): iTeRaBlE {}

    function object(object $var): object {}
    function objectI(oBjEcT $var): Object {}

    function arrayI(array $var): array {}
    function arrayI(aRrAy $var): aRrAy {}

    function callableI(callable $var): callable {}
    function callableII(cAlLaBlE $var): cAlLaBlE {}

    function void(): void {}
    function voidI(): vOiD {}

    function null($var = null) {}
    function nullII($var = NULL) {}

    function something(something $var): something {}
    function somethingI(sOmEtHiNg $var): sOmEtHiNg {}
}

// Null
null;
nUlL;
NULL;
$var = null;
$var = NULL;
$var = $var || null;
$var = $var || NULL;
$var = $var === null;
$var = $var === NULL;
$var = $array[null];
$var = $array[NULL];
$var = call(null);
$var = call(NULL);
$var = new Foo(null);
$var = new Foo(NULL);
$var = [null];
$var = [NULL];
$var = ['foo' => null];
$var = ['foo' => NULL];

// Should don't change

$var = $array[int];
$var = $array[iNt];

$var = $array->{int};
$var = $array->{iNt};

self();
sElF();
parent();
pArEnT();

int();
iNt();
$foo->int;
$foo->iNt;
$foo::int;
$foo::iNt;
$foo::$int;
$foo::$iNt;
$foo->int();
$foo->iNt();
$foo::int();
$foo::iNt();

null();
nUlL();
$foo->null;
$foo->nUlL;
$foo::null;
$foo::nUlL;
$foo::$null;
$foo::$nUlL;
$foo->null();
$foo->nUlL();
$foo::null();
$foo::nUlL();
