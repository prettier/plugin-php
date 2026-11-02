<?php if ($a): ?>
    <p>a</p>
<?php else: ?>
    <?php
    $b = 1;

    // comment in else
    if ($b === 1) {
        $b = 2;
    }
    ?>
<?php endif; ?>
