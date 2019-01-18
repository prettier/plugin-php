<?php

namespace A;

use B\D, C\E as F;

// Unqualified name (uqn)
$obj = new Bar();

// Fully qualified name (fqn)
$obj = new \Bar();
$obj = new \Foo\Bar();

// Qualified name (qn)
$obj = new Foo\Bar();

// Relative name (rn)
$obj = new namespace\Another;
$obj = new namespace\Another\Test;
$obj = new namespace\Another\Test;

foo();

\foo();

my\foo();

F();

new F();

new \F();

B\foo();

B::foo();

D::foo();

\B\foo();

\B::foo();

A\B::foo();

\A\B::foo();

$foo = namespace\foo();
