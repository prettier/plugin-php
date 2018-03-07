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
