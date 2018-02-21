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

switch ($var):
  case 1:
  case 2:
    echo "Goodbye!";
    break;
  default:
    echo "I only understand 1 and 2.";
endswitch;
