<p>Test.</p>
<?php echo 'String.'; ?>
<p>Test.</p>
<?php if ($expression == true): ?>
  <p>Test.</p>
<?php else: ?>
  <p>Test.</p>
<?php endif; ?>
<?php echo '<input type="hidden" value="' . htmlspecialchars($data) . '" />'; ?>
<div></div>
<?php
echo 'foo';
echo 'bar';
?>
<div class="<?php echo $class; ?>"></div>
<div>
  <h1>
    <?php print_welcome_message(); ?>
  </h1>
</div>
<div id="results">
  <table class="sortable">
    <?php $results = $statement->fetchAll(PDO::FETCH_ASSOC); ?>
    <?php do { ?>
      <tr>
        <?php for ($i = 0; $i < count($columns); $i++): ?>
          <td><?php echo $row[$i] ?></td>
        <?php endfor; ?>
      </tr>
    <?php } while (($row = next($results)) != false); ?>
  </table>
</div>
<div id="results">
  <table class="sortable">
    <?php foreach ($statement->fetchAll(PDO::FETCH_ASSOC) as $row): ?>
      <tr>
        <?php foreach ($row as $element): ?>
          <td><?php echo $element ?></td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </table>
</div>
<div>
  <?php switch($variable):
  case 1: ?>
      <div>Newspage</div>
      <?php break; ?>
  <?php case 2: ?>
      </div>Forum<div>
  <?php break; ?>
  <?php endswitch; ?>
</div>
<ul>
  <?php for($i=1;$i<=5;$i++){ ?>
      <li>Menu Item <?php echo $i; ?></li>
  <?php } ?>
</ul>
<?php while(true): ?>
  <span>Text</span>
<?php endwhile; ?>
<h1>Head</h1>
