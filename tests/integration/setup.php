<?php

use Flarum\Testing\integration\Setup\SetupScript;
use Flarum\Testing\integration\Config;

require __DIR__.'/../vendor/autoload.php';

$config = new Config([
    'database' => [
        'driver' => 'mysql', // 显式指定使用MySQL
        'host' => '127.0.0.1',
        'port' => '3306',
        'database' => 'flarum_test',
        'username' => 'root',
        'password' => '',
        'prefix' => '',
    ],
    'admin' => [
        'username' => 'flarum',
        'password' => 'password',
        'email' => 'admin@example.com',
    ],
]);

$script = new SetupScript($config);
$script->run();