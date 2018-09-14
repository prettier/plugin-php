<?php

+$var;
+($var);
(+$var);

-$var;
-($var);
(-$var);

~$var;
~($var);
(~$var);

!$var;
!($var);
(!$var);

!!$var;
!(!$var);
(!(!$var));
(!!$var);

$var = (+$var);
$var = +(+$var);

$var = (-$var);
$var = -(-$var);

$var = -(+$var);
$var = +(-$var);

$var = (~$var);
$var = ~(~$var);

$var = (!$var);
$var = !(!$var);

$a = +$a ** 1;
$a = (+$a) ** 1;
$a = 1 ** (+$a);

$var = call(+$a);
$var = call((+$a));

$var = +($foo->bar);

$var = +$var || +$var;
$var = (+$var) || (+$var);
$var = ((+$var) || (+$var));

$var = -(+($var));

$var = ~(+$var);

$var = ~$var += 1;
$var = ~($var += 1);

(+$a->b)->call();
(+$a->b)[1];
(+$var)();
$var = call(+$var->_uuidCounter);
