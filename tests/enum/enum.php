<?php

interface Colorful
{
	public function color(): string;
}

trait Rectangle
{
	public function shape(): string {
		return "Rectangle";
	}
}

enum Suit implements Colorful
{
	use Rectangle; // https://www.php.net/manual/en/language.enumerations.traits.php

	case Hearts;
	case Diamonds;
	case Clubs;
	case Spades;

	public const Favorite = self::Clubs;

	// Fulfills the interface contract.
	public function color(): string
	{
		return match($this) {
			Suit::Hearts,
			Suit::Diamonds => 'Red',
			Suit::Clubs,
			Suit::Spades => 'Black',
		};
	}

	// Not part of an interface; that's fine.
	public function shape(): string
	{
		return "Rectangle";
	}

	public static function staticMethod(){
		return self::Clubs;
	}
}

function paint(Colorful $c) { }

paint(Suit::Clubs);  // Works

print Suit::Diamonds->shape(); // prints "Rectangle"


class Foo
{
	const Bar = Suit::Hearts; // https://www.php.net/manual/en/language.enumerations.expressions.php
}


enum BackedSuit: string
{
	case Hearts = 'H';
	case Diamonds = 'D';
	case Clubs = 'C';
	case Spades = 'S';
}