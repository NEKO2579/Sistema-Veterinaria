<?php 

namespace Controlador;

use Config\Database;
use Modelo\Citas;
use Vista\Response;
use DateTime;
use DateInterval;

require_once dirname(__DIR__, 2) . "/vendor/autoload.php";
require_once dirname(__DIR__, 2) . "/config/Cors.php";

class ActualizarCitas
{
    public function __construct()
    {
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com/");
        header("Access-Control-Allow-Methods: PUT");
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


        if (empty($data['id'])) {
            Response::json(["error" => "El ID de la cita es requerido"], 400);
            return;
        }


        if (empty($data['id']) || !filter_var($data['id'], FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]])) {
            Response::json(["error" => "El ID de la cita es inválido o no se ha proporcionado"], 400);
            return;
        }
        
        if(empty($data["contact_phone"]) || trim($data["contact_phone"]) === ""){
            Response::json(["error" => "No se ha agregado un telefono de contacto"], 400);
            return;
        }

        if(empty($data["contact_address"]) || trim($data["contact_address"]) === ""){
            Response::json(["error" => "No se ha agregado una direccion de contacto"], 400);
            return;
        }

        if(empty($data["appointment_reason"]) || trim($data["appointment_reason"]) === ""){
            Response::json(["error" => "No se ha agregado una razon de la cita" ], 400);
            return;
        }

        if(empty($data["appointment_date"]) || trim($data["appointment_date"])){
            $formatoFecha = 'Y-m-d';
            $fecha = DateTime::createFromFormat($formatoFecha, $data["appointment_date"]);
            if (!$fecha || $fecha->format($formatoFecha) !== $data["appointment_date"]) {
                Response::json(["error" => "El campo 'Fecha' debe estar en el formato 'YYYY/MM/DD'"], 400);
                return;
            } else {
                $fechaHoy = new DateTime();
                if ($fecha < $fechaHoy) {
                    Response::json(["error" => "La fecha de la cita no puede ser anterior a la fecha actual."], 400);
                    return;
                }
                $fechaMaxima = (clone $fechaHoy)->add(new DateInterval('P2M'));
                if ($fecha > $fechaMaxima) {
                    Response::json(["error" => "La fecha de la cita no puede ser más allá de 2 meses desde la fecha actual."], 400);
                    return;
                }
            }
        }

        if(empty($data["appoinment_time"]) || trim($data["aapoinment_time"]) === ""){
            $formatoHora = 'H:i';
            $hora = DateTime::createFromFormat($formatoHora, $data["appointment_time"]);
            if (!$hora || $hora->format($formatoHora) !== $data["appointment_time"]) {
                Response::json(["error" => "El campo 'Hora de la cita' debe estar en el formato 'HH:MM'."], 400);
            } else {
                $horaMinima = DateTime::createFromFormat($formatoHora, '08:00');
                $horaMaxima = DateTime::createFromFormat($formatoHora, '20:00');
                if ($hora < $horaMinima || $hora > $horaMaxima) {
                    Response::json(["error" => "La hora de la cita debe estar entre las 08:00 y las 20:00."], 400);
                }
            }
        }

        $result = $citas->actualizar($data);

        if ($result) {
            Response::json(["message" => "Cita actualizada con éxito"], 200);
        } else {
            Response::json(["error" => "No se pudo actualizar la cita. Verifica que el ID es correcto o intenta nuevamente."], 500);
        }
    }
}

new ActualizarCitas()
?>