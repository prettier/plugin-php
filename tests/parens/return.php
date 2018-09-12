<?php

return;
return 1;
return (1);
return (1 + 2);
return ('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString' . 'veryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString');
return ($var1 + $var2);
return $var ? ($var1 ? 1 : 2) : ($var2 ? 3 : 4);
return ('veryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString' ? 'veryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString' : 'veryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString');
return static::class . '@' . $method;
return ($this->customer->paymentService ?? null);

