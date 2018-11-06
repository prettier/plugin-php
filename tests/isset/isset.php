<?php
isset($test);
isset($test, $test, $test,$test, $test, $test, $test, $test, $test, $test, $test, $test);
isset($test['foo']);
isset($a['cake']['a']['b']);
isset($expected_array_got_string['some_key']);
isset($expected_array_got_string[0]);
isset($expected_array_got_string['0']);
isset($expected_array_got_string[0.5]);
isset($expected_array_got_string['0.5']);
isset($expected_array_got_string['0 Mostel']);

if (isset($var)) {
    echo '$var is set even though it is empty';
}
