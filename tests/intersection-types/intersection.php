<?php
function generateSlug(HasTitle&HasId $post) {
	return strtolower($post->getTitle()) . $post->getId();
}

function test(foo|bar &$input) {}
