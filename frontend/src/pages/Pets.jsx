import React, { useContext, useEffect } from 'react';
import Layout from "../components/Layout";
import { PetsCard } from "../components/PetsCard";
import { Button, Row, Col } from "react-bootstrap";
import '../styles/Pets.css';
import { Link } from "react-router-dom";
import { PacientesContext } from '../context/PacientesContext';

export const Pets = () => {

  const { pacientes, obtenerPacientesPorUsuario } = useContext(PacientesContext);
 

  useEffect(() => {
    const fetchPets = async () => {
      await obtenerPacientesPorUsuario();
    }
    fetchPets();
  }, []);

  const showProducts = () => {
    if (pacientes && pacientes.length > 0) {
      return (
        <Row>
          {pacientes.map((pet, index) => (
            <Col key={index} md={4} className="mb-4 section-flex">
              <PetsCard pets={pet} />
            </Col>
          ))}
        </Row>
      );
    } else {
      return (
        <Row className="justify-content-center content">
          <Col className="text-center">
            <h2 className="my-5">Ups, parece que no tienes mascotas agregadas...</h2>
            <Button as={Link} variant="primary" size="lg" to="/Mascotas/agregar">
              Agregar Mascota
            </Button>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Layout>
      <main className="pets-container">
        <div className="d-flex justify-content-end align-items-center my-4">
          <Button variant="primary" size="lg" as={Link} to="/Mascotas/agregar">
            Agregar tu Mascota
          </Button>
        </div>
        <h1>Tus Mascotas</h1>

        {showProducts()}

      </main>
    </Layout>
  );
};
