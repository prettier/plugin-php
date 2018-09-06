<?php

if (($a > $b)) {
    echo "a is bigger than b";
} elseif (($a == $b)) {
    echo "a is equal to b";
} else {
    echo "a is smaller than b";
}

while (($i <= 10)) {
    echo $i++;
}

do {
    echo $i;
} while (($i > 0));

switch (($i)) {
    case (0):
        echo "i equals 0";
        break;
    case ((1)):
        echo "i equals 1";
        break;
    case ('test' . ( 1 > 2 ? 'foo' : 'bar')):
        echo "i equals 2";
        break;
}

switch (($i + 1)) {
    case (0):
        echo "i equals 0";
        break;
    case (1 + 2):
        echo "i equals 1";
        break;
    case (1 + ( 1 > 2 ? 1 : 3)):
        echo "i equals 2";
        break;
}

while (++$i) {
    switch ($i) {
        case 5:
            echo "At 5<br />\n";
            break (2);  /* Exit only the switch. */
        case 10:
            echo "At 10; quitting<br />\n";
            break ((4));  /* Exit the switch and the while. */
        default:
            break;
    }
}

while ($i++ < 5) {
    echo "Outer<br />\n";
    while (1) {
        echo "Middle<br />\n";
        while (1) {
            echo "Inner<br />\n";
            continue (3);
        }
        echo "This never gets output.<br />\n";
        continue ((2));
    }
    echo "Neither does this.<br />\n";
}
