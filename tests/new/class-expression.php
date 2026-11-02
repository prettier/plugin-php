<?php
$a = new ($x ?? $y)($z);
$b = new ($x . "Suffix")();
$c = new (Foo::BAR)();
$d = new ("Foo")();
$e = new ((string) $x)();
$f = new ($cond ? A::class : B::class)();
$g = new ($a->factory()->class)();
$h = new (static::$classes[$k] ?? Fallback::class)($z);
$i = new ($a->b)();
$j = new (static::$class)();
$k = new ($classes[$k])();
$l = new ($this->factory())();
