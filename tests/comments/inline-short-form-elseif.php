<?php if ($a): ?>
    <p>a</p>
<?php elseif ($b): ?>
    <?php
    $c = 1;
    # comment in elseif
    $d = 2;
    ?>
<?php else: ?>
    <p>c</p>
<?php endif; ?>
