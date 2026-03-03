<?php
namespace App\Core;

class Router
{
    private static array $routes = [];

    public static function get(string $uri, string $action)
    {
        self::addRoute('GET', $uri, $action);
    }

    public static function post(string $uri, string $action)
    {
        self::addRoute('POST', $uri, $action);
    }

    public static function patch(string $uri, string $action)
    {
        self::addRoute('PATCH', $uri, $action);
    }

    public static function delete(string $uri, string $action)
    {
        self::addRoute('DELETE', $uri, $action);
    }

    private static function addRoute(string $method, string $uri, string $action)
    {
        self::$routes[] = compact('method', 'uri', 'action');
    }

    public static function dispatch(string $requestUri, string $requestMethod)
    {
        $requestUri = parse_url($requestUri, PHP_URL_PATH);

        foreach (self::$routes as $route) {

            $pattern = preg_replace('#\{id\}#', '([a-f0-9]{24})', $route['uri']);
            $pattern = "#^$pattern$#";

            if ($route['method'] === $requestMethod &&
                preg_match($pattern, $requestUri, $matches)) {

                array_shift($matches);

                [$controller, $method] = explode('@', $route['action']);
                $controller = "App\\Controllers\\$controller";

                $instance = new $controller();

                return call_user_func_array([$instance, $method], $matches);
            }
        }

        http_response_code(404);
        echo json_encode([
            'code' => 404,
            'error' => 'Rota não encontrada'
        ]);
    }
}