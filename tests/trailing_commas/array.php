<?php

$foo = ['foo', 'bar'];
$foo = ['foo', 'bar',];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2'];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2',];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar'];
$foo = ['very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar',];
$foo = array('foo', 'bar');
$foo = array('foo', 'bar',);
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2');
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1', 'very-very-very-very-very-very-very-very-very-long-item-2',);
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar');
$foo = array('very-very-very-very-very-very-very-very-very-long-item-1' => 'foo', 'very-very-very-very-very-very-very-very-very-long-item-2' => 'bar',);
$packages = array_merge(
    idx($composer, 'require', []),
    idx($composer, 'require-dev', [])
);

// nowdoc
$expected = array(
    <<<'EOT'
foo
# bar
baz

EOT
,
);
$expected = array(
    'foo',
    <<<'EOT'
foo
# bar
baz

EOT
,
);
$expected = array(
    <<<'EOT'
foo
# bar
baz

EOT
,
    'bar',
);

// heredoc
$expected = array(
    <<<EOT
foo
# bar
baz

EOT
,
);
$expected = array(
    'foo',
    <<<EOT
foo
# bar
baz

EOT
,
);
$expected = array(
    <<<EOT
foo
# bar
baz

EOT
,
    'bar',
);

// Associative array with nowdoc
$expected = array(
    'key' => <<<'EOT'
foo
# bar
baz

EOT
,
);
$expected = array(
    'foo',
    'key' => <<<'EOT'
foo
# bar
baz

EOT
,
);
$expected = array(
    'key' => <<<'EOT'
foo
# bar
baz

EOT
,
    'bar',
);

// Associative array with heredoc
$expected = array(
    'key' => <<<EOT
foo
# bar
baz

EOT
,
);
$expected = array(
    'foo',
    'key' => <<<EOT
foo
# bar
baz

EOT
,
);
$expected = array(
    'key' => <<<EOT
foo
# bar
baz

EOT
,
    'bar',
);

// Nested with nowdoc
$expected = array(
    'test' => <<<'EOT'
foo
# bar
baz

EOT
,
    'collection' => array(
        array(
            'one' => <<<'EOT'
foo
# bar
baz

EOT
        ),
        array(
            'two' => <<<'EOT'
foo
# bar
baz
EOT
        )
    )
);

// Nested with heredoc
$expected = array(
    'test' => <<<EOT
foo
# bar
baz

EOT
,
    'collection' => array(
        array(
            'one' => <<<EOT
foo
# bar
baz

EOT
        ),
        array(
            'two' => <<<EOT
foo
# bar
baz
EOT
        )
    )
);
