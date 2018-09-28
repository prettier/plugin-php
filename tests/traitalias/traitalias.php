<?php

class MyClass1 {
    use A;
    use B {
        foo as bar;
        Foo::foo as bar;

        foo as public;
        foo as public bar;
        Foo::foo as public;
        Foo::foo as public bar;

        foo as protected;
        foo as protected bar;
        Foo::foo as protected;
        Foo::foo as protected bar;

        foo as private;
        foo as private bar;
        Foo::foo as private;
        Foo::foo as private bar;
    }
}
