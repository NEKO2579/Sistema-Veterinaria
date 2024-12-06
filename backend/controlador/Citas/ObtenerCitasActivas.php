<?php

namespace Controlador; // Define el espacio de nombres 'Controlador' para organizar la clase.

use Config\Database; // Importa la clase 'Database' del espacio de nombres 'Config'.
use Modelo\Citas; // Importa la clase 'Citas' del espacio de nombres 'Modelo'.
use Vista\Response; // Importa la clase 'Response' del espacio de nombres 'Vista'.

require_once dirname(__DIR__, 2) . "/vendor/autoload.php"; // Carga automáticamente las clases usando Composer.
require_once dirname(__DIR__, 2) . "/config/Cors.php"; // Incluye la configuración de CORS.

class ObtenerCitasActivas
{
    public function __construct()
    {
        header("Content-Type: application/json"); // Define el tipo de contenido como JSON.
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/"); // Permite solicitudes CORS desde 'http://localhost:5173'.
        header("Access-Control-Allow-Methods: GET"); // Permite solo el método HTTP GET.
        header("Access-Control-Allow-Headers: Content-Type"); // Permite solo el encabezado 'Content-Type'.

        $database = new Database(); // Crea una instancia de la clase 'Database'.
        $db = $database->getConnection(); // Obtiene la conexión a la base de datos.
        $citas = new Citas($db); // Crea una instancia de la clase 'Citas' y le pasa la conexión a la base de datos.

        $user_id = $_GET['user_id'] ?? null; // Obtiene el 'user_id' de los parámetros de consulta (query string) o lo establece como null si no está presente.

        // Verifica si se ha proporcionado 'user_id'.
        if (!$user_id) {
            Response::json(["error" => "user_id es requerido"], 400); // Responde con un error 400 si 'user_id' no está presente.
            return; // Finaliza la ejecución del constructor.
        }

        // Llama al método 'obtenerCitasActivasPorUsuario' para obtener las citas activas del usuario.
        $citasActivas = $citas->obtenerCitasActivasPorUsuario($user_id);

        // Verifica si se encontraron citas activas.
        if ($citasActivas) {
            Response::json($citasActivas, 200); // Responde con las citas activas y un código de estado 200 (OK).
        } else {
            Response::json(["error" => "No se encontraron citas activas para este usuario"], 404); // Responde con un error 404 si no se encontraron citas activas.
        }
    }
}

new ObtenerCitasActivas(); // Crea una nueva instancia de la clase 'ObtenerCitasActivas', ejecutando así el constructor.

?>
