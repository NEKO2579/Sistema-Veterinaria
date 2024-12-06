import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import "../../styles/MyProfile.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { deleteAccount } = useContext(AuthContext);

  const handleEditProfile = () => {
    navigate(`/Perfil/editar`);
  };

  const handleDeleteAccount = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar mi cuenta',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await deleteAccount(user.id);
            if (response.success) {
                Swal.fire(
                    'Eliminado',
                    'Tu cuenta ha sido eliminada.',
                    'success'
                ).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire(
                    'Error',
                    response.message,
                    'error'
                );
            }
        }
    });
};
  return (
    <Layout>
      <Container className="my-profile-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="my-profile-card shadow-sm">
              <Card.Header className="my-profile-header text-center">
                <FaUserCircle
                  size={70}
                  color="gray"
                  className="my-profile-icon"
                />
                <h2 className="my-profile-title">Mi Perfil</h2>
              </Card.Header>
              <Card.Body>
                <Card.Title className="my-profile-name">
                  {user.nombres} {user.apellidos}
                </Card.Title>
                <Card.Text>
                  <strong>Correo electrónico:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                  <strong>Teléfono:</strong> {user.Telefono}
                </Card.Text>
                <Card.Text>
                  <strong>Identificación:</strong> {user.T_Identificacion} -{" "}
                  {user.N_identificacion}
                </Card.Text>
                <Card.Text>
                  <strong>Género:</strong> {user.T_Genero}
                </Card.Text>
                <Card.Text>
                  <strong>Edad:</strong> {user.edad} años
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={handleEditProfile}>
                    Editar Perfil
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleDeleteAccount}
                  >
                    Eliminar Cuenta
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-center my-profile-footer">
                Creado el: {new Date(user.created_at).toLocaleDateString()}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MyProfile;
