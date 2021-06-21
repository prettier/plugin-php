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

throw new VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongClassException('exception');
throw $e;
throw new \Exception('Bad logic in order cancel');

try {} catch (Exception $e) {} finally {}

try {

} catch (Exception $e) {

} finally {

}

try {
    // Comment
} catch (Exception $e) {
    // Comment
} finally {
    // Comment
}

// PHP 8.0 non-capturing exception catch
try {
    // Something
} catch (\Exception) {
    // Nothing
}

try {
    // Something
} catch (MyException | OtherException) {
    // Nothing
}
