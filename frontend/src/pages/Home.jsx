import React from 'react';
import Layout from '../components/Layout';
import ImageGallery from 'react-image-gallery';
import slider1 from "../assets/sliders/slider1.jpg"
import slider2 from "../assets/sliders/slider2.jpg"
import jaulas from "../assets/img/jaulas.jpg"
import quirofano from "../assets/img/quirofano.jpg"

function Home() {
    // Array de imágenes para el carrusel
    const images = [
        {
            original: slider1,
            thumbnail: slider1,
            description: 'Proteger la fauna es nuestra mayor responsabilidad'
        },
        {
            original: slider2,
            thumbnail: slider2,
            description: 'Conozca nuestra variedad de especies'
        },
        // Agrega más imágenes según sea necesario
    ];

    // Función personalizada para renderizar los elementos del carrusel
    const renderItem = (item) => (
        <div style={{ position: 'relative' }}>
            <img src={item.original} alt={item.description} style={{ width: '100%' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '1.8rem', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
                {item.description}
            </div>
        </div>
    );

    return (
        <Layout>
            <ImageGallery items={images} showThumbnails={false} autoPlay={true} showPlayButton={false} showFullscreenButton={false} renderItem={renderItem} /> 
            <br/>
            <div className="container text-center">
                <h2>En la Veterinaria El Nuevo Horizonte, nos dedicamos a brindar atención médica de calidad a todas las mascotas. Ofrecemos servicios de emergencia 24/7, consultas veterinarias, cirugías, alojamiento y más. ¡Nos apasiona cuidar de tu compañero como si fuera nuestro!</h2><br /><br />
                <div className="row">
                    <div className="col-sm-4">
                        <img src={jaulas} className="img-responsive" style={{ width: '100%' }} alt="Image" />
                        <p className='h2'>Nuestros Alojamientos</p>
                    </div>
                    <div className="col-sm-4">
                        <img src={quirofano} className="img-responsive" style={{ width: '100%' }} alt="Image" />
                        <p className='h2'>Nuestros Quirófanos</p>
                    </div>
                    <div className="col-sm-4">
                        <div className="well">
                          <h2 className="font-bold">¡Servicio de Urgencias 24/7!</h2>
                          <p style={{ fontSize: '1.40rem' }}>Estamos disponibles a cualquier hora del día para cuidar de tus mascotas. ¡Llámanos ahora!</p>
                        </div>
                        <div className="well">
                          <h2 className="font-bold">¡Promoción Exclusiva!</h2>
                          <p style={{ fontSize: '1.40rem' }}>Obtén un 15% de descuento en tu primera consulta. ¡No te lo pierdas!</p>
                        </div>
                    </div>
                </div>
                <br/>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        <p style={{ fontSize: '1.50rem' }}><strong className="text-success">LA MEJOR CLÍNICA VETERINARIA DE COLOMBIA.</strong> EN CLÍNICA VETERINARIA EL NUEVO HORIZONTE CONTAMOS CON PERSONAL ALTAMENTE CALIFICADO DE IGUAL FORMA CONTAMOS CON UN LABORATORIO INTEGRADO EL CUAL PERMITE CORRER PRUEBAS COMO QUÍMICA SANGUÍNEA SECA, LO QUE FACILITA LA OBTENCIÓN DE DATOS A CUALQUIER HORA Y EN CUESTIÓN DE MINUTOS, HEMOGRAMA (BIOMETRÍA HEMÁTICA), COPROPARASITOLOGÍA, PRUEBA QUE AYUDA A LA DETECCIÓN DE PARÁSITOS O HUEVOS DE LOS MISMOS EN HECES FECALES Y SEROLOGÍA, UNA TÉCNICA QUE AYUDA A DETECTAR ENFERMEDADES COMO PARVOVIRUS CANINO, DE IGUAL FORMA CON MEDICINAS DE ALTA CALIDAD PARA CUALQUIER TIPO DE ENFERMEDAD QUE TENGA SU MASCOTA YA SEA SU PERRO O SU GATO NO OLVIDE EN VISITARNOS ..</p>
                    </div>
                </div>
            </div><br />
            <br />
        </Layout>
    );
}

export default Home;

