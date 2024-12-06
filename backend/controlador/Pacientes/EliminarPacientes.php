<?php

namespace Controlador;

use Modelo\pacientes;
use Vista\Response;
use Config\Database;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class EliminarPacientes
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar contenido JSON y permitir acceso desde el frontend.
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: DELETE");
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $paciente = new pacientes($db);

        // Verifica si el ID del paciente está presente en los parámetros de consulta y es válido.
        if (!isset($_GET['id']) || !is_numeric($_GET['id']) || $_GET['id'] <= 0) {
            Response::json(["error" => "El campo 'id' es obligatorio y debe ser válido."], 400);
            return;
        }

        $id = (int) $_GET['id'];
        $existingPaciente = $paciente->obtenerPorIdPaciente($id);

        // Verifica si el paciente existe.
        if (!$existingPaciente) {
            Response::json(["error" => "Paciente no encontrado"], 404);
            return;
        }

        // Intenta eliminar el paciente.
        if ($paciente->eliminar($id)) {
            Response::json(["message" => "Paciente eliminado con éxito"], 200);
        } else {
            Response::json(["error" => "No se pudo eliminar el paciente"], 500);
        }
    }
}

new EliminarPacientes();
