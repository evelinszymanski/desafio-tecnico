<?php

namespace App\Models;

use App\Enums\{WorkModel, Status, EmploymentType, Department};

readonly class Funcionario {
    public function __construct(
        public string $name,
        public string $email,
        public string $role,
        public string $admission_date,
        public string $birthday,
        public int $birth_month,
        public WorkModel $work_model,
        public Status $status,
        public EmploymentType $employment_type,
        public Department $department,
        public ?string $id = null,
    ) {
        $this->validate();
    }

    private function validate() {
        if (empty($this->name) || empty($this->email) || empty($this->role) || empty($this->admission_date) || empty($this->birthday)) {
            throw new \InvalidArgumentException('Todos os campos são obrigatórios.');
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Email inválido.');
        }

        if (!$this->isValidDate($this->admission_date) || !$this->isValidDate($this->birthday)) {
            throw new \InvalidArgumentException('Data de admissão ou aniversário inválida. Use YYYY-MM-DD.');
        }
    }

    private function isValidDate(string $date): bool {
        $d = \DateTime::createFromFormat('Y-m-d', $date);
        return $d && $d->format('Y-m-d') === $date;
    }

    public function toArray(): array {
        return [
            'name' => htmlspecialchars(strip_tags($this->name)),
            'email' => $this->email,
            'role' => htmlspecialchars(strip_tags($this->role)),
            'admission_date' => $this->admission_date,
            'birthday' => $this->birthday,
            'birth_month' => $this->birth_month,
            'work_model' => $this->work_model->value,
            'status' => $this->status->value,
            'employment_type' => $this->employment_type->value,
            'department' => $this->department->value,
            'created_at' => date('Y-m-d H:i:s')
        ];
    }
}