<?php
function call($store) {
    return callApi($endpoint, $schema)->then(
        function ($response) {
            return next(actionWith([
                'response' => $response,
                'type' => $successType
            ]));
        },
        function ($error) {
            return next(actionWith([
                'type' => $failureType,
                'error' => $error->message || 'Something bad happened'
            ]));
        }
  );
}
