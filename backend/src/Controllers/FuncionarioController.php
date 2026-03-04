<?php
namespace App\Controllers;

use App\Config\Database;
use App\Models\Funcionario;
use App\Enums\{WorkModel, Status, EmploymentType, Department};
use MongoDB\BSON\ObjectId;

class FuncionarioController {
    private $collection;

    public function __construct() {
        $this->collection = Database::getConnection()->funcionarios;
    }

    public function index(): void {
        $filters = [];
        
        if (!empty($_GET['department'])) {
            $filters['department'] = $_GET['department'];
        }

        if (!empty($_GET['status'])) {
            $filters['status'] = $_GET['status'];
        }

        if (!empty($_GET['employment_type'])) {
            $filters['employment_type'] = $_GET['employment_type'];
        }

        if (!empty($_GET['work_model'])) {
            $filters['work_model'] = $_GET['work_model'];
        }

        $cursor = $this->collection->find($filters);
        $data = $cursor->toArray();
        // Converte _id para string
        foreach ($data as &$item) {
            $item['_id'] = (string)$item['_id'];
        }
        http_response_code(200);
        echo json_encode([
            'code' => 200,
            'data' => $data,
            'total' => count($data)
        ]);
    }

    public function show(string $id): void {
        $employee = $this->collection->findOne([
            '_id' => new ObjectId($id)
        ]);

        if (!$employee) {
            http_response_code(404);
            echo json_encode(['error' => 'Funcionário não encontrado.']);
            return;
        }
        
        $employee['_id'] = (string)$employee['_id'];
        http_response_code(200);
        echo json_encode([
            'code' => 200,
            'data' => $employee
        ]);
    }

    public function store(): void {
        $data = json_decode(file_get_contents('php://input'), true);

        try {

            $funcionario = new Funcionario(
                name: $data['name'],
                email: $data['email'],
                role: $data['role'],
                admission_date: $data['admission_date'],
                birthday: $data['birthday'],
                birth_month: $data['birth_month'],
                work_model: WorkModel::from($data['work_model']),
                status: Status::from($data['status']),
                employment_type: EmploymentType::from($data['employment_type']),
                department: Department::from($data['department'])
            );

            $result = $this->collection->insertOne($funcionario->toArray());

            http_response_code(201);
            echo json_encode([
                'message' => 'Funcionário criado com sucesso!',
                'id' => (string)$result->getInsertedId()
            ]);
        } catch (\ValueError $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Valor inválido nos campos, por favor revise o formumário.']);
        } catch (\Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function update(string $id): void {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados inválidos ou ausentes.']);
            return;
        }

        try {
            // Busca funcionário atual no MongoDB
            $currentDoc = $this->collection->findOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);

            if (!$currentDoc) {
                http_response_code(404);
                echo json_encode(['error' => 'Funcionário não encontrado.']);
                return;
            }

            // Mescla os dados atuais com os novos (para PATCH)
            $mergedData = array_merge((array)$currentDoc, $data);

            $funcionario = new Funcionario(
                $mergedData['name'] ?? '',
                $mergedData['email'] ?? '',
                $mergedData['role'] ?? '',
                $mergedData['admission_date'] ?? '',
                $mergedData['birthday'] ?? '',
                $mergedData['birth_month'] ?? '',
                WorkModel::from($mergedData['work_model']),
                Status::from($mergedData['status']),
                EmploymentType::from($mergedData['employment_type']),
                Department::from($mergedData['department']),
                (string)($mergedData['_id'] ?? null) // Mantém o ID
            );

            $result = $this->collection->updateOne(
                ['_id' => new \MongoDB\BSON\ObjectId($id)],
                ['$set' => $funcionario->toArray()]
            );

            echo json_encode([
                'message' => 'Funcionário atualizado com sucesso!',
                'modifiedCount' => $result->getModifiedCount()
            ]);

        } catch (\ValueError $e) {
            http_response_code(400);
            echo json_encode(['error' => 'Valor inválido nos campos enum']);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro interno: ' . $e->getMessage()]);
        }
    }

    public function destroy(string $id): void {
        $this->collection->deleteOne([
            '_id' => new ObjectId($id)
        ]);

        echo json_encode(['deleted' => true]);
    }

    public function aniversariantes(): void {
        try {
            $currentMonth = date('m');
            $filter = ['birth_month' => (int) $currentMonth];
            $data = $this->collection->find($filter)->toArray();
            
            foreach ($data as &$item) {
                $item['_id'] = (string)$item['_id'];
            }

            http_response_code(200);
            echo json_encode([
                'code' => 200,
                'data' => iterator_to_array($data)
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro interno: ' . $e->getMessage()]);
        }
    }
}