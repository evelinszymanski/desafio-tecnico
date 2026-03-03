<?php
namespace App\Enums;

enum EmploymentType: string {
    case FULL_TIME = 'integral';
    case INTERNSHIP = 'estagio';
    case TEMPORARY = 'temporario';
}