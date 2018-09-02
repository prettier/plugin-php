<div>
    <div>
        <div>
            <div>
                <input id="payment_method_<?php echo esc_attr($gateway->id); ?>"
                    type="radio"
                    class="input-radio"
                    name="payment_method"
                    value="<?php echo esc_attr($gateway->id); ?>"
                    <?php checked($gateway->chosen, true); ?>
                    data-text="<?php echo esc_attr($gateway->order_button_text); ?>"
            </div>
        </div>
    </div>
</div>
