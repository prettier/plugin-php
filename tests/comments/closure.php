<?php

$var = function (/* Comment */) {};
$var = function (/* Comment */ $arg /* Comment */) {};

$this->getProtocolsForPerson($person)
    ->map(function ($protocol) {
        //            $protocol->history_data = $this->getHistory(
        //                $protocol->objeto_id
        //            )->map(function ($history) {
        //                $history->history_fields = $this->getHistoryFiles(
        //                    $history->historicu_id
        //                );
        //
        //                return $history;
        //            });

        return $protocol;
    })
    ->each(function ($protocol) {
        $this->importProtocol($protocol);

        $this->increment(
            10,
            "{$protocol->perssoa_name} ({$protocol->perssoa_id})"
        );
    });
