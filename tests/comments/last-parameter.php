<?php
class Ulid
{
    public static function isValid(string $ulid /* , int $format = self::FORMAT_BASE_32 */): bool
    {
        return true;
    }

    public static function isValidAgain(
        string $ulid /* , int $format = self::FORMAT_BASE_32 */,
    ): bool {
        return true;
    }

    public function progressStart(int $max = 0 /* , ?string $format = null */,): void
    {
    }
}
