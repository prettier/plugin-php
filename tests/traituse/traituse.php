<?php

class Foo
{
    use ezcReflectionReturnInfo;
    use VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongTrait;
    use Hello, World;
    use VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongTrait, VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongTrait;
    use A, B, C {
        C::bar insteadof A, B;
    }
    use A, B {
        B::smallTalk insteadof A;
        A::bigTalk insteadof B;
    }
    use A, B {
        B::smallTalk insteadof A;
        A::bigTalk insteadof B;
        B::bigTalk as talk;
    }
    use HelloWorld { sayHello as protected; }
    use HelloWorld { sayHello as private myPrivateHello; }
}
