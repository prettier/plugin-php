<?php
$a = <<<'EOT'
foo   
bar	
EOT;

function f()
{
    $b = <<<'EOT'
        foo   
          
        bar	
        EOT;
}
