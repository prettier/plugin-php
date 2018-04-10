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
