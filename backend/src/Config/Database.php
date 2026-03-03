<?php
namespace App\Config;

use MongoDB\Client;

class Database {
    private static $client = null;

    public static function getConnection() {
        if (self::$client === null) {
            self::$client = new Client('mongodb://mongodb:27017');
        }
        return self::$client->desafio;
    }

}