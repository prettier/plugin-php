text
<?php
if (!empty($dataXXXXXXXXXXXXXXXXXXXX)) {
    foreach ($dataXXXXXXXXXXXXXXXXXXXX as $key => $value) {
        if ((!is_string($value) && !is_numeric($value)) || !is_string($key)) {
            continue;
        }
        if (get_magic_quotes_gpc()) {
            $value = htmlspecialchars(stripslashes((string) $value));
        } else {
            $value = htmlspecialchars((string) $value);
        }
    }
}
?>
text