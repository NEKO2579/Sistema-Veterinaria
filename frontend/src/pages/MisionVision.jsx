import React from 'react';
import Layout from '../components/Layout';

function MisionVision() {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        {/* Contenido del lado izquierdo (sidebar), si lo hubiera */}
                    </div>

                    <div className="col-sm-8">
                        <h4><p className="text-success">Usted está en / Mi Empresa - Misión y Visión.</p></h4>
                        <hr />
                        <h1  style={{ fontWeight: 'bold', fontSize: '4rem' }}>Misión</h1>
                        <p>
                            <div align="justify">
                                <font face="arial" size="5" color="black">
                                    Brindar calidad de vida a cada mascota y a su familia a través de servicios integrales de salud y bienestar, soportados en la trayectoria de un equipo humano altamente calificado y comprometido. La atención personalizada, el enfoque en el cuidado preventivo, el control del dolor, la medicina y la cirugía avanzadas, son la clave para el bienestar de nuestras mascotas. Todo un servicio de profesionales nos ponemos a tu disposición para asesorarte en el mejor y más adecuado tratamiento de tu mascota. Veterinaria El Cebu, una Veterinaria preparada para ofrecerte los más avanzados servicios médicos y una excelente atención.
                                </font>
                            </div>
                        </p>
                        <br /><br />
                        <hr />
                        <h1  style={{ fontWeight: 'bold', fontSize: '4rem' }}>Visión</h1>
                        <p>
                            <div align="justify">
                                <font face="arial" size="5" color="black">
                                    Ser una Empresa sólida cada día dotada con tecnología de punta, seguir siendo líder en la prestación de servicios médicos veterinarios de la mejor calidad de la ciudad y la región, contando para ello con un equipo médico veterinario muy profesional y muy calificado en permanente capacitación y actualización científica. Con el bienestar de nuestro equipo humano, lograremos el bienestar de nuestros pacientes que conllevarán al bienestar de las familias de los mismos.
                                </font>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MisionVision;
