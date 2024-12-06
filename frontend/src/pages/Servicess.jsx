import { Fragment } from "react";
import NavigationBar from "../components/navigation/Navbar";
import sala_de_belleza from "../assets/img/sala de belleza.jpg";
import accesorios from "../assets/img/accesorios.jpg";
import hospitalizacion from "../assets/img/hospitalizacion.jpg";
import ortopedia from "../assets/img/ortopedia.jpg";
import ambulancia from "../assets/img/ambulancia.jpg";
import productos from "../assets/img/Productos.jpg";
import CardComponent from "../components/Card/CardComponent";

function Servicess() {
    const commonPanelClass = 'panel-primary'; // Clase común para el panel

    const servicios = [
        {
            title: 'Servicios Generales',
            imageSrc: accesorios,
            items: ['Vacunación', 'Laboratorios', 'Medicina General'],
        },
        {
            title: 'Hospitalización',
            imageSrc: hospitalizacion,
            items: ['Tratamientos de Pacientes', 'Rayo X', 'Cuidados Intensivos'],
        },
        {
            title: 'Sala de Belleza',
            imageSrc: sala_de_belleza,
            items: ['Baño Normal y Medicado', 'Peluquería', 'Cortes de Uñas'],
        },
        {
            title: 'Servicios Especializados',
            imageSrc: ortopedia,
            items: ['Ortopedia', 'Oncología', 'Oftalmología'],
        },
        {
            title: 'Servicio de Ambulancia las 24 Horas',
            imageSrc: ambulancia,
            items: ['Servicio de Ambulancia para su Mascota', 'Transporte de Emergencia', 'Atención en Ruta', ],
        },
        {
            title: 'Productos para su Mascota',
            imageSrc: productos,
            items: ['Venta de Alimento y suplementos de Mejor Calidad', 'Accesorios para su Mascota', 'Juguetes Interactivos',],
        },
    ];

    return (
        <Fragment>
            <NavigationBar />
            <br />
            <div className="container">
                <h1 className="text-center" style={{ fontSize: '4rem' }}>NUESTROS SERVICIOS</h1>
                <div className="row">
                    {servicios.map((servicio, index) => (
                        <div className="col-sm-4 mb-4" key={index}>
                            <CardComponent
                                title={<span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{servicio.title}</span>}
                                imageSrc={servicio.imageSrc}
                                items={servicio.items.map((item, idx) => (
                                    <li key={idx} style={{ fontSize: '1.5rem' }}>{item}</li>
                                ))}
                                panelClass={commonPanelClass}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <footer className="container-fluid text-center">
                <p>Llama YA Copyright</p>
                <form className="form-inline justify-content-center">
                    <label htmlFor="email" className="mr-2">Get deals:</label>
                    <input type="email" className="form-control mx-2" size="50" placeholder="Email Address" id="email" />
                    <button type="button" className="btn btn-danger p-3">Sign Up</button>
                </form>
            </footer>
            <br />
            <br />
        </Fragment>
    );
}

export default Servicess;

