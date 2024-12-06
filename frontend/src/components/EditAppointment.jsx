import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditAppointment = ({ appointments, setAppointments }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const appointment = appointments[index];
  const [formData, setFormData] = useState(appointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAppointments = [...appointments];
    updatedAppointments[index] = formData;
    setAppointments(updatedAppointments);
    navigate('/');
  };

  return (
    <div className="edit-appointment">
      <h2>Editar Cita</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAnimalType">
          <Form.Label>Tipo de Animal</Form.Label>
          <Form.Control
            type="text"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAnimalName">
          <Form.Label>Nombre del Animal</Form.Label>
          <Form.Control
            type="text"
            name="animalName"
            value={formData.animalName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formContactPhone">
          <Form.Label>Teléfono de Contacto</Form.Label>
          <Form.Control
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formContactAddress">
          <Form.Label>Dirección de Contacto</Form.Label>
          <Form.Control
            type="text"
            name="contactAddress"
            value={formData.contactAddress}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAppointmentReason">
          <Form.Label>Motivo de la Cita</Form.Label>
          <Form.Control
            type="text"
            name="appointmentReason"
            value={formData.appointmentReason}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAppointmentDate">
          <Form.Label>Fecha de la Cita</Form.Label>
          <Form.Control
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAppointmentTime">
          <Form.Label>Hora de la Cita</Form.Label>
          <Form.Control
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formObservations">
          <Form.Label>Observaciones</Form.Label>
          <Form.Control
            type="text"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAdditionalField">
          <Form.Label>Campo Adicional</Form.Label>
          <Form.Control
            type="text"
            name="additionalField"
            value={formData.additionalField}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')} className="ms-2">
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default EditAppointment;
