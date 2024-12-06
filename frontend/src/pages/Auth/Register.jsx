import { useCallback, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import Layout from "../../components/Layout";
import "../../styles/LoginForm.css";

// Array de tipos de identificación
const tiposIdentificacion = [
    'Cedula De Ciudadania',
    'Tarjeta De Identidad',
    'Cedula De Extranjeria',
    'Tarjeta De Extranjeria',
    'Documento Nacional'
];

const generos = [
    'HOMBRE',
    'MUJER',
    'NO_BINARIO',
];

export const Register = () => {
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        edad: "",
        email: "",
        password: "",
        t_identificacion: "",
        n_identificacion: "",
        telefono: "",
        t_genero: ""
    });

    const navigate = useNavigate();
    const { nombres, apellidos, edad, email, password, t_identificacion, n_identificacion, telefono, t_genero } = formData;
    const { register, loading } = useContext(AuthContext);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await register(nombres, apellidos, edad, email, password, t_identificacion, n_identificacion, telefono, t_genero);
        if (response.success) {
            toast.success("Registro exitoso!");
            navigate("/login");
        }else{
            toast.error(response.message)
        }
    };

    return (
        <Layout>
            <Container className="register-container">
                <Card className="register-card mx-auto">
                    <Card.Body>
                        <h2 className="register-title text-center">Registrar</h2>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicNombres" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Nombres</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nombres"
                                            value={nombres}
                                            onChange={onChange}
                                            placeholder="Introduce tu nombre"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicApellidos" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="apellidos"
                                            value={apellidos}
                                            onChange={onChange}
                                            placeholder="Introduce tus apellidos"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEdad" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Edad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="edad"
                                            value={edad}
                                            onChange={onChange}
                                            placeholder="Introduce tu edad"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicTelefono" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="telefono"
                                            value={telefono}
                                            onChange={onChange}
                                            placeholder="Introduce tu número de teléfono"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicTI" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Tipo de Identificación</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="t_identificacion"
                                            value={t_identificacion}
                                            onChange={onChange}
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        >
                                            <option value="">Selecciona un tipo de identificación</option>
                                            {tiposIdentificacion.map((tipo, index) => (
                                                <option key={index} value={tipo}>
                                                    {tipo}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicNI" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Número de Identificación</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="n_identificacion"
                                            value={n_identificacion}
                                            onChange={onChange}
                                            placeholder="Introduce tu número de identificación"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicTG" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                    <Form.Label>Genero</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="t_genero"
                                        value={t_genero}
                                        onChange={onChange}
                                        placeholder="Introduce tu genero"
                                        required
                                        style={{ fontSize: '1.3rem' }}
                                    >
                                        <option value="">Selecciona tu género</option>
                                        {generos.map((genero, index) => (
                                            <option key={index} value={genero}>
                                                {genero}
                                            </option>
                                        ))}
                                    </Form.Control>

                                </Form.Group>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            placeholder="Introduce tu email"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={onChange}
                                            placeholder="Introduce tu contraseña"
                                            required
                                            style={{ fontSize: '1.3rem' }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="register-button btn-sm"
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Registrar'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
};
