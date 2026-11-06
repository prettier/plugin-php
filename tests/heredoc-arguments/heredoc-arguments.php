<?php

// A single heredoc or nowdoc argument hugs the call (PER-CS 4.7: one argument
// spanning several lines does not split the list).
$this->addSql(<<<'SQL'
    CREATE TABLE t (
        id INT
    )
    SQL);
$this->addSql(
    <<<'SQL'
    SELECT 1
    SQL
    ,
);
$x = new Exception(<<<MSG
    bad {$thing}
    MSG);
$y = sprintf(<<<'TXT'
    %s
    TXT);

// With other arguments the list is split and the marker takes the comma
// (PER-CS 10 example).
var_dump('foo', <<<'TXT'
    multi
    TXT, 'bar');
var_dump(<<<'TXT'
    first
    TXT, 'bar');

// Member chains and arrays.
$qb->where(<<<'DQL'
    a = 1
    DQL)->andWhere('b = 2');
$arr = ['k' => <<<'V'
    val
    V, 'other' => 1];
$list = [<<<'A'
    a
    A, <<<'B'
    b
    B];

// A concatenation operand keeps the operator on its own line.
$s = <<<'EOF'
    string
    EOF . $var;
