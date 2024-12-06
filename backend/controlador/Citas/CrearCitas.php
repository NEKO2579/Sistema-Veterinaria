<?php

namespace Controlador;

use Modelo\Citas;
use Vista\Response;
use Config\Database;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";
// require_once dirname(__DIR__) . "/ValidarCita.php";
require_once "./ValidarCita.php";



class CrearCitas
{

    public function __construct()
    {
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");

        $database = new Database();
        $db = $database->getConnection();
        $citas = new Citas($db);

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (empty($data)) {
            Response::json(["error" => "No se recibieron datos"], 400);
            return;
        }

        $errores = validarCita($data);
        if (!empty($errores)) {
            Response::json(["error" => $errores], 400);
            return;
        }

        $result = $citas->crear($data);

        if ($result) {
            // Enviar notificación por correo electrónico
            // EnviarCorreo("Creación de cita", "La cita ha sido creada.", $data['user_id']);

            Response::json(["message" => "Cita creada con éxito"], 201);
        } else {
            Response::json(["error" => "No se pudo crear la cita"], 500);
        }
    }
}

new CrearCitas();