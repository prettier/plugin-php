<?php
empty($var);
empty($expected_array_got_string['some_key']);
empty($expected_array_got_string[0]);
empty($expected_array_got_string['0']);
empty($expected_array_got_string[0.5]);
empty($expected_array_got_string['0.5']);
empty($expected_array_got_string['0 Mostel']);

if (empty($var)) {
    echo '$var is either 0, empty, or not set at all';
}
