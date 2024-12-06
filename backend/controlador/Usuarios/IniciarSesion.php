<?php

namespace Controlador;

use Config\Database;
use Modelo\Usuarios;
use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class IniciarSesion
{
    public function __construct()
    {
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");
        session_start(); // Iniciar la sesión

        $database = new Database();
        $db = $database->getConnection();
        $usuario = new Usuarios($db);

        $data = json_decode(file_get_contents("php://input"));

        if (!$data) {
            Response::json(["message" => "No se recibieron datos"], 400);
            return;
        }

        if (!isset($data->email) || !isset($data->password)) {
            Response::json(["message" => "Faltan los campos email o password"], 400);
            return;
        }

        if (!$usuario->emailExists($data->email)) {
            Response::json([
                'message' => 'Cuenta no existente'
            ], 401);
            return;
        }

        $result = $usuario->iniciarSesion($data->email, $data->password);

        if ($result) {
            // Almacenar toda la información del usuario en la sesión
            $_SESSION['usuario'] = $result;

            Response::json(["message" => "Sesión iniciada con éxito", "usuario" => $result], 200);
        } else {
            Response::json(["message" => "Email o contraseña incorrectos"], 401);
        }
    }
}

new IniciarSesion();
