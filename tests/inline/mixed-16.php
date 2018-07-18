<section class="<?= $sectionClass ?>">
  <header class="<?= $headerClass ?>">
  <?php echo $someOtherVar()->element('collection/item-title', [
      'class' => $itemTitleClass,
      'small_title' => $item->small_title,
      'title' => $item->title,
      'url' => $url,
      'color' => $item->title_color ?: 'primary',
  ], [
      'foo' => 'bar',
      'bar' => 'foo',
      'barfoo' => 'foobar',
      'foobar' => 'barfoo'
  ]); ?>
  </header>
  <div> <?php echo $someOtherVar()->element('collection/item-title', [
      'class' => $itemTitleClass,
      'small_title' => $item->small_title,
      'title' => $item->title,
      'url' => $url,
      'color' => $item->title_color ?: 'primary',
  ], [
      'foo' => 'bar',
      'bar' => 'foo',
      'barfoo' => 'foobar',
      'foobar' => 'barfoo'
  ]); ?>
  </div>
</section>
