<?php


namespace Controlador;
require_once dirname(__DIR__, 2) . "/vendor/autoload.php"; // Carga automáticamente las clases usando Composer.
require_once dirname(__DIR__, 2) . "/config/Cors.php"; // Incluye la configuración de CORS.

use Config\Database;
use Modelo\Citas;
use Vista\Response;

/**
 * Controlador para obtener citas canceladas por usuario.
 *
 * Este controlador se encarga de obtener las citas canceladas para un usuario específico.
 *
 * @package Controlador
 */
class ObtenerCitasCanceladas
{
    /**
     * Constructor del controlador.
     *
     * Inicializa el controlador y establece los encabezados HTTP necesarios.
     */
    public function __construct()
    {
        /**
         * Establece el tipo de contenido de la respuesta a JSON.
         */
        header("Content-Type: application/json");

        /**
         * Establece el origen permitido para solicitudes CORS.
         */
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");

        /**
         * Establece los métodos HTTP permitidos para solicitudes CORS.
         */
        header("Access-Control-Allow-Methods: GET");

        /**
         * Establece los encabezados permitidos para solicitudes CORS.
         */
        header("Access-Control-Allow-Headers: Content-Type");

        /**
         * Instancia la base de datos y obtiene la conexión.
         */
        $database = new Database();
        $db = $database->getConnection();

        /**
         * Instancia el modelo de citas.
         */
        $citas = new Citas($db);

        /**
         * Obtiene el ID del usuario desde la solicitud GET.
         */
        $user_id = $_GET['user_id'] ?? null;

        /**
         * Verifica si el ID del usuario es requerido.
         */
        if (!$user_id) {
            /**
             * Retorna un error 400 si el ID del usuario no es proporcionado.
             */
            Response::json(["error" => "user_id es requerido"], 400);
            return;
        }

        /**
         * Obtiene las citas canceladas para el usuario especificado.
         */
        $citasCanceladas = $citas->obtenerCitasCanceladasPorUsuario($user_id);

        /**
         * Verifica si se encontraron citas canceladas.
         */
        if ($citasCanceladas) {
            /**
             * Retorna las citas canceladas con un código de estado 200.
             */
            Response::json($citasCanceladas, 200);
        } else {
            /**
             * Retorna un error 404 si no se encontraron citas canceladas.
             */
            Response::json(["error" => "No se encontraron citas canceladas para este usuario"], 404);
        }
    }
}

/**
 * Ejemplo de uso:
 * 
 * GET /obtener-citas-canceladas?user_id=123
 * 
 * Respuesta:
 * 
 * {
 *     "citas": [
 *         {
 *             "id": 1,
 *             "fecha": "2022-01-01",
 *             "hora": "10:00:00"
 *         },
 *         {
 *             "id": 2,
 *             "fecha": "2022-01-15",
 *             "hora": "14:00:00"
 *         }
 *     ]
 * }
 */

new ObtenerCitasCanceladas();