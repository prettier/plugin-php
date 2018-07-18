<?php

function inline() {
    ?>
    <span>Hello World!</span>
    <?php
}

function inline1() {
    ?><span>Hello World!</span>
    <?php
}

function inline2() {
    ?>
    <span>Hello World!</span><?php
}

function inlineInOneLine() {
    ?><span>Hello World!</span><?php
}

function inlineNested() {
    ?>
    <div>
      <span>Hello World!</span>
    </div>
    <?php
}

function inlineNested1() {
    ?><div>
    <span>Hello World!</span>
    </div><?php
}

function inlineMultipleStatements() {
    $a = 1;
    ?>
    <span>Hello World!</span>
    <?php
    $b = 1;
    ?>
    <span>Hello World!</span>
    <?php
    $c = 1;
}

function test() {
  ?>
  <span>Hello World!</span>
  <?php
  $a = 1;
  $b = 1;
  $c = 1;
}

function otherTest()
{
    echo '1';
    ?>
      <div>
        <div>
          <div>
            <?php echo '2'; ?>
            <div>
            <?php
            echo '3';
            echo '4';
            echo '5';
            ?>
            </div>
          </div>
        </div>
      </div>
    <?php
    echo '6';
}

function fff()
{
    ?>
    <div>
      <div>
      <?php
      function ffff()
      {
          ?>
          <div>
            <div>
              <?php echo 'test'; ?>
            </div>
          </div>
          <?php
      }
      ?>
      </div>
    </div>
    <?php
}
