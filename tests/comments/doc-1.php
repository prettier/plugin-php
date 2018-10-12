<?php

/** @var int $int This is a counter. */
$int = 0;

// there should be no docblock here
$int++;

/**
 * This class acts as an example on where to position a DocBlock.
 */
class Foo
{
    /** @var string|null $title contains a title for the Foo */
    protected $title = null;

    /**
     * Sets a single-line title.
     *
     * @param string $title A text for the title.
     *
     * @return void
     */
    public function setTitle($title)
    {
        // there should be no docblock here
        $this->title = $title;
    }
}

/** @var \Sqlite3 $sqlite */
foreach($connections as $sqlite) {
    // there should be no docblock here
    $sqlite->open('/my/database/path');
}

/**
 * This is a Summary.
 *
 * This is a Description. It may span multiple lines
 * or contain 'code' examples using the _Markdown_ markup
 * language.
 *
 * @see Markdown
 *
 * @param int        $parameter1 A parameter description.
 * @param \Exception $e          Another parameter description.
 *
 * @\Doctrine\Orm\Mapper\Entity()
 *
 * @return string
 */
function test($parameter1, $e)
{
}
