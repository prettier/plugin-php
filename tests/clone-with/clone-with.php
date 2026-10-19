<?php

$copy = clone($obj);
$copy = clone($obj, ['name' => $name]);
$copy = clone($this->template, ['id' => null, 'createdAt' => new DateTimeImmutable()]);
$copy = clone($obj, $overrides);
$copy = clone($obj, array_merge($defaults, ['name' => $name, 'email' => $email, 'createdAt' => $now]));
$copy = clone($this->veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongPropertyName, ['id' => null, 'createdAt' => $now, 'updatedAt' => $now]);
$copy = clone($obj, [
    'name' => $name,
]);
