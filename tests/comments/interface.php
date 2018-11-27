<?php

interface IFoo { /* Comments */ }
interface IFoo {
    // Comments
}

// Comment
interface IFoo extends
    // Comment
    MyClass {}

// Comment
interface IFoo extends
    // Comment
    MyClass,
    // Comment
    MyOtherClass,
    // Comment
    OtherClass {}

interface MyInterface
{
}

// Comment
interface MyInterface
{

}

interface MyInterface
{
    // Comment
}
