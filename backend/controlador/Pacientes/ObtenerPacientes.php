<?php

namespace Controlador;

use Config\Database;
use Modelo\pacientes;
use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class ObtenerPacientes
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar datos de formulario y permitir acceso desde el frontend.
        header("Content-Type: application/form-data");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $paciente = new pacientes($db);

        // Verifica si se proporciona un ID de dueño para obtener pacientes por dueño.
        if (isset($_GET["DueId"])) {
            $DueId = (int) $_GET["DueId"];
            $result = $paciente->obtenerPorDueño($DueId);

            // Devuelve la respuesta en formato JSON según si se encontraron pacientes o no.
            if ($result) {
                Response::json($result, 200);
            } else {
                Response::json(["error" => "Paciente no encontrado"], 404);
            }
        } 
        // Verifica si se proporciona un ID de paciente para obtener un paciente específico.
        else if (isset($_GET["idPaciente"])) {
            $idPaciente = (int) $_GET["idPaciente"];
            $result = $paciente->obtenerPorIdPaciente($idPaciente);

            // Devuelve la respuesta en formato JSON según si se encontró el paciente o no.
            if ($result) {
                Response::json($result, 200);
            } else {
                Response::json(["error" => "Paciente no encontrado"], 404);
            }
        } 
        // Si no se proporcionan parámetros, devuelve todos los pacientes.
        else {
            $result = $paciente->obtenerTodos();
            Response::json($result, 200);
        }
    }
}

new ObtenerPacientes();
