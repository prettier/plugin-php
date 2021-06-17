<?php

#[A,B]
#[C]
class D {

    #[E]
    const F = 0;

    #[G] public int $h = 0;

    #[I,J] function k(#[L] int $m):callable {
      return #[N,O]#[P] fn(#[Q] int $r) => $r * 2;
    }

    #[S]
//Testing
#[T] private function u() {
        return #[V] function() { return null; };
    }

}

#[W('a', null, 'looooong','paraaaams','list','aaaaaaaaaaaaa','vvvvvvvvvvvv','cccccccccc','eeeeeeeeeee'), X()] function Y(#[ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ(12345678, 1234578)] string $_):string {return new #[NON, Anon()] class {};}

#[IA('interface'),IB]
interface IC {
    #[ID] const IE = 123;

    #[IG, IH('abc'),IJ()] public function ik();
}
