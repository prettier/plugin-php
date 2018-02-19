<?php

for($i = 0; $i < 10; $i++) {
  break;
}

for($i = 0; $i < 10; $i++) {
  for($j = 0; $j < 10; $j++) {
    break 2;
  }
}

while(true) {
  break;
  break 1;
  break (1);
  break 2;
  break (2);
  break(((3)));
}

switch ($test) {
  case 1:
    $hi = 1;
    break;
  case 2:
    $hi = 2;
    break;
  default:
    break;
}