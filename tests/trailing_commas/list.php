<?php

list($first, $second, $three, $fourth) = $arr;
list(,$first, $second, $three, $fourth,) = $arr;
list(,,$first, $second, $three, $fourth,,) = $arr;
list(,,$first,, $second,, $three,, $fourth,,) = $arr;
list(,,,$first, $second, $three, $fourth,,,) = $arr;
list(,,,$first,,, $second,,, $three,,, $fourth,,,) = $arr;

list(0 => $firstVeryVeryVeryVeryLong, 1 => $secondVeryVeryVeryVeryLong, 2 => $threeVeryVeryVeryVeryLong, 3 => $fourthVeryVeryVeryVeryLong) = $arr;
list(,0 => $firstVeryVeryVeryVeryLong, 1 => $secondVeryVeryVeryVeryLong, 2 => $threeVeryVeryVeryVeryLong, 3 => $fourthVeryVeryVeryVeryLong,) = $arr;
list(,,0 => $firstVeryVeryVeryVeryLong, 1 => $secondVeryVeryVeryVeryLong, 2 => $threeVeryVeryVeryVeryLong, 3 => $fourthVeryVeryVeryVeryLong,,) = $arr;
list(,,0 => $firstVeryVeryVeryVeryLong,, 1 => $secondVeryVeryVeryVeryLong,, 2 => $threeVeryVeryVeryVeryLong,, 3 => $fourthVeryVeryVeryVeryLong,,) = $arr;
list(,,,0 => $firstVeryVeryVeryVeryLong, 1 => $secondVeryVeryVeryVeryLong, 2 => $threeVeryVeryVeryVeryLong, 3 => $fourthVeryVeryVeryVeryLong,,,) = $arr;
list(,,,0 => $firstVeryVeryVeryVeryLong,,, 1 => $secondVeryVeryVeryVeryLong,,, 2 => $threeVeryVeryVeryVeryLong,,, 3 => $fourthVeryVeryVeryVeryLong,,,) = $arr;
