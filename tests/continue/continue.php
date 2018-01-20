<?php

for($i = 0; $i < 10; $i++) {
  continue;
}

for($i = 0; $i < 10; $i++) {
  for($j = 0; $j < 10; $j++) {
    continue 2;
  }
}

while(true) {
  continue;
  continue 1;
  continue (1);
  continue 2;
  continue (2);
}