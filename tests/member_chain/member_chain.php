<?php

one()->two();
one()
    ->two()
    ->three();
one()
    ->two->three()
    ->four->five();

Route::prefix('api')
    ->middleware('api')
    ->namespace($this->namespace)
    ->group(base_path('routes/api.php'));

return tap($this->forceFill([
    'approver_id' => $user instanceof User ? $user->id : $user,
    'approved_at' => $this->freshTimestamp(),
]))->save();

return collect(parent::jsonSerialize())->mapWithKeys(function ($value, $key) {
    return [camel_case($key) => $value];
})->toArray();

method()->then(function ($x) { return $x; })
  ["abc"](function ($x) { return $x; })
  [$abc](function ($x) { return $x; });

($a->a()->b());
($a)->a()->b();
$a->a()->b;
$a->b->a();
$a->b()->c()->d();
$a->b->c->d;

// should inline
$t->shouldReceive( 'signUp' )->with( anInstanceOf( 'Foo\\Bar\\Baz' ), $this->app['foo.bar.baz']->getEmail())->once();
$te->shouldReceive( 'signUp' )->with( anInstanceOf( 'Foo\\Bar\\Baz' ), $this->app['foo.bar.baz']->getEmail())->once();
$tes->shouldReceive( 'signUp' )->with( anInstanceOf( 'Foo\\Bar\\Baz' ), $this->app['foo.bar.baz']->getEmail())->once();
// should break
$test->shouldReceive( 'signUp' )->with( anInstanceOf( 'Foo\\Bar\\Baz' ), $this->app['foo.bar.baz']->getEmail())->once();
$a = $t->shouldReceive( 'signUp' )->with( anInstanceOf( 'Foo\\Bar\\Baz' ), $this->app['foo.bar.baz']->getEmail())->once();

$this->loooooooooooong->lookup = (int) $this->getRequest()->getParam(
    'some-param'
);

$this->loooooooooooong->lookup = (int) $variable->getRequest()->getParam(
    'some-param'
);

$aVariable = $theThing
    ->aLongFunction(1, 2, 3)
    ->anotherReallyLongFunciton('a', 'b', 'c');

$anotherVariables = $theOtherThing
    ->aLongFunction(1, 2, 3, 4, 5, 6, 7)
    ->anotherReallyLongFunciton('a', 'b', 'c');

$aVariable = $theThing->veryVeryVeryVeryVeryVeryVeryVeryLongCall()->veryVeryVeryVeryVeryVeryVeryVery;
$aVariable = $theThing->veryVeryVeryVeryVeryVeryVeryVeryLongCall()->veryVeryVeryVeryVeryVeryVeryVery();

bar()();
bar('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong')();
bar()('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong');
bar('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong')()()()()();

$foo->bar()();
$foo->bar('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong')();
$foo->bar()('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong');
$foo->bar('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLong')()()()()();

$brian->hotel->orders()->ordered()->with('smith')->get();
$brian::$hotel->orders()->ordered()->with('smith')->get();
$brian['hotel']->orders()->ordered()->with('smith')->get();
Foo::$hotel->orders()->ordered()->with('smith')->get();
(new Foo())->hotel->orders()->ordered()->with('smith')->get();
(clone $a)->hotel->orders()->ordered()->with('smith')->get();

$var = $brian->hotel->orders()->ordered()->with('smith')->get();
$var = $brian::$hotel->orders()->ordered()->with('smith')->get();
$var = $brian['hotel']->orders()->ordered()->with('smith')->get();
$var = Foo::$hotel->orders()->ordered()->with('smith')->get();
$var = (new Foo())->hotel->orders()->ordered()->with('smith')->get();
$var = (clone $a)->hotel->orders()->ordered()->with('smith')->get();

$var = Foo::keys($items)->filter(function ($x) { return $x > 2; })->map(function ($x) { return $x * 2; });

(new static(func_get_args()))->push($this)->each(function ($item) {
    VarDumper::dump($item);
});
(new static(func_get_args()))->offset(10)->push($this)->each(function ($item) {
    VarDumper::dump($item);
});
