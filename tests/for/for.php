<?php
for ($i = 0; $i <= 5; $i++) {
  $test = $i;
}

for ($really_really_long_variable_name = 0; $really_really_long_variable_name <= 5; $really_really_long_variable_name++) {
  $test = $really_really_long_variable_name;
}

for ($i = 1, $j = 0; $i <= 10; $j += $i, print $i, $i++);

for ($really_really_long_variable_name = 0, $and_something_else = 0; $really_really_long_variable_name <= 5; $really_really_long_variable_name++, print $really_really_long_variable_name, $even_more_stuff++);
