<?php
if (true) {
  return 1;
} elseif (false) {
  return 2;
} else if (null) {
   return 3;
} else {
  return;
}

if (true):
  return 1;
elseif (false):
  return 2;
else:
  return;
endif;

if ( true ) {
    return 1;
} elseif ( false ) {
    return 2;
} else if ( null ) {
    return 3;
}

return true ? 1 : 2;
return ($testReallyReallyLong >= 1) ? $someOtherReallyReallyLongVariable : $thisOtherVariable;
return true ?: 2;

$test ? doSomething() : doSomethingElse();
return $test ? doSomething() : doSomethingElse();
$test ?: doSomething();
return $test ?: doSomething();
