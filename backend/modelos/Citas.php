<?php

namespace Modelo;

use PDO;
use Exception;
use Config\Database;

class Citas
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Método para crear una nueva cita
    public function crear($data)
    {
        $sql = "INSERT INTO citas (contact_phone, contact_address, appointment_reason, appointment_date, appointment_time, user_id, Paciente_ID, additional_field) 
                VALUES (:contact_phone, :contact_address, :appointment_reason, :appointment_date, :appointment_time, :user_id, :Paciente_ID, :additional_field)";

        $stmt = $this->conn->prepare($sql);

        // Asignar valores a las variables
        $contact_phone = $data['contact_phone'];
        $contact_address = $data['contact_address'];
        $appointment_reason = $data['appointment_reason'];
        $appointment_date = $data['appointment_date'];
        $appointment_time = $data['appointment_time'];
        $user_id = $data['user_id'];
        $Paciente_ID = $data['Paciente_ID'];
        $additional_field = isset($data['additional_field']) ? $data['additional_field'] : null;

        // Asignar parámetros a la consulta preparada
        $stmt->bindParam(':contact_phone', $contact_phone);
        $stmt->bindParam(':contact_address', $contact_address);
        $stmt->bindParam(':appointment_reason', $appointment_reason);
        $stmt->bindParam(':appointment_date', $appointment_date);
        $stmt->bindParam(':appointment_time', $appointment_time);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':Paciente_ID', $Paciente_ID);
        $stmt->bindParam(':additional_field', $additional_field);

        // Ejecutar la consulta
        return $stmt->execute();
    }

    // Método para actualizar una cita existente
    public function actualizar($data)
    {
        try {
            // Verificar si la cita existe
            $sqlCheck = "SELECT COUNT(*) FROM citas WHERE id = :id";
            $stmtCheck = $this->conn->prepare($sqlCheck);
            $stmtCheck->bindParam(':id', $data['id']);
            $stmtCheck->execute();

            if ($stmtCheck->fetchColumn() == 0) {
                return false; // La cita no existe
            }

            // Actualizar la cita
            $sql = "UPDATE citas 
                SET contact_phone = :contact_phone, contact_address = :contact_address, appointment_reason = :appointment_reason, 
                    appointment_date = :appointment_date, appointment_time = :appointment_time 
                WHERE id = :id AND deleted_at IS NULL";

            $stmt = $this->conn->prepare($sql);

            // Asignar valores a las variables
            $contact_phone = $data['contact_phone'];
            $contact_address = $data['contact_address'];
            $appointment_reason = $data['appointment_reason'];
            $appointment_date = $data['appointment_date'];
            $appointment_time = $data['appointment_time'];
            $id = $data['id'];

            // Asignar parámetros a la consulta preparada
            $stmt->bindParam(':contact_phone', $contact_phone);
            $stmt->bindParam(':contact_address', $contact_address);
            $stmt->bindParam(':appointment_reason', $appointment_reason);
            $stmt->bindParam(':appointment_date', $appointment_date);
            $stmt->bindParam(':appointment_time', $appointment_time);
            $stmt->bindParam(':id', $id);

            // Ejecutar la consulta
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error al actualizar la cita: " . $e->getMessage());
            return false;
        }
    }

    // Método para eliminar una cita
    public function eliminar($id, $cancellation_reason, $cancelled_by)
    {
        try {
            $this->conn->beginTransaction(); // Iniciar transacción

            // Verificar si la cita existe
            $sqlSelect = "SELECT * FROM citas WHERE id = :id";
            $stmtSelect = $this->conn->prepare($sqlSelect);
            $stmtSelect->bindParam(':id', $id);
            $stmtSelect->execute();
            $cita = $stmtSelect->fetch(PDO::FETCH_ASSOC);

            if (!$cita) {
                throw new Exception("Cita no encontrada");
            }

            // Insertar el motivo de la cancelación en el historial
            $sqlInsert = "INSERT INTO cancellation_history (appointment_id, cancellation_reason, cancellation_date, cancelled_by) 
                          VALUES (:appointment_id, :cancellation_reason, NOW(), :cancelled_by)";
            $stmtInsert = $this->conn->prepare($sqlInsert);
            $stmtInsert->bindParam(':appointment_id', $cita['id']);
            $stmtInsert->bindParam(':cancellation_reason', $cancellation_reason);
            $stmtInsert->bindParam(':cancelled_by', $cancelled_by);
            $stmtInsert->execute();

            // Marcar la cita como eliminada
            $sql = "UPDATE citas SET deleted_at = NOW() WHERE id = :id";
            $stmtDelete = $this->conn->prepare($sql);
            $stmtDelete->bindParam(':id', $id);
            $stmtDelete->execute();

            $this->conn->commit(); // Confirmar transacción
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack(); // Revertir transacción en caso de error
            error_log("Error al eliminar la cita: " . $e->getMessage());
            return false;
        }
    }

    // Método para obtener citas activas por usuario
    public function obtenerCitasActivasPorUsuario($user_id)
    {
        $sql = "SELECT * FROM citas WHERE user_id = :user_id AND id NOT IN (SELECT appointment_id FROM cancellation_history)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obtener citas canceladas por usuario
    public function obtenerCitasCanceladasPorUsuario($user_id)
    {
        $sql = "SELECT ce.cancellation_reason, ce.cancellation_date, c.appointment_reason, p.Nombre_Animal AS paciente_nombre
                FROM cancellation_history ce
                INNER JOIN citas c ON ce.appointment_id = c.id
                INNER JOIN pacientes p ON c.Paciente_ID = p.Id_Paciente
                WHERE ce.cancelled_by = :user_id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
