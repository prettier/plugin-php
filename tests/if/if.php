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

if (true):
elseif (false):
else:
endif;

if (true) {
} elseif (false) {
} else if (null) {
} else {
}

if (
    $showNoticeValue === '1' &&
    !is_null($currentService) &&
    $currentService->getServiceId() === $activation->getServiceId()
) {
  $test = 1;
}

if (
    $showNoticeValue === '1' &&
    !is_null($currentService) &&
    $currentService->getServiceIdWithReallyReallyReallyLongName() === $activation->getServiceId()
) {
  $test = 1;
}
