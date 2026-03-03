<?php
namespace App\Controllers;

use App\Config\Database;
use MongoDBz\BSON\ObjectId;
use Exception;

class RelatorioController {
    private $collection;

    public function __construct() {
        $this->collection = Database::getConnection()->funcionarios;
    }

    public function aniversariantes() :void {
        try {
            $currentMonth = date('m');
            $filter = ['birth_month' => (int) $currentMonth];
            $data = $this->collection->find($filter)->toArray();
            foreach ($data as &$item) {
                $item['_id'] = (string)$item['_id'];
            }
            echo json_encode([
                'code' => http_response_code(200),
                'data' => iterator_to_array($data)
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro interno: ' . $e->getMessage()]);

        }
    }
}