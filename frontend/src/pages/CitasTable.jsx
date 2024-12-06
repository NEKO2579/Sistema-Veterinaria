import Layout from "../components/Layout";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CitasContext } from "../context/CitasContext";
import "../styles/Citas.css";
import Swal from "sweetalert2";

const CitasTable = () => {
  const navigate = useNavigate();


  const crearCitas = () => {
    navigate("/citas/crearCita");
  };

  const actualizarCitas = (id) => {
    navigate(`/citas/${id}/editar`)
  }

  const { Citas, obtenerCitas, eliminarCita } = useContext(CitasContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
        await obtenerCitas(user.id);
    };
    fetchData();
  }, []);

  const handleDeleteClick = async (id) => {
    const { value: cancellation_reason } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Proporcione una razón para la eliminación de la cita:",
      input: "textarea",
      inputLabel: "Razón de la eliminación",
      inputPlaceholder: "Escribe aquí la razón...",
      inputAttributes: {
        "aria-label": "Razón de la eliminación",
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (cancellation_reason) {
      if (cancellation_reason.trim() === "") {
        Swal.fire("Error!", "La razón de eliminación es obligatoria.", "error");
        return;
      }

      try {
        await eliminarCita(id, cancellation_reason, user.id);
        Swal.fire("Eliminado!", "La cita ha sido eliminada.", "success");
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar la cita.", "error");
      }
    }
  };


  return (
    <Layout>
      <div className="mx-5 d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Tus citas</h2>
        <div>
        <Button className="mx-2" variant="primary" onClick={crearCitas}>
          Crear Cita
        </Button>
        <Button variant="secondary" onClick={() => navigate("/citas/eliminadas")}>
            Ver tus citas eliminadas
        </Button>
        </div>
      </div>
      <div className="table-container">
        {Citas && Citas.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center">
            <h1>No hay citas creadas por ti</h1>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Motivo</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Citas &&
                Citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.contact_phone}</td>
                    <td>{cita.contact_address}</td>
                    <td>{cita.appointment_reason}</td>
                    <td>{cita.appointment_date}</td>
                    <td>{cita.appointment_time}</td>
                    <td>
                      <Button variant="warning" className="me-2" onClick={() => actualizarCitas(cita.id)}>
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(cita.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
    </Layout>
  );
};

export default CitasTable;
