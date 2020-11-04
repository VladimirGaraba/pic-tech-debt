<?php

return [
    'sqbapi_host' => env('SQBAPI_HOST', 'http://sqlquerybuilder.com/'),
    'sqbapi_key' => env('SQBAPI_KEY', '901bcd22-d2cb-4834-93f9-b8a23f7f2bcf'),
    'model_id' => env('MODEL_ID', '684dbe4c-aece-4323-b7b0-04131a905be1'),
    'model_file_json' => env('MODEL_FILE_JSON', '684dbe4c-aece-4323-b7b0-04131a905be1.json'),

    'connections' => [
        'host' => env('EQ_HOST', '127.0.0.1'),
        'username' => env('EQ_USERNAME', 'homestead'),
        'password' => env('EQ_PASSWORD', 'secret'),
        'database' => env('EQ_DATABASE', 'picsi'),
        'port' => env('EQ_PORT', '3306')
    ]
];
