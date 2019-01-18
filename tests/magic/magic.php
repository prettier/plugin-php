<?php
__LINE__;
__FILE__;
__DIR__;
__FUNCTION__;
__CLASS__;
__TRAIT__;
__METHOD__;
__NAMESPACE__;

$magic = __LINE__;

class Foo extends Base
{
    public static function label()
    {
        // Here we run `Base::label`
        return __(parent::{__FUNCTION__}());
    }

    public static function oLabel()
    {
        // Here we run `Base::__FUNCTION__`
        return __(parent::__FUNCTION__());
    }
}
