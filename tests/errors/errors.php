<?php
try {
    throw new OtherException();
} catch (Exception | TestException $e) {
    echo 'Caught exception: ',  $e->getMessage();
} catch (OtherException $i) {
    echo 'Caugh other';
} finally {
    echo "First finally";
}
