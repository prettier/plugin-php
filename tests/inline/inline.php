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

function ffff()
{
  echo '1';
  echo '2';
  echo '3';
  echo '4';
  ?>
  <div>foo</div>
  <?php
  echo '5';
  echo '6';
  echo '7';
  echo '8';
}

function fffff()
{
    echo '1';
    echo '2';
    echo '3';
    echo '4';
    ?>
    <div>
      <div>
        <div>
          <?php
          echo 'nested';
          echo 'nested';
          echo 'nested';
          ?>
        </div>
      </div>
    </div>
    <?php
    echo '5';
    echo '6';
    echo '7';
    echo '8';
}

function ffffff()
{
    echo '1';
    echo '2';
    echo '3';
    echo '4';
    ?>
      <div>
        <div>
          <div>
            <div>
                <?php
                function ffffff() {
                    echo '1';
                    echo '2';
                    echo '3';
                    echo '4';
                    ?>
                    <div>FooBar</div>
                    <?php
                    echo '5';
                    echo '6';
                    echo '7';
                    echo '8';
                }
                ?>
            </div>
          </div>
        </div>
      </div>
    <?php
    echo '5';
    echo '6';
    echo '7';
    echo '8';
}
