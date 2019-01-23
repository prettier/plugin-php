<?php

$version = $someLongString
    ->split('jest version =')
    ->pop()
    ->split(EOL)[0]
    ->trim();

$component = find('.org-lclp-edit-copy-url-banner__link')[0]
    ->getAttribute('href')
    ->indexOf($this->landingPageLink);

nock('test')
    ->matchHeader('Accept', 'application/json')['string']('/foo')
    ->reply(200, [
        'foo' => 'bar'
    ]);

$data->forEach(function ($key) {
    $data['key']('foo')
        ->then(function () { $console->log('bar'); })
        ->catch(function () { $console->log('baz'); });
});

$data->forEach(function ($key) {
    $data('foo')[$key]('bar')
        ->then(function () { $console->log('bar'); })
        ->catch(function () { $console->log('baz'); });
});

$window->Data['key']("foo")
    ->then(function () { return $a; })
    ->catch(function () { return $b; });

$window->Data['key']['foo']("foo")
    ->then(function () { return $a; })
    ->catch(function () { return $b; });

$window->foo_{'bar' . 'baz'}
    ['key']("foo")
    ->then(function () {
        return $a;
    })
    ->catch(function () {
        return $b;
    });

$window->{call()}
    ['key']("foo")
    ->then(function () {
        return $a;
    })
    ->catch(function () {
        return $b;
    });
