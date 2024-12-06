import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="container-fluid text-center bg-dark text-white py-4">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <FaFacebook size={30} />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="http://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <FaYoutube size={30} />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="http://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <FaTwitter size={30} />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white">
                        <FaInstagram size={30} />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="tel:3104449644" className="text-white">
                        <FaPhone size={30} />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="mailto:example@example.com" className="text-white">
                        <FaEnvelope size={30} />
                    </a>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <h5 style={{ fontSize: '2rem' }}>Información Adicional</h5>
                    <p style={{ fontSize: '1.5rem' }}>
                        Estamos aquí para cuidar a tus mascotas. Si tienes alguna pregunta, no dudes en 
                        <a href="/Contact" className="text-white"> contáctarnos</a>
                    </p>
                    <p style={{ fontSize: '1.5rem' }}>
                        Ofrecemos servicios de veterinaria, peluquería y entrenamiento para mascotas.
                    </p>
                    <p style={{ fontSize: '1.5rem' }}>
                        ¡Tu mascota es nuestra prioridad!
                    </p>
                </div>
                <div className="col">
                    <h5 style={{ fontSize: '2rem' }}>Horario de Atención</h5>
                    <p style={{ fontSize: '1.5rem' }}>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p style={{ fontSize: '1.5rem' }}>Sábado: 9:00 AM - 2:00 PM</p>
                    <p style={{ fontSize: '1.5rem' }}>Domingo: Cerrado</p>
                </div>
            </div>
            <br />
            <p style={{ fontSize: '1.5rem' }}>&copy; {new Date().getFullYear()} Tu Veterinaria. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
