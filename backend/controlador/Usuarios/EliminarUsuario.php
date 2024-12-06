<?php

namespace Controlador;

use Config\Database;
use Modelo\Usuarios;
use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class EliminarUsuario
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar solicitudes DELETE y permitir acceso desde el frontend.
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: DELETE");
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $usuario = new Usuarios($db);

        // Verifica si se proporciona un ID de usuario en la solicitud.
        if (!isset($_GET['id'])) {
            Response::json(["error" => "ID de usuario no proporcionado"], 400);
            return;
        }

        // Obtiene el ID del usuario y lo convierte a un entero.
        $id = (int) $_GET['id'];

        // Intenta eliminar el usuario con el ID proporcionado.
        $result = $usuario->eliminar($id);

        // Manejo de resultados basados en el resultado de la eliminación.
        if ($result) {
            // Si la eliminación es exitosa, termina la sesión del usuario.
            session_start();
            session_destroy();
            Response::json(["message" => "Usuario eliminado con éxito"], 200);
        } else {
            // Si la eliminación falla, responde con un mensaje de error.
            Response::json(["error" => "No se pudo eliminar el usuario"], 500);
        }
    }
}

new EliminarUsuario();
