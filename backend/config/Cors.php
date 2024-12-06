<?php
// Archivo: cors.p
// Permitir solicitudes desde http://portalnhorizonv.byethost13.com/
header_remove("Access-Control-Allow-Origin");
header("Access-Control-Allow-Origin: http://portalnhorizonv.byethost13.com");

// Métodos permitidos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Encabezados permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


// Si la solicitud es de tipo OPTIONS, detener la ejecución aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Responder con un estado 204 No Content
    exit();
}
?>
