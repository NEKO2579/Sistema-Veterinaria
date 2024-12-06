<?php

namespace Vista;

class Response {
    public static function json($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');

        $response = [
            'status' => $status < 400 ? 'success' : 'error',
            'data' => $data
        ];

        echo json_encode($response);
    }
}
