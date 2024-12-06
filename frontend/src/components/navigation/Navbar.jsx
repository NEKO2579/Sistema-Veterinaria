import { useCallback, useContext } from "react";
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/navigationBar.css";

import { toast } from "react-toastify";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = useCallback(async () => {
    const response = await logout();
    if (response.success) {
      toast.success("Sesion cerrada con exito")
      navigate("/");
    }
  }, [navigate, logout]);

  const authLinks = (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle className="menu-button-custom" id="dropdown-basic">
        <span className="avatar-container">
          <svg className="avatar-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu-items-custom">
        <Dropdown.Item as={Link} to="/Perfil" className="menu-item-inactive">
          Tu perfil
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/citas" className="menu-item-inactive">
          Citas
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/Mascotas" className="menu-item-inactive">
          Mis Mascotas
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} className="menu-item-inactive">
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="link-signin">
        Iniciar sesión
      </Link>
      <Link to="/register" className="link-signup">
        Registrarse
      </Link>
    </>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="navbar-custom"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="responsive-navbar-nav"
        >
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Inicio
            </Nav.Link>
            <NavDropdown
              title="Mi Empresa"
              id="collasible-nav-dropdown"
              className="nav-link-custom"
            >
              <NavDropdown.Item
                as={Link}
                to="/mission"
                className="nav-dropdown-item-custom"
              >
                Misión y Visión
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/history"
                className="nav-dropdown-item-custom"
              >
                Nuestra Historia
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/gallery"
                className="nav-dropdown-item-custom"
              >
                Multimedia
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/servicess" className="nav-link-custom">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contáctenos
            </Nav.Link>
          </Nav>
          <div className="ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
