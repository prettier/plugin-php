<?php

class A
{
    #[Override]
    public function typed(): array
    {
        // leading comment in the body of an attributed method
        $vals = [];

        // between statements
        return $vals;
    }

    #[Override] // trailing the attribute
    public function untyped()
    {
        // only a comment
    }
}
