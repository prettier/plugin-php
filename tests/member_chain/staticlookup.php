<?php
DB::table('identity')->insert([
    'ref' => $ref,
    'handle' => $handle
]);

DB::table('identity')->insert([
    'ref' => $ref,
    'handle' => $handle,
    'foo' => $bar,
    'bar' => $foo
]);

DB::table('identity')->insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName([
    'ref' => $ref,
    'handle' => $handle,
    'foo' => $bar,
    'bar' => $foo
]);

$page = TableRegistry
    ::get('Pages')
    ->findByPath($path)
    ->find('published')
    ->find('frontend')
    ->find('somethingElse')
    ->first();

Logger
    ::use_logger('albus')
    ->info('Albus: failed to find active version for albus object', [
        'uuid' => $uuid,
        'requested_date' => $date
    ]);

DBwithlongname::table('identity')->insertReallyReallyReallyLongName()->someOtherReallyReallyLong();

$DBwithlongname->table('identity')::insertReallyReallyReallyLongName()->someOtherReallyReallyLong();

$page = TableRegistry
    ::get('Pages')
    ::findByPath($path)
    ::find('published')
    ::find('frontend')
    ::find('somethingElse')
    ::first();

$page = TableRegistry
    ::insertReallyReallyReallyLongName('Pages')
    ::insertReallyReallyReallyLongName($path)
    ::insertReallyReallyReallyLongName('published')
    ::insertReallyReallyReallyLongName('frontend')
    ::insertReallyReallyReallyLongName('somethingElse')
    ::insertReallyReallyReallyLongName();

$page = TableRegistry::insertReallyReallyReallyLongName[0];
$page = TableRegistry::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName[0];
$page = TableRegistry
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName()
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName[0];
$page = TableRegistry
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName()
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName()
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName()
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName()
    ::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName[0];

$page = TableRegistry::insertReallyReallyReallyLongName('Pages')[0];
$page = TableRegistry::insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName('Pages')[0];

$component = find('.org-lclp-edit-copy-url-banner__link')[0]
    ::getAttribute('href')
    ::indexOf($this->landingPageLink);

$component = Foo::test(['foo' => 'bar', 'bar' => 'foo', 'foobar' => 'barfoo', 'barfoo' => 'foobar']);
$component = Foo::$insertReallyReallyReallyReallyReallyReallyReallyReallyReallyLongName[0];
