<?php

use App\Core\Router;

Router::get('/api/funcionarios', 'FuncionarioController@index');
Router::get('/api/funcionarios/{id}', 'FuncionarioController@show');
Router::post('/api/funcionarios', 'FuncionarioController@store');
Router::patch('/api/funcionarios/{id}', 'FuncionarioController@update');
Router::delete('/api/funcionarios/{id}', 'FuncionarioController@destroy');

Router::get('/api/relatorios/aniversariantes', 'RelatorioController@aniversariantes');