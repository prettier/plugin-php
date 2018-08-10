<?php if (!is_ajax()) { ?>
    <?php do_action('woocommerce_review_order_after_payment'); ?>
<?php } ?>

<?php if (!is_ajax()) { ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
<?php } ?>

<?php if (!is_ajax()) { ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
    <?php do_action('woocommerce_review_order_after_payment'); ?>
<?php } ?>

<?php if (!is_ajax()) { ?>
    <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
<?php } ?>

<?php if (!is_ajax()) { ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
    <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
<?php } ?>

<?php

function test()
{
    ?>
    <?php if (!is_ajax()) { ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
    <?php } ?>
    <?php
}

function testTwo()
{
    ?>
    <?php if (!is_ajax()) { ?>
        <?php if (!is_ajax()) { ?>
            <?php do_action('woocommerce_review_order_after_payment'); ?>
        <?php } ?>
        <?php do_action('woocommerce_review_order_after_payment'); ?>
        <?php if (!is_ajax()) { ?>
            <?php do_action('woocommerce_review_order_after_payment'); ?>
        <?php } ?>
    <?php } ?>
    <?php
}
