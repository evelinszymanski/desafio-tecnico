<?php
namespace App\Enums;

enum WorkModel: string {
    case REMOTE = 'remoto';
    case HYBRID = 'hibrido';
    case ONSITE = 'presencial';
}