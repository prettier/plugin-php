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
