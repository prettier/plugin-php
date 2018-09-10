<?php

function gen_one_to_three() {
    for ($i = 1; $i <= 3; $i++) {
        yield;
        yield $i;
        (yield $i);
        yield from from();
        (yield from from());
        (yield f())->b;
        !(yield $var);
        yield (yield $var);
    }

    $var = yield;
    $var = yield $var;
    $var += yield $var;
    $var = (yield $var);
    $var += (yield $var);
    $var = yield $key => $var;
    $var = (yield $key => $var);
    $var = !yield $var;
    $var = !(yield $var);
    $var = yield (yield $var);
    $var = yield 1 ? 1 : 1;
    $var = (yield 1) ? 1 : 1;
    $var = yield 1 ? yield 1 : yield 1;
    $var = (yield 1) ? (yield 1) : (yield 1);
    $var = yield $var->b;
    $var = (yield $var)->b;
    $var = yield $var->b();
    $var = (yield $var)->b();
    $var = yield $var[1];
    $var = (yield $var)[1];

    call(yield $var);

    return yield from nine_ten();

    foreach($SubTrav as $SubItem) yield $SubItem;
}
