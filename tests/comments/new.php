<?php
$a = new Foo(/*Comment*/);
$a = new Foo(/* Comment */ 1 /*Comments*/);
$a = new // Comment
    Foo();

$a = new // Comment
    class {};

$a = new class // Comment
{};

$a = new class // Comment
($a, $b, $c)
{};

$a = new class
(
    // Comemnt
    $a,
    // Comment
    $b,
    // Comment
    $c
) {};

$a = new class() // Comment
{};

$a = new class() { // Comment
};

$a = new class() {
    // Comment
};

$a = new class() {
    // {{{ properties

    /**
     * The status of foo's universe
     *
     * Potential values are 'good', 'fair', 'poor' and 'unknown'.
     *
     * @var string
     */
    var $foo = 'unknown';

    /**
     * The status of life
     *
     * Note that names of private properties or methods must be
     * preceeded by an underscore.
     *
     * @var bool
     * @access private
     */
    var $_good = true;

    // }}}
    // {{{ setFoo()

    /**
     * Registers the status of foo's universe
     *
     * Summaries for methods should use 3rd person declarative rather
     * than 2nd person imperative, beginning with a verb phrase.
     *
     * Summaries should add description beyond the method's name. The
     * best method names are "self-documenting", meaning they tell you
     * basically what the method does.  If the summary merely repeats
     * the method name in sentence form, it is not providing more
     * information.
     *
     * Summary Examples:
     *   + Sets the label              (preferred)
     *   + Set the label               (avoid)
     *   + This method sets the label  (avoid)
     *
     * Below are the tags commonly used for methods.  A @param tag is
     * required for each parameter the method has.  The @return
     * and @access tags are mandatory.  The @throws tag is required if
     * the method uses exceptions.  @static is required if the method can
     * be called statically.  The remainder should only be used when
     * necessary.  Please use them in the order they appear here.
     * phpDocumentor has several other tags available, feel free to use
     * them.
     *
     * The @param tag contains the data type, then the parameter's
     * name, followed by a description.  By convention, the first noun in
     * the description is the data type of the parameter.  Articles like
     * "a", "an", and  "the" can precede the noun.  The descriptions
     * should start with a phrase.  If further description is necessary,
     * follow with sentences.  Having two spaces between the name and the
     * description aids readability.
     *
     * When writing a phrase, do not capitalize and do not end with a
     * period:
     *   + the string to be tested
     *
     * When writing a phrase followed by a sentence, do not capitalize the
     * phrase, but end it with a period to distinguish it from the start
     * of the next sentence:
     *   + the string to be tested. Must use UTF-8 encoding.
     *
     * Return tags should contain the data type then a description of
     * the data returned.  The data type can be any of PHP's data types
     * (int, float, bool, string, array, object, resource, mixed)
     * and should contain the type primarily returned.  For example, if
     * a method returns an object when things work correctly but false
     * when an error happens, say 'object' rather than 'mixed.'  Use
     * 'void' if nothing is returned.
     *
     * Here's an example of how to format examples:
     * <code>
     * require_once 'Net/Sample.php';
     *
     * $s = new Net_Sample();
     * if (PEAR::isError($s)) {
     *     echo $s->getMessage() . "\n";
     * }
     * </code>
     *
     * Here is an example for non-php example or sample:
     * <samp>
     * pear install net_sample
     * </samp>
     *
     * @param string $arg1 the string to quote
     * @param int    $arg2 an integer of how many problems happened.
     *                     Indent to the description's starting point
     *                     for long ones.
     *
     * @return int the integer of the set mode used. FALSE if foo
     *             foo could not be set.
     * @throws exceptionclass [description]
     *
     * @access public
     * @static
     * @see Net_Sample::$foo, Net_Other::someMethod()
     * @since Method available since Release 1.2.0
     * @deprecated Method deprecated in Release 2.0.0
     */
    function setFoo($arg1, $arg2 = 0)
    {
        /*
         * This is a "Block Comment."  The format is the same as
         * Docblock Comments except there is only one asterisk at the
         * top.  phpDocumentor doesn't parse these.
         */
        if ($arg1 == 'good' || $arg1 == 'fair') {
            $this->foo = $arg1;
            return 1;
        } elseif ($arg1 == 'poor' && $arg2 > 1) {
            $this->foo = 'poor';
            return 2;
        } else {
            return false;
        }
    }

    // }}}
};

$a = new // Comment
Foo();
$a = new class // Comment
{
};
$a = new // Comment
    Foo();
$a = new class // Comment
{
};