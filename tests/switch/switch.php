<?php
switch (2) {
  case 1:
    $test = 'first';
    break;
  case 2:
    $test = 'second';
    break;
  case 10:
  case 20:
    $test = 'big';
    break;
  case 100:
  default:
    $test = 1;
}
