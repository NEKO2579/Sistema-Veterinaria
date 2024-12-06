import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Layout from "../components/Layout";
import { useContext } from "react";
import { PacientesContext } from "../context/PacientesContext";
import "../styles/Pets.css";
import { toast } from "react-toastify";


export const EditPets = () => {
    const { id } = useParams();
    const location = useLocation();
    const { ActualizarPacientes } = useContext(PacientesContext);

    // Inicialmente, formData y initialFormData son null
    const [formData, setFormData] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);  
    const [showAlert, setShowAlert] = useState(false);  

    const navigate = useNavigate()

        useEffect(() => {
        if (location.state) {
            const petsData = location.state;
            setFormData({
                nombre: petsData.Nombre_Animal,
                especie: petsData.Tipo_Animal,
                edad: petsData.Edad_Animal,
                peso: petsData.Peso_Animal,
                altura: petsData.Altura_animal,
                raza: petsData.Raza_Animal,
                dueño: petsData.Dueño,
                foto_url: null,
                id: petsData.Id_Paciente
            });
            setInitialFormData(petsData);
        } else {
            axios.get(`portalnhorizonv.byethost13.com/PHP-PROYECTO/controlador/Pacientes/ObtenerPacientes.php?idPaciente=${id}`)
                .then(response => {
                    if (response.data.status !== "success") {
                        throw new Error("Error al cargar los datos");
                    }
                    const fetchedData = {
                        nombre: response.data.data.Nombre_Animal,
                        especie: response.data.data.Tipo_Animal,
                        edad: response.data.data.Edad_Animal,
                        peso: response.data.data.Peso_Animal,
                        altura: response.data.data.Altura_animal,
                        raza: response.data.data.Raza_Animal,
                        dueño: response.data.data.Dueño,
                        id: response.data.data.Id_Paciente,
                        foto_url: null,  
                    };

                    setFormData({ ...fetchedData });  
                    setInitialFormData({ ...fetchedData });  
                })
                .catch(error => console.log(error));
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });

        setHasChanged(true);  
    };

    const hasFormDataChanged = () => {
        if (!initialFormData) return true;  

        for (let key in formData) {
            if (key !== "especie" && key !== "raza" && key !== "dueño") {
                const initialValue = initialFormData[key];
                const currentValue = formData[key];

                if (currentValue instanceof File) {
                    if (!initialValue || currentValue.name !== initialValue.name) {
                        return true;
                    }
                } else {
                    if (String(currentValue) !== String(initialValue)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hasFormDataChanged()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

           const {success, message} = await ActualizarPacientes(formDataToSend);
           if(success) {
            toast.success("Se actualizo correctamente")
            setTimeout(() => {
                navigate("/Mascotas")

            }, 2000)
           }
        } else {
            toast.error(message)
        }
    };

    return (
        <Layout>
            <Container className="mt-5">
                <h2 className="text-center mb-4">Editar Mascota</h2>
                {showAlert && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        No hay cambios significativos en los datos del formulario.
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData?.nombre || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="edad">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="edad"
                                    value={formData?.edad || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="peso">
                                <Form.Label>Peso (kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="peso"
                                    value={formData?.peso || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="altura">
                                <Form.Label>Altura (cm)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="altura"
                                    value={formData?.altura || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="especie">
                                <Form.Label>Especie (No editable)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="especie"
                                    value={formData?.especie || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="raza">
                                <Form.Label>Raza (No editable)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="raza"
                                    value={formData?.raza || ""}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="foto_url">
                                <Form.Label>Subir Foto</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="foto_url"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        style={{marginBottom: "10px"}}
                        disabled={!hasChanged}
                    >
                        Guardar Cambios
                    </Button>
                </Form>
            </Container>
        </Layout>
    );
};
