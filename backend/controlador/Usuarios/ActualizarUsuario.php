<?php

namespace Controlador;

use Config\Database;
use Modelo\Usuarios;
use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class ActualizarUsuario
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar solicitudes JSON y permitir acceso desde el frontend.
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: PUT");
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $usuario = new Usuarios($db);

        // Lee el contenido JSON enviado en la solicitud PUT.
        $json = file_get_contents('php://input');

        // Decodifica el JSON a un array de PHP.
        $data = json_decode($json, true);

        // Verifica si se recibieron datos en la solicitud.
        if (empty($data)) {
            Response::json(["error" => "No se recibieron datos"], 400);
            return;
        }

        // Verifica si se proporcionó el ID del usuario.
        if (!isset($data['id'])) {
            Response::json(["error" => "ID de usuario no proporcionado"], 400);
            return;
        }

        // Verifica que los campos obligatorios estén presentes.
        $requiredFields = ['nombres', 'apellidos', 'edad', 'telefono'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) && $field !== 'password' && $field !== 'passwordActual') {
                Response::json(["error" => "Falta el campo $field"], 400);
                return;
            }
        }

        // Asigna los valores de los campos, permitiendo campos opcionales.
        $id = $data['id'];
        $nombres = $data['nombres'] ?? null;
        $apellidos = $data['apellidos'] ?? null;
        $edad = $data['edad'] ?? null;
        $telefono = $data['telefono'] ?? null;
        $password = $data['password'] ?? null;
        $passwordActual = $data['passwordActual'] ?? null;

        // Intenta actualizar el usuario.
        $result = $usuario->actualizar(
            $id,
            $nombres,
            $apellidos,
            $edad,
            $password,
            $telefono,
            $passwordActual
        );

        // Manejo de errores y respuestas basadas en el resultado de la actualización.
        if ($result === 'password_incorrecta') {
            Response::json(["error" => "Tu contraseña actual no coincide"], 400);
        } elseif ($result === 'password_igual') {
            Response::json(["error" => "La nueva contraseña es igual a la actual"], 400);
        } elseif ($result === true) {
            // Cierra la sesión del usuario por seguridad.
            session_start();
            session_destroy();
            Response::json(["message" => "Usuario actualizado con éxito. Se cerró la sesión por seguridad."], 200);
        } else {
            Response::json(["error" => "No se pudo actualizar el usuario"], 500);
        }
    }
}

new ActualizarUsuario();
