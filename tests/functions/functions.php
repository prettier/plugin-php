<?php

function hello(){
    return "hello";
}

function return_x($x){
    return $x;
}

function two_args($x, $y) {
    return $x;
}

function reeeeeeeeeeaaaaaaaallllllllyyyyyy_llloooooooonnnnnnggggg($soooooooooooo_looooooooonnnng, $eeeeeeeeevvveeeeeeeennnn_loooooonnngggeeeerrrr) {
    return $soooooooooooo_looooooooonnnng;
}

function variadicTest($one, ...$others) {
  // test
  $hi = 2;
  return count($others);
}

function pass_by_reference_test($x, int &$a) {
  $a += 1;
}

function type_hinting_test(array $array_test, callable $callable_test, bool $bool_test, float $float_test, iterable $iterable_test, int $int_test, string $string_test = '') {
  return $int_test;
}

$anonymous = function($name) use ($otherthing, &$reference_test){
  printf("Hello %s", $name);
  $reference_test += 1;
};
$anonymousLongVariableName = function($name, $more, $params, $looooooooooooooooooooooooooooooooong) use ($all, $kinds, $of, $stuff) {
  printf("Hello %s", $name);
};

$arr = [1,2,3];
array_map(function($entry) {
  return $entry * 2;
}, $arr);

$silent = @hello();

function returnTypeTest(): string {
  return 'hi';
}

function &passByReferenceTest()
{
  $a = 1;
  return $a;
}

function foo(iterable $iterable = []) {}

function bar(): iterable {
    return [1, 2, 3];
}

function gen(): iterable {
    yield 1;
    yield 2;
    yield 3;
}

function testReturn(?string $name): ?string
{
    return $name;
}

function swap(&$left, &$right): void
{
    if ($left === $right) {
        return;
    }

    $tmp = $left;
    $left = $right;
    $right = $tmp;
}

function test(object $obj): object
{
    return new SplQueue();
}

$db->Execute($sql, [
  $foo,
  $bar,
  $foobar,
  $somewhatLongParameter,
  $somewhatLongParameterX,
  $somewhatLongParameterXYZ
]);

$db->Execute([
  $foo,
  $bar,
  $foobar,
  $somewhatLongParameter,
  $somewhatLongParameterX,
  $somewhatLongParameterXYZ
], $sql);

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello ' . $app->escape($name);
});

$this->something->method($argument, $this->more->stuff(
    $this->even->more->things->complicatedMethod()
));

$this->something->method(
    $this->more->stuff($this->even->more->things->complicatedMethod()),
    $argument
);

$this->something->method(
    $argument,
    $otherArgument,
    array("foo" => "bar", "baz" => "buzz"),
    $this->even->more->things->complicatedMethod()
);

$this->files->put(
    $path, $this->expiration($minutes).serialize($value), true
);

tap(((int) $raw['data']) + $value, function ($newValue) use ($key, $raw) {
    $this->put($key, $newValue, $raw['time']);
});

$expire = substr(
    $contents = $this->files->get($path, true), 0, 10
);
$this->app->singleton('session', function ($app) {
    return new SessionManager($app);
});

$this->filter([
    new MergeValue(['First', 'Second']),
    'Taylor',
    'Mohamed',
    $this->mergeWhen(false, ['Adam', 'Matt']),
    'Jeffrey',
    new MergeValue(['Abigail', 'Lydia']),
]);

$this->assertEquals([
    'First', 'Second', 'Taylor', 'Mohamed', 'Jeffrey', 'Abigail', 'Lydia',
], $results);

$this->assertEquals(['First'], $results);

$some->other->thing(array(
  'foo' => 'bar',
  'buzz' => $this->is->nested(array(
    'complex' => 'stuff',
    'foo' => 'bar',
    'buzz' => 'bazz'
  ))
));

$some->other->thing(array(
  'foo' => 'bar',
  'buzz' => $this->is->nested(array(12, 34, 45, 67, 89))
), array(
  11323123,
  1231, 13231233243, 324234234
));
