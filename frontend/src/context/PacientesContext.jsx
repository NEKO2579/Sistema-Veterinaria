import { createContext, useState, useCallback } from "react";
import { toast } from 'react-toastify';

import axios from "axios";

export const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const crearPacientes = async (formData) => {
        try {
            const response = await axios.post("http://portalnhorizonv.byethost13.com/backend/controlador/Pacientes/CrearPaciente.php", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.status === 404) {
                return{status: false, message:response.data.data.errores};
            } else {
                obtenerPacientesPorUsuario()
                return {status: true, message: "Paciente creado correctamente"};
            }
        } catch (error) {
            if (error.response && error.response.data.data.errores) {
                return{status: false, message: error.response.data.data.errores};
            } else {
                return{status: false, message: "Hubo un problema con la solicitud"};
            }
        }
    };

    const obtenerPacientesPorUsuario = async () => {
        try {
            // Obtener el ID del usuario desde localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.id;

            if (!userId) {
                toast.error("No se encontró el ID del usuario.");
                return;
            }

            // Realizar la solicitud GET con el ID como query parameter
            const response = await axios.get(`http://portalnhorizonv.byethost13.com/backend/controlador/Pacientes/ObtenerPacientes.php`, {
                params: { DueId: userId }
            });


            // Manejar la respuesta
            if (response.data.data.error) {
                toast.error(response.data.error);
            } else {
                setPacientes(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.data.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Hubo un problema al obtener los pacientes.");
            }
        }
    }

    const ActualizarPacientes = useCallback(async (formData) => {
        try {
            const response = await axios.post("http://portalnhorizonv.byethost13.com/backend/controlador/Pacientes/ActualizarPacientes.php", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (response.status === 200) {
                return {success: true, message: response.data.data.message}
            } else if (response.status === 204) {
                return {success: false, message: response.data.data.message}
            } else {
                return {success: false, message: response.data.data.error}
            }
        } catch (error) {
            const errorMsg = error.response.data.data.error
            return {success: false, message: errorMsg}
        }
    }, [])

    const eliminarPaciente = async (idPaciente) => {
        try {
            const response = await axios.delete(`http://portalnhorizonv.byethost13.com/backend/controlador/Pacientes/EliminarPacientes.php`, {
                params: { id: idPaciente }
            });

            if (response.data.status === "success") {
                setPacientes(prev => prev.filter(paciente => paciente.Id_Paciente !== idPaciente));
                return {status: true, message: "se elimino correctamente tu mascota"}
            }
        } catch (error) {
            return {
                status: false, message: "Hubo un error al eliminar la mascota"
            };
        }
    };

    return (
        <PacientesContext.Provider value={{pacientes, crearPacientes, obtenerPacientesPorUsuario, ActualizarPacientes, eliminarPaciente }}>
            {children}
        </PacientesContext.Provider>
    );
};
