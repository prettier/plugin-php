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

if (true) {
    return 1;
}

if (true):
  return 1;
elseif (false):
  return 2;
else:
  return;
endif;

if (true):
    return 1;
endif;

if (true) return 1;
elseif (false) return 2;
else if (null) return 3;
else return;

if ( true ) {
    return 1;
} elseif ( false ) {
    return 2;
} else if ( null ) {
    return 3;
}

if (reallyReallyReallyLongFunction() && $this->reallyreallyreallyreallyLongMethodName()) {
  return true;
}

if ($this || $that && $theOtherThing && $someReallyReallyReallyLongBooleanVariable) {
  return true;
}

if ($this || $that && $theOtherThing < $someReallyReallyReallyLongBooleanVariable) {
  return true;
}

if ($this || $that && $theOtherThing < $someReallyReallyReallyLongBooleanVariable == $equalCheck) {
  return true;
}

if ($this || $that && $theOtherThing || $someReallyReallyReallyLongBooleanVariable) {
  return true;
}

if ($this || $that || $theOtherThing || $someReallyReallyReallyLongBooleanVariable) {
  return true;
}

if (($this || $that) && $theOtherThing < $someReallyReallyReallyLongBooleanVariable == $equalCheck) {
  return true;
}

return true ? 1 : 2;
return ($testReallyReallyLong >= 1) ? $someOtherReallyReallyLongVariable : $thisOtherVariable;
return true ?: 2;
return ($testReallyReallyLong === $someOtherReallyReallyLongVariable && $otherTest != $someOtherTest) ? 1 : 0;

$test ? doSomething() : doSomethingElse();
return $test ? doSomething() : doSomethingElse();
$test ?: doSomething();
return $test ?: doSomething();

if (true):
elseif (false):
else:
endif;

if (true) {
} elseif (false) {
} else if (null) {
} else {
}
