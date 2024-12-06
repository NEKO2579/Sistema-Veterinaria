import { useContext, useEffect, useState } from "react";
import { Table, Card, Button, Container } from "react-bootstrap";
import { FaCalendarTimes } from "react-icons/fa";
import { CitasContext } from "../context/CitasContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const CitasEliminadas = () => {
  const { obtenerCitasEliminadas } = useContext(CitasContext);
  const [citasCanceladas, setCitasCanceladas] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCitasCanceladas = async () => {
      const response = await obtenerCitasEliminadas(user.id);
      setCitasCanceladas(response.data);
    };

    fetchCitasCanceladas();
  }, []);

  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/citas")}
          style={{ width: "200px" }} // Ajusta el tamaño del botón
        >
          Tus Citas
        </Button>
        {citasCanceladas && citasCanceladas.length > 0 ? (
          <Table
            striped
            bordered
            hover
            className="text-center mt-3"
            style={{ margin: "0 auto", maxWidth: "100%" }} // Centra la tabla y añade márgenes
          >
            <thead>
              <tr>
                <th>Motivo de Cancelación</th>
                <th>Fecha de Cancelación</th>
                <th>Razón de la Cita</th>
                <th>Nombre del Paciente</th>
              </tr>
            </thead>
            <tbody>
              {citasCanceladas.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.cancellation_reason}</td>
                  <td>
                    {new Date(cita.cancellation_date).toLocaleDateString()}
                  </td>
                  <td>{cita.appointment_reason}</td>
                  <td>{cita.paciente_nombre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card className="text-center mt-3">
            <Card.Body>
              <FaCalendarTimes size={50} className="text-muted" />
              <Card.Title>No tienes citas eliminadas</Card.Title>
              <Card.Text>
                Todas tus citas están activas y en curso. ¡Sigue gestionando tus
                citas!
              </Card.Text>
                <Button
                  variant="primary"
                  className="mb-3"
                  onClick={() => navigate("/citas")}
                  style={{ width: "200px" }} // Ajusta el tamaño del botón
                >
                  Tus Citas
                </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

export default CitasEliminadas;
