import React, { useState } from 'react';
import Layout from '../components/Layout';

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Previene el envío del formulario
        // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una llamada a la API

        setSubmitted(true); // Actualiza el estado a true para mostrar el mensaje
    };

    return (
        <Layout>
            <section>
                <div>
                    <div className='container'>
                        <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>Empresa</h1>
                        <div className='container'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d397160.7004185224!2d-74.35436669999999!3d5.176054899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f00f05f3779b3%3A0x1a9a731bfa74e35e!2sPacho%2C%20Cundinamarca!5e0!3m2!1ses-419!2sve!4v1631234567890"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                height="250"
                                width="100%"
                            ></iframe>
                        </div>
                        <strong style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Contáctenos</strong>
                        <br />
                        <strong style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Oficina:</strong> 123456789
                        <hr />
                    </div>
                    <div className="container">
                        <form role="form" id="Formulario" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Nombre" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nombres</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Nombre"
                                    name="Nombre"
                                    placeholder="Introduzca su nombre"
                                    required
                                    autoFocus
                                    style={{ fontSize: '1.3rem' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Motivo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Motivo de Contacto</label>
                                <select name="Motivo" className="form-control"  style={{ fontSize: '1.3rem' }}>
                                    <option value="Consulta General">Consulta General</option>
                                    <option value="Realizar Pedido">Realizar Pedido</option>
                                    <option value="Informe un problema">Informe un problema</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Empresa" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Empresa"
                                    name="Empresa"
                                    placeholder="Introduzca el nombre de su empresa"
                                    required
                                    style={{ fontSize: '1.3rem' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Correo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Correo"
                                    name="Correo"
                                    placeholder="Introduzca su correo electrónico"
                                    required
                                    style={{ fontSize: '1.3rem' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="Mensaje" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mensaje</label>
                                <textarea
                                    rows="5"
                                    cols="30"
                                    className="form-control"
                                    id="Mensaje"
                                    name="Mensaje"
                                    placeholder="Introduzca su mensaje"
                                    required
                                    style={{ fontSize: '1.3rem' }}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Enviar"
                                    style={{ fontSize: '1.5rem', padding: '10px 20px' }}
                                />
                                <input
                                    type="reset"
                                    className="btn btn-default"
                                    value="Limpiar"
                                    style={{ fontSize: '1.5rem', padding: '10px 20px' }}
                                />
                            </div>
                            {submitted && (
                                <div className="alert alert-success" role="alert">
                                    ¡Gracias por contactarnos! Su mensaje ha sido enviado exitosamente. Estamos aquí para cuidar de su mascota y responderemos a su consulta lo más pronto posible.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Contact;
