import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CitasContext } from '../context/CitasContext';
import "../styles/Citas.css"
import Layout from '../components/Layout';
import { PacientesContext } from '../context/PacientesContext';
import { useNavigate } from 'react-router-dom';


const appointments_reason = ['consultar pedido', 'realizar pedido', 'Informe de mi mascota']

const CrearCitaForm = () => {
    const { crearCita } = useContext(CitasContext);
    const { pacientes, obtenerPacientesPorUsuario } = useContext(PacientesContext);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        contact_phone: '',
        contact_address: '',
        appointment_reason: '',
        appointment_date: '',
        appointment_time: '',
        user_id: '',
        Paciente_ID: '',
        additional_field: '',
    });
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setFormData((prevState) => ({
                ...prevState,
                user_id: user.id,
            }));
        }
    }, []);

    useEffect(() => {
        obtenerPacientesPorUsuario(formData.user_id)
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const formatDateToYYYYMMDD = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const formattedDate = formatDateToYYYYMMDD(formData.appointment_date);
        setFormData({ ...formData, appointment_date: formattedDate });
        const appointmentDate = new Date(formData.appointment_date);
        const currentDate = new Date();
        const maxDate = new Date();
        maxDate.setMonth(currentDate.getMonth() + 2);

        if (appointmentDate < currentDate || appointmentDate > maxDate) {
            toast.error('La fecha de la cita no puede ser pasada ni exceder 2 meses a partir de hoy.');
            return;
        }

        if (formData.appointment_time < '08:00' || formData.appointment_time > '20:00') {
            toast.error('La hora de la cita debe ser entre las 08:00 y las 20:00.');
            return;
        }

        const { status, message } = await crearCita(formData)

        if (status === 'success') {
            toast.success("la cita ha sido creada con exito")
            navigate("/citas")
        } else {
            toast.error(message)
        }

        setValidated(true);
    };

    return (
        <Layout>
            <Card className="mt-4">
                <Card.Header className="bg-primary text-white">Crear Cita</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="contact_phone">
                                    <Form.Label>Teléfono de contacto</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="contact_phone"
                                        value={formData.contact_phone}
                                        onChange={handleChange}
                                        placeholder="Ingrese el número de teléfono"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Teléfono de contacto es requerido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="contact_address">
                                    <Form.Label>Dirección de contacto</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="contact_address"
                                        value={formData.contact_address}
                                        onChange={handleChange}
                                        placeholder="Ingrese la dirección"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Dirección de contacto es requerida.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="appointment_date">
                                    <Form.Label>Fecha de la cita</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        name="appointment_date"
                                        value={formData.appointment_date}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        La fecha es requerida.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="appointment_time">
                                    <Form.Label>Hora de la cita</Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        name="appointment_time"
                                        value={formData.appointment_time}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        La hora es requerida.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="additional_field">
                                    <Form.Label>Informacion adicional</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={3}
                                        name="additional_field"
                                        value={formData.additional_field}
                                        onChange={handleChange}
                                        placeholder="Pon alguna informacion adicional (opcional)"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="Paciente_ID">
                                    <Form.Label>Mascota a la cual se hara la cita</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        name="Paciente_ID"
                                        value={formData.Paciente_ID}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Seleccione el paciente</option>
                                        {pacientes.map((paciente) => (
                                            <option key={paciente.Id_Paciente} value={paciente.Id_Paciente}>
                                                {paciente.Nombre_Animal}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        El ID del paciente es requerido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="appointment_reason">
                                    <Form.Label>Campo adicional</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="appointment_reason"
                                        value={formData.appointment_reason}
                                        onChange={handleChange}
                                       
                                    >
                                        <option disabled selected value="">Elije una razon de tu cita</option>
                                        {appointments_reason.map((appointment_reason, index) => (
                                            <option key={index} value={appointment_reason}>{appointment_reason}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        El motivo es requerido.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" variant="primary"  className="mt-3">
                            Crear Cita
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Layout>
    );
};

export default CrearCitaForm;
