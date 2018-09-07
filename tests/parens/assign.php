<?php

$var = 1;
($var = 1);

$var = $var;
($var = $var);

$var = $var = $var;
$var = ($var = $var);
($var = ($var = $var));

$var = $var += 1;
$var = ($var += 1);

$var = ($var = 4) + 5;
$var = ($var = ['key' => 'value']);

($var = $var ? $var : function() { return 0; });

for ($i = 1; $i <= 10; $i++) {
    echo $i;
}

for (($i = 1); ($i <= 10); ($i++)) {
    echo $i;
}
for (($i = 1), ($j = 0); ($i <= 10); ($j += $i), print ($i), ($i++));

if ($a = 1) {}

while ($var = 1) {}
while ($var = current($array) !== FALSE) {}
while (($var = current($array)) !== FALSE) {}

$var = $var || $var = new MyClass();
$var = $var || ($var = new MyClass());

if (true) $var = $var;
if (true) ($var = $var);
if (true) { ($var = $var); } else if (false) ($var = $var);
if (true) { ($var = $var); } else if (false) { ($var = $var); } else ($var = $var);

if (true) {
    $var = $var;
    ($var = $var);
}

while ($i <= 10) $i = 1;
while ($i <= 10) ($i = 1);

do {
    echo $i;
} while ($i = 0);

for ($i = 1; $i <= 10; $i++) $i = 1;
for ($i = 1; $i <= 10; $i++) ($i = 1);

foreach ($arr as &$value) $value = $value * 2;
foreach ($arr as &$value) ($value = $value * 2);

switch ($i = 1) {
    case 0:
        echo "i equals 0";
        break;
    case 1:
        echo "i equals 1";
        break;
    case 2:
        echo "i equals 2";
        break;
}

switch (($i = 1)) {
    case 0:
        echo "i equals 0";
        break;
    case 1:
        echo "i equals 1";
        break;
    case 2:
        echo "i equals 2";
        break;
}
