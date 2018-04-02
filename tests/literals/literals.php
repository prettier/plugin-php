<?php

$boolean_test_true = true;
$boolean_test_false = false;
$string_test = 'hello_world';
$number_test = 12345.1234;
$magic = __LINE__;
$silent = @$foo;
$nowdoc = <<<'EOL'
"test" foo
EOL;
$code = <<<EOF
<?php
\$kernel = unserialize('$kernel');
\$request = unserialize('$request');
EOF;
$content = sprintf(<<<EOF
foo
EOF
);
$content = sprintf(<<<'EOF'
foo
EOF
);
