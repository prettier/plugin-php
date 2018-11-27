<?php
for // Comment
(;;);

for /* Comment */(;;);

// Comment
for ($i = 1; $i <= 10; $i++) { // Comment
    // Comment
    echo $i; // Comment
    // Comment
} // Comment


for (/* Comments */ $i /* Comments */ = /* Comments */ 1 /* Comments */; /* Comments */ $i /* Comments */ <= /* Comments */ 10 /* Comments */; /* Comments */ $i++ /* Comments */) {
    echo $i;
}

foreach([1,2,3] as $i)
    // this comment will screw things up
    echo $i;

for($i = 1; $i < 10; $i++)
    // this comment will screw things up
    echo $i;

for (;;) { // Comment
}

for (
    // Comment
    $i = 0;
    // Comment
    $i <= 5;
    // Comment
    $i++
) {
}

for (
    $i = 0; // Comment
    $i <= 5; // Comment
    $i++ // Comment
) {
}

for ( // Comment
    $i = 0;
    $i <= 5;
    $i++
) {
}

for (
    // Comment
    $i = 1,
    // Comment
    $j = 0;
    // Comment
    $i <= 10;
    // Comment
    $j += $i,
    // Comment
    print $i,
    // Comment
    print $i++
);
