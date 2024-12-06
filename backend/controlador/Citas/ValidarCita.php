<?php
// Función para validar los datos de una cita.
function validarCita($data)
{
    $errores = []; // Inicializa un array para almacenar los errores de validación.

    // Lista de campos requeridos para una cita.
    $camposRequeridos = [
        'contact_phone',       // Teléfono de contacto
        'contact_address',     // Dirección de contacto
        'appointment_reason',  // Razón de la cita
        'appointment_date',    // Fecha de la cita
        'appointment_time',    // Hora de la cita
        'user_id',             // ID del usuario
        'Paciente_ID'          // ID del paciente
    ];

    // Recorre cada campo requerido y valida su presencia y formato.
    foreach ($camposRequeridos as $campo) {
        if (empty($data[$campo])) {
            // Si el campo está vacío, agrega un mensaje de error.
            $errores[] = "El campo '$campo' es requerido.";
        } elseif ($campo === 'appointment_date') {
            // Valida el formato y la validez de la fecha de la cita.
            $formatoFecha = 'Y-m-d'; // Define el formato esperado para la fecha.
            $fecha = DateTime::createFromFormat($formatoFecha, $data[$campo]); // Intenta crear un objeto DateTime con el formato especificado.
            if (!$fecha || $fecha->format($formatoFecha) !== $data[$campo]) {
                // Si la fecha es inválida o el formato no coincide, agrega un mensaje de error.
                $errores[] = "El campo 'Fecha' debe estar en el formato 'YYYY-MM-DD'.";
            } else {
                $fechaHoy = new DateTime(); // Obtiene la fecha y hora actuales.
                if ($fecha < $fechaHoy) {
                    // Si la fecha es anterior a la fecha actual, agrega un mensaje de error.
                    $errores[] = "La fecha de la cita no puede ser anterior a la fecha actual.";
                }
                $fechaMaxima = (clone $fechaHoy)->add(new DateInterval('P2M')); // Calcula la fecha máxima permitida (2 meses desde hoy).
                if ($fecha > $fechaMaxima) {
                    // Si la fecha es posterior a la fecha máxima permitida, agrega un mensaje de error.
                    $errores[] = "La fecha de la cita no puede ser más allá de 2 meses desde la fecha actual.";
                }
            }
        } elseif ($campo === 'appointment_time') {
            // Valida el formato y la validez de la hora de la cita.
            $formatoHora = 'H:i'; // Define el formato esperado para la hora.
            $hora = DateTime::createFromFormat($formatoHora, $data[$campo]); // Intenta crear un objeto DateTime con el formato especificado.
            if (!$hora || $hora->format($formatoHora) !== $data[$campo]) {
                // Si la hora es inválida o el formato no coincide, agrega un mensaje de error.
                $errores[] = "El campo 'Hora de la cita' debe estar en el formato 'HH:MM'.";
            } else {
                $horaMinima = DateTime::createFromFormat($formatoHora, '08:00'); // Define la hora mínima permitida.
                $horaMaxima = DateTime::createFromFormat($formatoHora, '20:00'); // Define la hora máxima permitida.
                if ($hora < $horaMinima || $hora > $horaMaxima) {
                    // Si la hora está fuera del rango permitido, agrega un mensaje de error.
                    $errores[] = "La hora de la cita debe estar entre las 08:00 y las 20:00.";
                }
            }
        }
    }

    return $errores; // Devuelve el array de errores encontrados durante la validación.
}
?>
