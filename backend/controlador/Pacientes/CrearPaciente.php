<?php

namespace Controlador;

use Modelo\pacientes;
use Vista\Response;
use Config\Database;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class CrearPaciente
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para manejar el contenido de formulario y permitir el acceso desde el frontend.
        header("Content-Type: application/form-data");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $paciente = new pacientes($db);

        $errores = [];

        // Validaciones de los campos requeridos.
        if (!isset($_POST["nombre"]) || empty(trim($_POST["nombre"]))) {
            $errores[] = "El campo 'nombre' es obligatorio.";
        } else {
            $nombre = trim($_POST["nombre"]);
        }

        if (!isset($_POST['especie']) || empty(trim($_POST['especie']))) {
            $errores[] = "El campo 'especie' es obligatorio.";
        } else {
            $especie = trim($_POST['especie']);
        }

        if (!isset($_POST['edad']) || !is_numeric($_POST['edad']) || $_POST["edad"] <= 0) {
            $errores[] = "El campo 'edad' es obligatorio y debe ser un número.";
        } else {
            $edad = $_POST['edad'];
        }

        if (!isset($_POST["peso"]) || !is_numeric($_POST["peso"]) || $_POST["peso"] <= 0) {
            $errores[] = "El campo 'peso' es obligatorio y debe ser numérico.";
        } else {
            $peso = $_POST["peso"];
        }

        if (!isset($_POST["altura"]) || !is_numeric($_POST["altura"]) || $_POST["altura"] <= 0) {
            $errores[] = "El campo 'altura' es obligatorio y debe ser una altura válida.";
        } else {
            $altura = $_POST["altura"];
        }

        if (!isset($_POST["raza"]) || empty(trim($_POST['raza']))) {
            $errores[] = "El campo 'raza' es obligatorio.";
        } else {
            $raza = trim($_POST["raza"]);
        }

        if (!isset($_POST["dueño"]) || !is_numeric($_POST["dueño"]) || $_POST["dueño"] <= 0) {
            $errores[] = "El campo 'dueño' es obligatorio y debe ser un dueño válido.";
        } else {
            $dueño = $_POST["dueño"];
        }

        // Manejo de errores: si hay errores, devuelve un mensaje de error con el código de estado 400.
        if (!empty($errores)) {
            Response::json(["errores" => $errores], 400);
            return;
        }

        // Manejo de la foto (si se proporciona).
        $foto_url = null;
        if (isset($_FILES["foto_url"]) && $_FILES["foto_url"]["error"] === UPLOAD_ERR_OK) {
            $foto_tmp_name = $_FILES["foto_url"]["tmp_name"];
            $foto_name = basename($_FILES["foto_url"]["name"]);
            $foto_ext = strtolower(pathinfo($foto_name, PATHINFO_EXTENSION));
            $allowed_exts = ["jpg", "jpeg", "png", "gif", "webp"];

            // Verifica si la extensión del archivo es permitida.
            if (in_array($foto_ext, $allowed_exts)) {
                $upload_dir = dirname(__DIR__, 2) . "/fotoAnimales/";
                $upload_dir = str_replace('\\', '/', $upload_dir); // Reemplaza las barras invertidas con barras normales.

                // Crea el directorio de carga si no existe.
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }

                // Genera un nombre único para el archivo y define la ruta de destino.
                $unique_name = uniqid() . "." . $foto_ext;
                $foto_path = $upload_dir . $unique_name;
                $foto_url = "/PHP-PROYECTO/fotoAnimales/" . $unique_name; // Ruta relativa accesible desde el navegador.

                // Mueve el archivo subido al directorio de carga.
                if (move_uploaded_file($foto_tmp_name, $foto_path)) {
                    // Crea un nuevo paciente en la base de datos con la foto cargada.
                    $paciente->crear($nombre, $especie, $edad, $peso, $altura, $raza, $foto_url, $dueño);
                } else {
                    // Devuelve un error si hubo un problema al subir la foto.
                    Response::json(["error" => "Error al subir la foto"], 500);
                    return;
                }
            } else {
                // Devuelve un error si el tipo de archivo no está permitido.
                Response::json(["error" => "Tipo de archivo no permitido"], 400);
                return;
            }
        }
    }
}

new CrearPaciente();
