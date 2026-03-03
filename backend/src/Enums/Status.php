<?php
namespace App\Enums;

enum Status: string {
    case ACTIVE = 'ativo';
    case INACTIVE = 'inativo';
    case AWAY = 'ausente';
}