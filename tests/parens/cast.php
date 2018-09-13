<?php

(int) '1';
( int ) '1';
((int) '1');
((int) ('1'));

$var = (int) '1';
$var = ((int) '1');
$var = ((int) ('1'));
$var = ((bool) (2.3e5));
$var = (object) [];
$var = (object) ([]);
$var = ((object) ([]));
$var = ((object) (array('1' => 'foo')));
$var = ((object) (['1' => 'foo']));
$var = ((object) 'ciao')->scalar;
$var = ((object) array('test'))->{'0'};
$var = (((object) array('test'))->{'0'});
$var = (array) new B();
$var = (array) (new B());
$var = ((array) (new B()));
$var = ((array) (new B()))['foo'];
$var = ((string) 1234)[1];
$var = ((string) 123)();
$var = ((string) (123))();
$var = "test"[0];
$var = (array) "test"[0];
$var = ((array) "test")[0];
$var = [(int) 'key' => (int) '1'];
$var = [((int) 'key') => ((int) '1')];
$var = ([((int) 'key') => ((int) '1')]);
$var = (int) $raw['data'] + $value;
$var = ((int) $raw['data']) + $value;
$var = (bool) $var ? 1 : 2;
$var = (bool) $var + 1 ? 1 : 2;
$var = ((bool) $var) + 1 ? 1 : 2;
$var = (bool) ($var + 1) ? 1 : 2;
$var = ((bool) $var) ? 1 : 2;
$var = ((bool) $var) ? (bool) 1 :  (bool) 2;
$var = ((bool) $var) ? ((bool) 1) :  ((bool) 2);
$var = ((bool) $var) ? (bool) 1 + 2 :  (bool) 2 + 3;
$var = ((bool) $var) ? ((bool) 1 + 2) :  ((bool) 2 + 3);
$var = ((bool) $var) ? (bool) $var ? 1 : 2 :  (bool) $var ? 1 : 2;
$var = ((bool) $var) ? ((bool) $var) ? 1 : 2 :  ((bool) $var) ? 1 : 2;
$var = ((bool) $var) ? (bool) ($var ? 1 : 2) :  (bool) ($var ? 1 : 2);
$var = (bool) ($var ? (bool) ($var ? 1 : 2) :  (bool) ($var ? 1 : 2));
$var = (bool) $var->foo;
$var = (bool) ($var->foo);
$var = ((bool) $var->foo);
$var = ((object) $var)->foo;
$var = ((object) $var)[0];
$var = (int) 'test' + (int) 'test';
$var = ((int) 'test') + ((int) 'test');
$var = ((int) 'test') * ((int) 'test');
$var = ((int) 'test') | ((int) 'test');
$var = ((int) 'test') % ((int) 'test');
$var = @((int) 'test');
$var = @((int) call());
$var = (int) (int) 1;
$var = (int) ((int) 1);
$var = call((int) $var, (int) call(), (int) $minutes * 60);
$var = call(((int) $var), ((int) call()), (int) ($minutes * 60));
$var = $var + (int) $minutes * 60;
$var = $var + (int) ($minutes * 60);

return (int) $var;
return ((int) $var);

if ((int) 1 === 1) {}
if (1 === (int) 1) {}
if (((int) 1) === 1) {}
if (1 === ((int) 1)) {}
if ((int) 1 === (int) 1) {}
if (((int) 1) === (int) 1) {}
if ((int) 1 === ((int) 1)) {}
if (((int) (1)) === ((int) 1)) {}
