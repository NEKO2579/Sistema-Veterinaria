<?php

namespace Modelo;

use PDO;
use Config\Database;


class pacientes
{
    private $conn;
    private $tabla = "pacientes";

    public function __construct($db)
    {
        $db = new Database;
        $this->conn = $db->getConnection();
    }

    public function crear($nombre, $especie, $edad, $peso, $altura, $raza, $foto_url = null, $dueño)
    {
        // Sanitiza los datos
        $nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
        $especie = htmlspecialchars($especie, ENT_QUOTES, 'UTF-8');
        $edad = (int) $edad;
        $peso = (float) $peso;
        $altura = (float) $altura;
        $raza = htmlspecialchars($raza, ENT_QUOTES, 'UTF-8');
        $dueño = (int) $dueño;

        // Manejo de foto_url
        if ($foto_url === null || $foto_url === '') {
            $foto_url = 'NULL'; // Establecer como NULL para la consulta SQL
        } else {
            $foto_url = "'" . htmlspecialchars($foto_url, ENT_QUOTES, 'UTF-8') . "'";
        }

        // Consulta SQL con valores interpolados directamente
        $consulta = "INSERT INTO " . $this->tabla . " 
                 (Nombre_Animal, Tipo_Animal, Peso_Animal, Edad_Animal, Altura_animal, Raza_Animal, foto_url, Dueño) 
                 VALUES ('$nombre', '$especie', $peso, $edad, $altura, '$raza', $foto_url, $dueño)";

        // Ejecutar la consulta
        if ($this->conn->query($consulta)) {
            return true;
        } else {
            // Mostrar el error para depuración
            echo "Error: " . $this->conn->errorInfo();
            return false;
        }
    }

    public function obtenerTodos()
    {
        $consulta = "SELECT * FROM " . $this->tabla;
        $stmt = $this->conn->prepare($consulta);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorDueño($DueId)
    {
        $consulta = "SELECT * FROM " . $this->tabla . " WHERE Dueño = :DueId AND deleted_at IS NULL";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindValue(":DueId", $DueId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorIdPaciente($idPaciente)
    {
        $consulta = "SELECT * FROM " . $this->tabla . " WHERE Id_Paciente = :idPaciente AND deleted_at IS NULL";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindValue(":idPaciente", $idPaciente, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function actualizar($id, $nombre, $especie, $edad, $peso, $altura, $raza, $foto_url, $dueño)
    {
        // Sanitización básica de los datos
        $id = intval($id);
        $nombre = $this->sanitizeString($nombre);
        $especie = $this->sanitizeString($especie);
        $edad = intval($edad);
        $peso = floatval($peso);
        $altura = floatval($altura);
        $raza = $this->sanitizeString($raza);
        $foto_url = $this->sanitizeString($foto_url);
        $dueño = intval($dueño);

        $consulta = "UPDATE " . $this->tabla . " 
                     SET Nombre_Animal = '$nombre', Tipo_Animal = '$especie', Edad_Animal = $edad, Peso_Animal = $peso, Altura_Animal = $altura, Raza_Animal = '$raza', foto_url = '$foto_url', Dueño = $dueño 
                     WHERE Id_Paciente = $id";

        if ($this->conn->query($consulta)) {
            return true;
        } else {
            echo "Error al actualizar: " . $this->conn->errorInfo();
            return false;
        }
    }

    private function sanitizeString($str)
    {
        // Sanitiza una cadena eliminando caracteres peligrosos y escapando caracteres especiales
        $str = trim($str);
        $str = stripslashes($str);
        $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
        return $str;
    }


    public function eliminar($id)
    {
        $consulta = "UPDATE " . $this->tabla . " SET deleted_at = NOW() WHERE Id_Paciente = :id";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
