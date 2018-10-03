<?php

$fooBar->doSomething('Hello World')->doAnotherThing('Foo', [ 'foo' => $bar ])

  // App configuration.
  ->doOneMoreThing($config)

  ->run(function () { $console->log('Bar'); });

$bigDeal

  ->doSomething('Hello World')

  // Hello world
  ->doAnotherThing('Foo', [ 'foo' => $bar ])

  // App configuration.
  ->doOneMoreThing($config)

  ->run(function () { $console->log('Bar'); });


$foo->bar->baz

  ->doSomething('Hello World')

  // Hello world
  ->foo->bar->doAnotherThing('Foo', [ 'foo' => $bar ])

  ->doOneMoreThing($config)
  ->bar->run(function () { $console->log('Bar'); });

(
  $somethingGood ? $thisIsIt : $maybeNot
)

  // Hello world
  ->doSomething('Hello World')

  ->doAnotherThing('Foo', [ 'foo' => $bar ]) // Run this
  ->run(function () { $console->log('Bar'); }); // Do this

$helloWorld

  ->text()

  ->then(function ($t) { return $t; });

($veryLongVeryLongVeryLong ||
 $anotherVeryLongVeryLongVeryLong ||
 $veryVeryVeryLongError
)

  ->map(function ($tickets) { $TicketRecord->createFromSomeLongString(); })

  ->filter(function ($obj) { return !!$obj; });

$sel = $this->connections

  ->concat($this->activities->concat($this->operators))
  ->filter(function ($x) { return $x->selected; });
