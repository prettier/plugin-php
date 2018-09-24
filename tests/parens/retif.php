<?php

$var ? 1 : 2;
($var ? 1 : 2);

$var = $var ? 1 : 2;
$var = ($var ? 1 : 2);

$var = (int) ($var + 1 === 2 ? '1' : '2');
$var = (int) $var + 1 === 2 ? '1' : '2';
$var = ((int) $var) + 1 === 2 ? '1' : '2';

($var ? $var : $var)();
($var ? $var : $var)->prop;
($var ? $var : $var)->prop();
($var ? $var : $var)[1];
($var ? $var : $var)->d();
($var ? $var : $var)->d()->e();
($var ? $var : $var)->d()->e()->f();
($var
    ? $var->responseBody($var->currentUser)
    : $var->responseBody($var->defaultUser))
->map();
($var
    ? $var.responseBody($var->currentUser)
    : $var.responseBody($var->defaultUser))
->map()->filter();
($var
    ? $var.responseBody($var->currentUser)
    : $var.responseBody($var))
->map();
$var[$var
    ? $var->responseBody($var->currentUser)
    : $var->responseBody($var)]
->map();

$var = $var . $var ? "()" : "";
$var = ($var . $var) ? "()" : "";
$var = $var . ($var ? "()" : "");
$var = +($var ? 1 : 2);
$var = +(+$var ? 1 : 2);
$var = +($var++ ? 1 : 2);
$var = ((true ? 'true' : false) ? (true ? 'true' : false) : (true ? 'true' : false));
$var = $var ? $var1 ? 1 : 2 : $var2 ? 3 : 4;

$var = $var ?: $var ?: $var ?: 'string';
$var = ($var ?: $var) ?: $var ?: 'string';
$var = (($var ?: $var) ?: $var) ?: 'string';
$var = ((($var ?: $var) ?: $var) ?: 'string');
$var = ($var ?: ($var ?: $var)) ?: 'string';
$var = ($var ?: (($var ?: $var) ?: 'string'));
$var = ($var ?: ($var ?: ($var ?: 'string')));
