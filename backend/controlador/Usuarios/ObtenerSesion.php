<?php

namespace Controlador;

use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class ObtenerSesion
{
    public function __construct()
    {
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");

        session_start();

        if (isset($_SESSION['usuario'])) {
            Response::json($_SESSION['usuario'], 200);
        } else {
            Response::json(["error" => "No hay una sesión activa"], 401);
        }
    }
}

new ObtenerSesion();
