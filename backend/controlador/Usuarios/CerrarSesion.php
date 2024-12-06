<?php

namespace Controlador;

use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class CerrarSesion
{
    public function __construct()
    {
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");


        session_start();
        session_destroy();

        Response::json(["mensaje" => "Sesión cerrada correctamente"], 200);
    }
}

new CerrarSesion();
