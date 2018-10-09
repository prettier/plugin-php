<?php

class Foo {
    public function foo(/* 1 */ $a /* 2 */ = /* 3 */ 1 /* 4 */): /* 5 */ ?string /* 6 */ {}

    public function emptyMethod(/* comments */) {}

    abstract public function sortByName(/* bool $useNaturalSort = false */);

    /* comment */ protected /* comment */ static /* comment */ $foo /* comment */;

    public function foo( // Comment
    ) {}

    public function foo(
        // Comment
    ) {}

    abstract public function foo( // Comment
    );

    abstract public function foo(
        // Comment
    );
}


class add_vendor extends request{
    protected function request(){
        $qb_vendor->setVendorAddress(
            $vendor->address_1, // address 1
            $vendor->address_2, // address 2
            '', // address 3 mike testing
            '', // address 4
            '', // address 5
            $vendor->city, // city
            $vendor->state, // state
            $vendor->zip // state
        );
    }
}
