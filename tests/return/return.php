<?php

function sum($a, $b) {
    return ($a + $b);
}

return;
return $name;
return

$name;
return

$VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName;
return [1, 2, 3];
return [$veryVeryVeryVeryVeryVeryLongKey => 'VeryVeryVeryVeryVeryVeryVeryVeryVeryLongString', $veryVeryVeryVeryVeryVeryLongKey => 'VeryVeryVeryVeryVeryVeryVeryVeryVeryLongString', 3];
return ($a + $b);
return ( $a / $b );
return ( $a && $b );
return new $VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassName();
return "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString" . "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString";
return "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString" . "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString" . "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString";
return 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000;
return (1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000 + 1000000000);
return $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongVariable ? true : false;
return $veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongVariable->veryVeryVeryVeryVeryVeryLongProperty;
return ((($true ? ('foo' . ('foo'. 'bar')) : "foobarfoo")));
return 'string' . 'string' . 'string' . 'string' . 'string' . 'string' . 'string' . 'string';
return ('string' . 'string' . 'string' . 'string' . 'string' . 'string' . 'string' . 'string');

return function () {};
return (function () {})();

return call();
return $a->b->c->d->e->f;
return $a->b()->c()->d()->e()->f();
return call()->b()->c()->d()->e()->f();
return $a::b()::c()::d()::e()::f();
return Foo::a()::b()::c()::d()::e()::f();

return "
string
string
string
";

return $str = <<<EOD
Example of string
spanning multiple lines
using heredoc syntax.
EOD;

return $str = <<<'EOD'
Example of string
spanning multiple lines
using nowdoc syntax.
EOD;

return new class {};
return new class {
    public function foo() {
        return 1;
    }
};

return null;

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)['extra']['laravel']['dont-discover'] ?? [];

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)['extra']['laravel']['dont-discover'] ? [] : [];

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)['extra']['laravel']['dont-discover'] . 'string';

return 'string' . json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)['extra']['laravel']['dont-discover'];

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)->foo->bar->foo->bar;

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)->foo()->bar()->foo()->bar();

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)::foo()::bar()::foo()::bar();

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)->foo->bar->foo->bar . 'string';

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)->foo()->bar()->foo()->bar() . 'string';

return json_decode(
    file_get_contents($this->basePath . '/composer.json'),
    true
)::foo()::bar()::foo()::bar() . 'string';

return isset($veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongLine) ? true : false;

return eval('$var = "veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongLine"; $var .= $var;');

return include 'foo.php' . ' MORE OUTPUT';
return include 'foo.php' . ' MORE OUTPUT' . ' MORE OUTPUT' . ' MORE OUTPUT' . ' MORE OUTPUT' . ' MORE OUTPUT' . ' MORE OUTPUT';

return new Foo($arg);
return new Foo($arg, 'string', 1024, $veryVeryVeryVeryVeryVeryLongLine, true, false);
return new Foo($arg, 'string', 1024, $veryVeryVeryVeryVeryVeryLongLine, true, false) . 'string';
return 'string' . new Foo($arg, 'string', 1024, $veryVeryVeryVeryVeryVeryLongLine, true, false);
