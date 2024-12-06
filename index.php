<?php

require '../config/database.php';
require '../src/Core/Model.php';
require '../src/Models/Usuario.php';
require '../src/Controllers/UserController.php';

use App\Controllers\UserController;

$controller = new UserController($pdo);

$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

switch ($path) {
    case '/register':
        if ($requestMethod === 'POST') {
            $controller->register();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case '/login':
        if ($requestMethod === 'POST') {
            $controller->login();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case '/update':
        if ($requestMethod === 'PUT') {
            $controller->updateUser();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case '/delete':
        if ($requestMethod === 'DELETE') {
            $controller->deleteUser();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
        break;
}
