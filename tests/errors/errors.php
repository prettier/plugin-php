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

try {
    throw new FirstException();
} catch (FirstException | SecondException $e) {
    // handle first and second exceptions
}

try {
    throw new FirstException();
} catch (FirstException $e) {
    try {
        throw new SecondException();
    } catch (SecondException $e) {
        // handle second exceptions
    }
}
