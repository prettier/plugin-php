<?php
function a((A&B)|C $x): void {}

function b(): (A&B)|C {}

function c(C|(A&B) $x): void {}

function d((A&B)|(C&D) $x): void {}

function e((A&B) $x): void {}

$f = function ((A&B)|C $x): void {};

$g = fn((A&B)|C $x) => $x;
