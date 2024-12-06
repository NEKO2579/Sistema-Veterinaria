import React from 'react';
import Layout from '../components/Layout';
import ImageGallery from 'react-image-gallery';
import accesorios from "../assets/img/accesorios.jpg"
import laboratorio from "../assets/img/laboratorio.jpg"
import medicos from "../assets/img/medicos.jpg"

function GaleriasFotograficas() {
    const images = [
        {
            original: laboratorio,
            thumbnail: laboratorio,

        },
        {
            original: medicos,
            thumbnail: medicos,

        },
        {
            original: accesorios,
            thumbnail: accesorios,

        }
    ];

    return (
        <Layout>
            <br />
            <div className="container">
                <h1  style={{ fontWeight: 'bold', fontSize: '4rem' }}>Instalaciones - Galerías Fotográficas</h1>
                <ImageGallery
                    items={images}
                    showThumbnails={false} // Oculta las miniaturas
                    showFullscreenButton={false} // Oculta el botón de pantalla completa
                    showPlayButton={false} // Oculta el botón de reproducción automática
                />
            </div>
            <br />
        </Layout>
    );
}

export default GaleriasFotograficas;
