<?php

namespace Controlador;

use Config\Database;
use Modelo\Usuarios;
use Vista\Response;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class CrearUsuario
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar solicitudes POST y permitir acceso desde el frontend.
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $usuario = new Usuarios($db);

        // Lee el contenido JSON enviado en la solicitud POST.
        $data = json_decode(file_get_contents("php://input"));

        // Verifica si se recibieron datos en la solicitud.
        if (!$data) {
            Response::json(["error" => "No se recibieron datos"], 400);
            return;
        }

        // Verifica que los campos obligatorios estén presentes en el JSON recibido.
        $requiredFields = ['nombres', 'apellidos', 'edad', 'email', 'password', 't_identificacion', 'n_identificacion', 'telefono', 't_genero'];
        foreach ($requiredFields as $field) {
            if (!isset($data->$field)) {
                Response::json(["error" => "Falta el campo $field"], 400);
                return;
            }
        }

        // Intenta crear el usuario con los datos proporcionados.
        $result = $usuario->crearUsuario(
            $data->nombres,
            $data->apellidos,
            $data->edad,
            $data->email,
            $data->password,
            $data->t_identificacion,
            $data->n_identificacion,
            $data->telefono,
            $data->t_genero
        );

        // Manejo de errores y respuestas basadas en el resultado de la creación del usuario.
        if ($result === true) {
            Response::json(["message" => "Usuario creado con éxito"], 201);
        } elseif ($result === "email_duplicado") {
            Response::json(["error" => "El correo electrónico ya está en uso"], 409);
        } else {
            Response::json(["error" => "No se pudo crear el usuario"], 500);
        }
    }
}

new CrearUsuario();
