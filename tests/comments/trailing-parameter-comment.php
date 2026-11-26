<?php

class MyClass
{
    public static function from(
        int $value1, // comment works
        int $value2 // comment gets moved down
    ) {
        return $value1 + $value2;
    }

    public function withReturnType(
        int $value1,
        int $value2 // trailing comment
    ): int {
        return $value1 + $value2;
    }
}

function plainFunction(
    int $value1,
    int $value2 // trailing comment
) {
    return $value1 + $value2;
}
