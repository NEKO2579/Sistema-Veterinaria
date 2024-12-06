import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [Citas, setCitas] = useState([])

  const crearCita = async (citaData) => {

    try {
      const response = await axios.post(`portalnhorizonv.byethost13.com/backend/controlador/Citas/CrearCitas.php`, citaData);
      setLoading(true);
      if (response.status === 201) {
        return {
          status: "success",
          message: response.data.data.message
        }
      }
    } catch (err) {
      const errorMsg = err.response ? err.response.data.data.error : "Error de servidor";
      return {
        status: 'error',
        message: errorMsg
      }
    } finally {
      setLoading(false);
    }
  };

  const obtenerCitas = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://portalnhorizonv.byethost13.com/backend/controlador/Citas/obtenerCitasActivas.php?user_id=${userId}`)
      if (response.status === 200) {
        setCitas(response.data.data)
        setLoading(false)
      }

    } catch (e) {
      setCitas([])

    }
  }

  const eliminarCita = async (id, cancellationReason, cancelledBy) => {
    try {
      await axios.put('http://portalnhorizonv.byethost13.com/backend/controlador/Citas/EliminarCitas.php', JSON.stringify({
        id,
        cancellation_reason: cancellationReason,
        cancelled_by: cancelledBy
      }));
      // Actualiza el estado después de eliminar la cita
      setCitas(Citas.filter(cita => cita.id !== id));
    } catch (error) {
      console.error('Error al eliminar cita:', error);
      throw error; // Opcional: re-lanzar el error para manejarlo en el componente
    }
  };


  const actualizarCita = async (updateForm) => {
    try {
      const response = await axios.put("http://portalnhorizonv.byethost13.com/backend/controlador/Citas/ActualizarCitas.php", JSON.stringify(updateForm))

      if (response.status === 200) {
        setCitas(prevCitas => prevCitas.map(cita => cita.id === updateForm.id ? { ...cita, ...updateForm } : cita))
        return {
          status: "success",
          message: "Cita actualizada con exito"
        }

      }
    } catch (e) {
      const { error } = e.response?.data?.data || "error al actualizar la cita"
      return {
        status: "error",
        message: error
      }

    }
  }

  const obtenerCitasEliminadas = async (user_id) => {
    try {
      const response = await axios.get(`http://portalnhorizonv.byethost13.com/backend/controlador/Citas/ObtenerCitasCanceladas.php?user_id=${user_id}`)

      const { data } = response.data
      return {
        status: "success",
        data
      }
    } catch (e) {
      const { error } = e.response?.data?.data
      return {
        status: "error",
        error
      }

    }
  }

  return (
    <CitasContext.Provider value={{ crearCita, loading, obtenerCitas, Citas, eliminarCita, actualizarCita, obtenerCitasEliminadas }}>
      {children}
    </CitasContext.Provider>
  );
};
