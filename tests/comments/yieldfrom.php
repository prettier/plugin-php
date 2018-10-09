<?php

function gen() {
    yield 0;
    yield from /* Comment */ from();
    yield from from() /* Comment */;
    yield from // Comment2
        from(); // Comment 3
    yield 4;
}
