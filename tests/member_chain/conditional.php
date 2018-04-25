<?php


($a ? $b : $c)->d();

($a ? $b : $c)->d()->e();

($a ? $b : $c)->d()->e()->f();

($valid
    ? $helper->responseBody($this->currentUser)
    : $helper->responseBody($this->defaultUser))
->map();

($valid
    ? $helper->responseBody($this->currentUser)
    : $helper->responseBody($this->defaultUser))
->map()->filter();

($valid
    ? $helper->responseBody($this->currentUser)
    : $helper->responseBody(defaultUser))
->map();

$object[$valid
    ? $helper->responseBody($this->currentUser)
    : $helper->responseBody($defaultUser)
]->map();

(new TestClassWithReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName())
->map()->filter();

($testThingWithReallyLongName && $someOtherObject->withfunctionThatReturnsSomething())
->map()->filter();

($testThingWithReallyLongName && $someOtherObject->withlongPropThatReturnsSomething)
->map()->filter();

($testThingWithReallyLongName && new SomeObjectWithReallyReallyReallyReallyLongName())
->map()->filter();

($testThingWithReallyLongName && $test = new SomeObjectWithReallyReallyReallyLongName())
->map()->filter();

($testThingWithReallyLongName = new SomeObjectWithReallyReallyReallyReallyReallyReallyReallyReallyLongName())
->map()->filter();
