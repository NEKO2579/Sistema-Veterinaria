<?php

namespace Controlador; // Define el espacio de nombres 'Controlador' para organizar la clase.

use Config\Database; // Importa la clase 'Database' del espacio de nombres 'Config'.
use Modelo\Citas; // Importa la clase 'Citas' del espacio de nombres 'Modelo'.
use Vista\Response; // Importa la clase 'Response' del espacio de nombres 'Vista'.

require_once dirname(__DIR__, 2) . "/vendor/autoload.php"; // Carga automáticamente las clases usando Composer.
require_once dirname(__DIR__, 2) . "/config/Cors.php"; // Incluye la configuración de CORS.

class EliminarCitas
{
    public function __construct()
    {
        header("Content-Type: application/json"); // Define el tipo de contenido como JSON.
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/"); // Permite solicitudes CORS desde 'http://localhost:5173'.
        header("Access-Control-Allow-Methods: PUT"); // Permite solo el método HTTP PUT.
        header("Access-Control-Allow-Headers: Content-Type"); // Permite solo el encabezado 'Content-Type'.
    
        $database = new Database(); // Crea una instancia de la clase 'Database'.
        $db = $database->getConnection(); // Obtiene la conexión a la base de datos.
        $citas = new Citas($db); // Crea una instancia de la clase 'Citas' y le pasa la conexión a la base de datos.
    
        $json = file_get_contents('php://input'); // Obtiene los datos JSON enviados en la solicitud.
        $data = json_decode($json, true); // Decodifica el JSON en un arreglo asociativo.
    
        // Verifica si el ID es inválido o no se proporcionó.
        if (empty($data['id']) || !filter_var($data['id'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]])) {
            Response::json(["error" => "El ID de la cita es inválido o no se ha proporcionado"], 400); // Responde con un error 400 si el ID es inválido.
            return; // Finaliza la ejecución del constructor.
        }
    
        // Verifica si la razón de cancelación es inválida o no se proporcionó.
        if (empty($data['cancellation_reason']) || trim($data['cancellation_reason']) === '') {
            Response::json(["error" => "La razón de cancelación es inválida o no se ha proporcionado"], 400); // Responde con un error 400 si la razón de cancelación es inválida.
            return;
        }
    
        // Verifica si el campo 'cancelled_by' es inválido o no se proporcionó.
        if (empty($data['cancelled_by']) || trim($data['cancelled_by']) === '') {
            Response::json(["error" => "El campo 'cancelled_by' es inválido o no se ha proporcionado"], 400); // Responde con un error 400 si el campo 'cancelled_by' es inválido.
            return;
        }
    
        $id = (int)$data['id']; // Convierte el ID a un entero.
        $cancellation_reason = trim($data['cancellation_reason']); // Elimina espacios en blanco de la razón de cancelación.
        $cancelled_by = trim($data['cancelled_by']); // Elimina espacios en blanco del campo 'cancelled_by'.
    
        // Intentar eliminar la cita usando el método 'eliminar' de la clase 'Citas'.
        $result = $citas->eliminar($id, $cancellation_reason, $cancelled_by);
    
        if ($result) {
            // Si la eliminación es exitosa, responde con un mensaje de éxito.
            Response::json(["message" => "Cita eliminada con éxito y movida a la tabla citas_eliminadas"], 200);
        } else {
            // Si la eliminación falla, responde con un error 500.
            Response::json(["error" => "No se pudo eliminar la cita. Verifica que el ID es correcto o intenta nuevamente."], 500);
        }    
    }
}

new EliminarCitas(); // Crea una nueva instancia de la clase 'EliminarCitas', ejecutando así el constructor.

?>
