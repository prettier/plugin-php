<?php

#[W('a', null, 'looooong','paraaaams','list','aaaaaaaaaaaaa','vvvvvvvvvvvv','cccccccccc','eeeeeeeeeee'), X()]
final class ORM
{

    #[
        ORM\Column,
        ORM\CustomIdGenerator(class: "bar"),
        ORM\GeneratedValue(strategy: 'CUSTOM'),
        ORM\Id
    ]
    private string $id;
}
