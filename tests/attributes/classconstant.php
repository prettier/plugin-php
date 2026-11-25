<?php
class QuoteSearch extends Model
{
    #[Deprecated(message: 'use \App\Enums\MoveType')]
    public const TYPES = [
        'IMPORT' => 'import',
        'EXPORT' => 'export',
    ];

    protected $attributes = [
        'search_job_completed' => false,
    ];

    #[Foo]
    public const OTHER = 1;

    public function bar()
    {
    }
}
