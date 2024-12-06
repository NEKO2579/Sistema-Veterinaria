import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CitasContext } from "../context/CitasContext";
import { Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const appointments_reason = ['consultar pedido', 'realizar pedido', 'Informe de mi mascota'];

const EditarCitas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Citas, actualizarCita } = useContext(CitasContext);
  const [formData, setFormData] = useState({
    contact_phone: "",
    contact_address: "",
    appointment_reason: "",
    appointment_date: "",
    appointment_time: "",
    id: "",
  });

  useEffect(() => {
    const cita = Citas.find((cita) => cita.id === parseInt(id));
    if (cita) {
      setFormData({
        contact_phone: cita.contact_phone,
        contact_address: cita.contact_address,
        appointment_reason: cita.appointment_reason,
        appointment_date: cita.appointment_date,
        appointment_time: cita.appointment_time,
        id: id,
      });
    }
  }, [id, Citas]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await actualizarCita(formData);

    if (status === "success") {
      toast.success(message);
      navigate("/citas");
    } else {
      toast.error(message);
    }
  };

  return (
    <Layout>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="contactPhone">
              <Form.Label>Teléfono de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="contactAddress">
              <Form.Label>Dirección de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="contact_address"
                value={formData.contact_address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="appointmentReason">
              <Form.Label>Razón de la Cita</Form.Label>
              <Form.Control
                as="select"
                name="appointment_reason"
                value={formData.appointment_reason}
                onChange={handleChange}
              >
                {appointments_reason.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="appointmentDate">
              <Form.Label>Fecha de la Cita</Form.Label>
              <Form.Control
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="appointmentTime">
              <Form.Label>Hora de la Cita</Form.Label>
              <Form.Control
                type="time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Actualizar Cita
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default EditarCitas;
