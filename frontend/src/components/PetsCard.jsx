import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { FaPaw, FaBirthdayCake, FaWeight } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { useContext } from 'react';
import { PacientesContext } from '../context/PacientesContext';
import Swal from 'sweetalert2';


export const PetsCard = ({ pets }) => {
    const navigate = useNavigate();
    const { eliminarPaciente } = useContext(PacientesContext);

    const handleNavigate = () => {
        navigate(`editar/${pets.Id_Paciente}`, { state: pets });
    };

    const handleDelete = () => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar a ${pets.Nombre_Animal}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPaciente(pets.Id_Paciente);
                Swal.fire(
                    'Eliminado',
                    `${pets.Nombre_Animal} ha sido eliminado.`,
                    'success'
                );
            }
        });
    };


    return (
        <Col className="mb-4">
            <Card className="h-100 shadow-lg rounded" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                <Card.Img
                    variant="top"
                    src={`portalnhorizonv.byethost13.com${pets.foto_url}`}
                    alt={`Imagen de ${pets.Nombre_Animal}`}
                    className="rounded-top"
                    style={{ height: '200px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }}
                />
                <Card.Body>
                    <Card.Title className="text-center" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        {pets.Nombre_Animal}
                    </Card.Title>
                    <Card.Text className="text-muted" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem' }}>
                        <p><MdPets /> Tipo: {pets.Tipo_Animal}</p>
                        <p><FaPaw /> Raza: {pets.Raza_Animal}</p>
                        <p><FaBirthdayCake /> Edad: {pets.Edad_Animal} años</p>
                        <p><FaWeight /> Peso: {pets.Peso_Animal} kg</p>
                    </Card.Text>

                    <Button
                        onClick={handleNavigate}
                        variant="primary"
                        className="w-100 mb-2"
                        style={{ backgroundColor: '#0069d9', borderColor: '#0062cc' }}
                    >
                        Editar
                    </Button>

                    <Button
                        onClick={handleDelete}
                        variant="danger"
                        className="w-100"
                    >
                        Eliminar
                    </Button>

                </Card.Body>
                <Card.Footer style={{ backgroundColor: '#e9ecef', borderTop: 'none' }}>
                    <small className="text-muted">
                        <FaPaw /> Actualizado recientemente
                    </small>
                </Card.Footer>
            </Card>
        </Col>
    );
};
