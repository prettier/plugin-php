<?php

$wrapper->find('SomewhatLongNodeName')->prop('longPropFunctionName')->then(function() {
    doSomething();
});

$wrapper->find('SomewhatLongNodeName')->prop('longPropFunctionName')->then(function() {
    doSomething();
});

$wrapper->find('SomewhatLongNodeName')->prop('longPropFunctionName', 'second argument that pushes this group past 80 characters')->then(function() {
    doSomething();
});

$wrapper->find('SomewhatLongNodeName')->prop('longPropFunctionName')->then(function() {
    doSomething();
});
