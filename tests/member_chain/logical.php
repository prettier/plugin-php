<?php

$someLongVariableName = (idx(
    $prop,
    ['foo' => 'bar', 'bar' => 'foo', 'foobar' => 'barfoor']
) || [])->map(function ($edge) { return $edge->node; });

($veryLongVeryLongVeryLong || $e)->map(function ($tickets) {
    $TicketRecord->createFromSomeLongString();
});

($veryLongVeryLongVeryLong || $e)->map(function ($tickets) {
  $TicketRecord->createFromSomeLongString();
})->filter(function ($obj) { return !!$obj; });

($veryLongVeryLongVeryLong || $anotherVeryLongVeryLongVeryLong || $veryVeryVeryLongError)->map(function ($tickets) {
    $TicketRecord ->createFromSomeLongString();
});

($veryLongVeryLongVeryLong || $anotherVeryLongVeryLongVeryLong || $veryVeryVeryLongError)->map(function ($tickets) {
  $TicketRecord->createFromSomeLongString();
})->filter(function ($obj) { return !!$obj; });
