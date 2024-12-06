<?php

namespace Config;
use PDO;
use PDOException;
class Database {
    private $host = 'sql305.byethost13.com';
    private $db_name = 'b13_37772430_veterinaria';
    private $username = 'b13_37772430';
    private $password = 'S1st3mas2506*';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}