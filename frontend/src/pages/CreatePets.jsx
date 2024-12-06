import React, { useState, useEffect, useContext } from 'react';
import { PacientesContext } from '../context/PacientesContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { FaWeightHanging, FaArrowsAltV, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const CreatePets = () => {
    const [formData, setFormData] = useState(new FormData()); 
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    const { crearPacientes } = useContext(PacientesContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.id) {
            const updatedFormData = new FormData(); 
            updatedFormData.set('dueño', user.id);  
            setFormData(updatedFormData);           
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setErrores({
            ...errores,
            [name]: null,
        });

        const updatedFormData = new FormData();
        for (const pair of formData.entries()) {
            updatedFormData.append(pair[0], pair[1]);
        }

        if (name === 'foto_url') {
            updatedFormData.set(name, files[0]);
        } else {
            updatedFormData.set(name, value);
        }

        setFormData(updatedFormData);
    };

    const validateForm = () => {
        const currentErrors = {};

        if (!formData.get('nombre')) currentErrors.nombre = "El campo 'nombre' es obligatorio.";
        if (!formData.get('especie')) currentErrors.especie = "El campo 'especie' es obligatorio.";
        if (!formData.get('edad') || isNaN(formData.get('edad')) || formData.get('edad') <= 0) {
            currentErrors.edad = "El campo 'edad' es obligatorio y debe ser un número válido.";
        }
        if (!formData.get('peso') || isNaN(formData.get('peso')) || formData.get('peso') <= 0) {
            currentErrors.peso = "El campo 'peso' es obligatorio y debe ser numérico.";
        }
        if (!formData.get('altura') || isNaN(formData.get('altura')) || formData.get('altura') <= 0) {
            currentErrors.altura = "El campo 'altura' es obligatorio y debe ser una altura válida.";
        }
        if (!formData.get('raza')) currentErrors.raza = "El campo 'raza' es obligatorio.";

        setErrores(currentErrors);
        return Object.keys(currentErrors).length === 0;
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();

        if (validateForm()) {
           const {status, message} = await crearPacientes(formData);
           if(status){
                toast.success(message);
               navigate("/Mascotas");
           }else{
                toast.error(message)
           }
        }
    };

    return (
        <Layout>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Crear Paciente</h1>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Introduce el nombre"
                                    onChange={handleChange}
                                    isInvalid={!!errores.nombre}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.nombre}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="especie">
                                <Form.Label>Especie</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="especie"
                                    placeholder="Introduce la especie"
                                    onChange={handleChange}
                                    isInvalid={!!errores.especie}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.especie}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="edad">
                                <Form.Label><FaCalendarAlt /> Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="edad"
                                    placeholder="Introduce la edad (en años)"
                                    onChange={handleChange}
                                    isInvalid={!!errores.edad}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.edad}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="peso">
                                <Form.Label><FaWeightHanging /> Peso</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="peso"
                                    placeholder="Introduce el peso (en kg)"
                                    onChange={handleChange}
                                    isInvalid={!!errores.peso}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.peso}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="altura">
                                <Form.Label><FaArrowsAltV /> Altura</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="altura"
                                    placeholder="Introduce la altura (en metros)"
                                    onChange={handleChange}
                                    isInvalid={!!errores.altura}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.altura}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="raza">
                                <Form.Label>Raza</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="raza"
                                    placeholder="Introduce la raza"
                                    onChange={handleChange}
                                    isInvalid={!!errores.raza}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errores.raza}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="foto_url">
                                <Form.Label>Foto del Paciente</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="foto_url"
                                    onChange={handleChange}
                                    accept=".jpg,.jpeg,.png,.gif,.webp"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="mt-4">
                        Crear Paciente
                    </Button>
                </Form>
            </Container>
        </Layout>
    );
};
