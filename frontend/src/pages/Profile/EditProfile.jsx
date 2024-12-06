import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2'; // Importa SweetAlert
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [initialData, setInitialData] = useState({
        nombres: '',
        apellidos: '',
        edad: '',
        email: '',
        telefono: ''
    });
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        edad: '',
        email: '',
        telefono: '',
        passwordActual: '',
        password: '',
        confirmPassword: ''
    });
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userData = {
                nombres: user.nombres || '',
                apellidos: user.apellidos || '',
                edad: user.edad || '',
                email: user.email || '',
                telefono: user.Telefono || ''
            };
            setInitialData(userData);
            setFormData({ ...formData, ...userData });
        }
    }, [user]);

    useEffect(() => {
        // Detecta si hay cambios en los campos relevantes
        const isFormChanged = Object.keys(initialData).some(
            key => formData[key] !== initialData[key]
        ) || formData.passwordActual || formData.password;

        setIsChanged(isFormChanged);
    }, [formData, initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChanged) {
            // SweetAlert para notificar al usuario que no se hicieron cambios
            Swal.fire({
                title: 'Sin cambios',
                text: 'No has realizado ningún cambio en el perfil.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const { nombres, apellidos, edad, email, telefono, passwordActual, password } = formData;
        const response = await updateProfile(user.id, nombres, apellidos, edad, email, telefono, passwordActual, password);

        if (response.success) {
            toast.success(response.message)
            navigate('/Login');
        } else {
            Swal.fire({
                title: 'Error',
                text: response.message || 'Hubo un error al actualizar el perfil',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Layout>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 shadow-sm" style={{ borderRadius: '15px' }}>
                            <h2 className="text-center mb-4">Editar Perfil</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formNombres">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombres"
                                        value={formData.nombres}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formApellidos" className="mt-3">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="apellidos"
                                        value={formData.apellidos}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEdad" className="mt-3">
                                    <Form.Label>Edad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="edad"
                                        value={formData.edad}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTelefono" className="mt-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPasswordActual" className="mt-3">
                                    <Form.Label>Contraseña Actual</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwordActual"
                                        value={formData.passwordActual}
                                        onChange={handleChange}
                                        placeholder="Ingresa tu contraseña actual si deseas cambiarla"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Nueva Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Deja en blanco si no deseas cambiarla"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mt-3">
                                    <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-4 w-100" disabled={!isChanged}>
                                    Guardar Cambios
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default EditProfile;
