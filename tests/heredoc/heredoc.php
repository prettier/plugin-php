<?php

class A
{
    const liftDataWithInlineRanges = <<<EOD
<?xml version="1.0" encoding="UTF-8" ?>
<?oxygen RNGSchema="lift.rng" type="xml"?>
<?blueprint schema="lift.rng"?>

<lift version="0.13" producer="LexiquePro.3.6">
EOD;
}

$nowdoc = <<<'EOD'
<?xml version="1.0" encoding="UTF-8" ?>
<?oxygen RNGSchema="lift.rng" type="xml"?>
EOD;

$string = "<?xml version=\"1.0\" ?>\n<?oxygen RNGSchema=\"lift.rng\"?>";
