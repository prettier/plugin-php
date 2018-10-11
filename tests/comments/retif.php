<?php

$inspect = $condition
    ? // node <= 0.8.x
    function($v, $colors) {
        return $util->inspect($v, 0, 0, $colors);
    }
    : // node > 0.8.x
    function($v, $colors) {
        return $util->inspect($v, [ 'colors' => colors ]);
    };

$extractTextPluginOptions = $shouldUseRelativeAssetPaths
    // Making sure that the publicPath goes back to to build folder.
    ? [ 'publicPath' => (new Foo($cssFilename->split('/')->length))->join('../') ] :
    [];

$extractTextPluginOptions = $shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    [ 'publicPath' => (new Foo($cssFilename->split("/")->length))->join("../") ]
    : [];

$extractTextPluginOptions = $shouldUseRelativeAssetPaths // Making sure that the publicPath goes back to to build folder.
    ? [ 'publicPath' => (new Foo($cssFilename->split("/")->length))->join("../") ]
    : [];

$var = $process->env->NODE_ENV === "production"
    ? call("./configureProdStore") // a
    : call("./configureDevStore"); // b

$var = $a
    // Comment
    ? $b
    // Comment
    : $c;

$var = $a
    ? // Comment
    $b
    : // Comment
    $c;

$var = $a
    ? $b
    // Comment
    : $c
    // Comment
    ;

$var = $a
    ? $b  // Comment
    : $c  // Comment
;

$var = $a
    ? $b // Comment
    : $c; // Comment
