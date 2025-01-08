<?php

#[A,B]
#[C('arg1','arg2',D::class)]
class D {

    /** @var int Constant F */
    #[E]
    const F = 0;

    #[G] public int $h = 0;

    /**
     * @param int $m input Integer
     * @return callable function doubles int
     */
    #[I,J] function k(#[L] int $m):callable {
      return #[N,O]#[P] fn(#[Q] int $r) => $r * 2;
    }

    // Testing S
    #[S]
//Testing S-T
#[T] //Testing T

    private function u() {
        return #[V] function() { return null; };
    }

}

#[W('a', null, 'looooong','paraaaams','list','aaaaaaaaaaaaa','vvvvvvvvvvvv','cccccccccc','eeeeeeeeeee'), X()] function Y(#[ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ(12345678, 1234578)] string $_):string {return new #[NON, Anon()] class {};}

#[IA('interface'),\Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong\Namespace\WithStuff\IB]
interface IC {
    #[ID] const IE = 123;

    #[IG, IH('abc'),IJ()] public function ik();
}

// issue #1820
final class DomainEventMessage
{
    #[Some(type: "some_type")]
    public function getPayload(): string
    {
        return "444";
    }

    public function getPayload1(): string
    {
        return "555";
    }
}

#[
    Attr1(Attr1::FOO | Attr1::BAR),
    Attr2(-20 * 5 + 10)
]
class A {}

class ValueModel
{
    #[
        Assert\NotBlank(allowNull: false, groups: ['foo']),
        Assert\Length(max: 255, groups: ['foo']),
    ]
    public ?string $value = null;
}

class Test
{
    /**
     * Method with an attribute.
     * @param string $foo
     * @return string
     */
    #[Pure]
    public function withAttribute(string $foo): string
    {
        return $foo;
    }

}

class ParamCommentFunctionAnnotation {

    #[Foo]
    function bar(
        int $a, // parameter comment
        int $b,
    ) {
        return $a + $b;
    }

    #[Foo]
    function bar2(
        int $a,
        int $middle, // parameter comment
        int $b,
    ) {
        return $a + $middle + $b;
    }

}
