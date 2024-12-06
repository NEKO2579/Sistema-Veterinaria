<?php

namespace Modelo;

use PDO;
use Config\Database;
use PDOException;

class usuarios
{
    private $conn;
    private $tabla = "users";

    public function __construct($db)
    {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function emailExists($email)
    {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    }

    public function crearUsuario($nombres, $apellidos, $edad, $email, $password, $t_identificacion, $n_identificacion, $telefono, $t_genero)
    {
        $consulta = "INSERT INTO " . $this->tabla . " (nombres, apellidos, edad, email, password, T_Identificacion, N_identificacion, Telefono, T_Genero, created_at) 
                 VALUES (:nombres, :apellidos, :edad, :email, :password, :t_identificacion, :n_identificacion, :telefono, :t_genero, NOW())";
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindParam(":nombres", $nombres);
        $stmt->bindParam(":apellidos", $apellidos);
        $stmt->bindParam(":edad", $edad);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $hashedPassword);
        $stmt->bindParam(":t_identificacion", $t_identificacion);
        $stmt->bindParam(":n_identificacion", $n_identificacion);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":t_genero", $t_genero);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // Código de error para violación de clave única en MySQL
                return "email_duplicado";
            } else {
                throw $e;
            }
        }
    }


    public function obtenerId($id)
    {
        $consulta = "SELECT * FROM " . $this->tabla . " WHERE id = :id";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function iniciarSesion($email, $password)
    {
        $consulta = "SELECT * FROM " . $this->tabla . " WHERE email = :email";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['password'])) {
            unset($usuario['password']);
            return $usuario;
        }

        return false;
    }

    public function actualizar(
        $id,
        $nombres,
        $apellidos,
        $edad,
        $password = null,
        $telefono,
        $passwordActual = null
    ) {
        // Verificar la contraseña actual si se proporciona
        if ($passwordActual) {
            // Obtener los datos del usuario para verificar la contraseña actual
            $usuario = $this->obtenerId($id);
            if (!$usuario || !password_verify($passwordActual, $usuario['password'])) {
                return "password_incorrecta";
            }
    
            // Verificar que la nueva contraseña no sea igual a la actual
            if ($password && password_verify($password, $usuario['password'])) {
                return 'password_igual';
            }
        }
    
        // Preparar la consulta SQL para actualizar los datos del usuario
        $consulta = "UPDATE " . $this->tabla . " 
                     SET nombres = :nombres, apellidos = :apellidos, edad = :edad, telefono = :telefono" .
                     ($password ? ", password = :password" : "") . " 
                     WHERE id = :id";
        $stmt = $this->conn->prepare($consulta);
    
        // Vincular los parámetros a la consulta SQL
        $stmt->bindParam(":nombres", $nombres);
        $stmt->bindParam(":apellidos", $apellidos);
        $stmt->bindParam(":edad", $edad);
        $stmt->bindParam(":telefono", $telefono);
    
        if ($password) {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $hashedPassword);
        }
        $stmt->bindParam(":id", $id);
    
        // Ejecutar la consulta y retornar el resultado
        return $stmt->execute();
    }
    

    public function eliminar($id)
    {
        $consulta = "DELETE FROM " . $this->tabla . " WHERE id = :id";
        $stmt = $this->conn->prepare($consulta);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
