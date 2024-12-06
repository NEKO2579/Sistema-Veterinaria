import { useCallback, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Card } from 'react-bootstrap';
import Layout from "../../components/Layout";
import "../../styles/LoginForm.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { email, password } = formData;
    const { login,  loading } = useContext(AuthContext); 


    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        console.log(response)
        if (response.success) {
            toast.success("Inicio de sesión exitoso!");
            navigate("/");
        }else{
            toast.error(response.message)
        }
    };

    return (
        <Layout>
            <Container className="login-container">
                <Card className="login-card">
                    <Card.Body>
                        <h2 className="login-title">Iniciar sesión</h2>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="Introduce tu correo electrónico"
                                    required
                                    className="login-input"
                                    style={{ fontSize: '1.3rem'}}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Introduce tu contraseña"
                                    required
                                    className="login-input"
                                    style={{ fontSize: '1.3rem'}}
                                />
                            </Form.Group >
                            <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                                variant="primary"
                                type="submit"
                                className="login-button"
                                disabled={loading} // Deshabilitar botón mientras se carga
                            >
                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
};

export default Login