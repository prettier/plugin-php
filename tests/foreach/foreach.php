<?php
foreach ($test as $i) {
  $test2 = $i;
}

foreach ($really_really_really_really_really_long_array as $key => $really_really_really_long_value) {
  $test3 = $really_really_really_long_value;
}

foreach ($test as $i):
  $test2 = $i;
endforeach;

foreach ( $test as $i ) {
    $test2 = $i;
}

foreach ($test as $i)
    $test2 = $i;

foreach (['foo' => ['very-very-very-long-value'], 'bar' => ['very-very-very-long-value']] as $veryVeryVeryVeryVeryVeryVeryVeryLongKey) {}
foreach (['foo' => ['very-very-very-long-value'], 'bar' => ['very-very-very-long-value']] as $veryVeryVeryVeryVeryVeryVeryVeryLongKey => $veryVeryVeryVeryVeryVeryVeryVeryLongValue) {}

foreach ($test as $i);

foreach ($test as $i):
endforeach;

foreach ($test as $i) {
}
