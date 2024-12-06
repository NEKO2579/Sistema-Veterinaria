<?php

namespace Controlador;

use Modelo\pacientes;
use Vista\Response;
use Config\Database;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class ActualizarPacientes
{
    public function __construct()
    {
        // Configura las cabeceras HTTP para permitir el acceso desde el frontend y manejar solicitudes POST.
        header("Content-Type: multipart/form-data");
        header("Access-Control-Allow-Origin: hhttp://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: POST"); // Cambiar a POST si se usa $_FILES para subir archivos.
        header("Access-Control-Allow-Headers: Content-Type");

        // Establece la conexión con la base de datos.
        $database = new Database();
        $db = $database->getConnection();
        $paciente = new pacientes($db);

        // Verifica si el ID del paciente es válido.
        if (!isset($_POST['id']) || !is_numeric($_POST['id']) || $_POST['id'] <= 0) {
            Response::json(["error" => "El campo 'id' es obligatorio y debe ser válido."], 400);
            return;
        }

        // Convierte el ID del paciente a entero y obtiene los datos del paciente existente.
        $id = (int)$_POST['id'];
        $existingPaciente = $paciente->obtenerPorIdPaciente($id);

        if (!$existingPaciente) {
            // Si el paciente no existe, devuelve un error 404.
            Response::json(["error" => "Paciente no encontrado"], 404);
            return;
        }

        // Asigna nuevos valores a los campos, usando los valores actuales si no se proporcionan nuevos datos.
        $nombre = $_POST['nombre'] ?? $existingPaciente['Nombre_Animal'];
        $especie = $_POST['especie'] ?? $existingPaciente['Tipo_Animal'];
        $edad = $_POST['edad'] ?? $existingPaciente['Edad_Animal'];
        $peso = $_POST['peso'] ?? $existingPaciente['Peso_Animal'];
        $altura = $_POST['altura'] ?? $existingPaciente['Altura_animal'];
        $raza = $_POST['raza'] ?? $existingPaciente['Raza_Animal'];
        $dueño = $_POST['dueño'] ?? $existingPaciente['Dueño'];
        $foto_url = $existingPaciente['foto_url']; // Mantiene la foto actual por defecto.

        // Verifica si se ha subido una nueva foto.
        if (isset($_FILES["foto_url"]) && $_FILES["foto_url"]["error"] === UPLOAD_ERR_OK) {
            $foto_tmp_name = $_FILES["foto_url"]["tmp_name"];
            $foto_name = basename($_FILES["foto_url"]["name"]);
            $foto_ext = strtolower(pathinfo($foto_name, PATHINFO_EXTENSION));
            $allowed_exts = ["jpg", "jpeg", "png", "gif", "webp"];

            // Valida el tipo de archivo de la foto.
            if (in_array($foto_ext, $allowed_exts)) {
                $upload_dir = dirname(__DIR__, 2) . "/fotoAnimales/";
                $upload_dir = str_replace('\\', '/', $upload_dir);

                // Crea el directorio de carga si no existe.
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }

                // Genera un nombre único para la foto y mueve el archivo subido al directorio de carga.
                $unique_name = uniqid() . "." . $foto_ext;
                $foto_path = $upload_dir . $unique_name;
                $foto_url = "/PHP-PROYECTO/fotoAnimales/" . $unique_name;

                if (move_uploaded_file($foto_tmp_name, $foto_path)) {
                    // Elimina la antigua foto del servidor si existe.
                    if (file_exists(dirname(__DIR__, 2) . $existingPaciente['foto_url'])) {
                        unlink(dirname(__DIR__, 2) . $existingPaciente['foto_url']);
                    }
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

        // Verifica si hay cambios en los datos comparados con los datos existentes.
        if (
            $nombre === $existingPaciente['Nombre_Animal'] &&
            $especie === $existingPaciente['Tipo_Animal'] &&
            $edad === $existingPaciente['Edad_Animal'] &&
            $peso === $existingPaciente['Peso_Animal'] &&
            $altura === $existingPaciente['Altura_animal'] &&
            $raza === $existingPaciente['Raza_Animal'] &&
            $foto_url === $existingPaciente['foto_url']
        ) {
            // Si no hay cambios, devuelve un mensaje de éxito sin actualización.
            Response::json(["message" => "No hay cambios en los datos, no se realizó ninguna actualización."], 204);
            return;
        }

        // Actualiza los datos del paciente en la base de datos.
        if ($paciente->actualizar($id, $nombre, $especie, $edad, $peso, $altura, $raza, $foto_url, $dueño)) {
            Response::json(["message" => "Paciente actualizado con éxito"], 200);
        } else {
            // Devuelve un error si no se pudo actualizar el paciente.
            Response::json(["error" => "No se pudo actualizar el paciente"], 500);
        }
    }
}

new ActualizarPacientes();
