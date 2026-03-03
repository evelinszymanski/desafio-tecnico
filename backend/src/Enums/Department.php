<?php
namespace App\Enums;

enum Department: string {
    case HR = 'rh';
    case IT = 'ti';
    case SALES = 'comercial';
    case FINANCE = 'financeiro';
}