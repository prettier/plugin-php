<section class="<?= $sectionClass ?>">
  <header class="<?= $headerClass ?>">
    <?php
      echo $this->element('collection/item-title', [
        'class' => $itemTitleClass,
        'small_title' => $item->small_title,
        'title' => $item->title,
        'url' => $url,
        'color' => $item->title_color ?: 'primary',
      ]);
    ?>
  </header>
</section>

<section class="<?= $sectionClass ?>">
  <header class="<?= $headerClass ?>">
    <?php
      echo $this->element('collection/item-title', [
        'class' => $itemTitleClass,
        'small_title' => $item->small_title,
        'title' => $item->title,
        'url' => $url,
        'color' => $item->title_color ?: 'primary',
      ]);
    ?>
  </header> <?= $someOtherVar()->element('collection/item-title', [
    'class' => $itemTitleClass,
    'small_title' => $item->small_title,
    'title' => $item->title,
    'url' => $url,
    'color' => $item->title_color ?: 'primary',
  ]); ?>
</section>
