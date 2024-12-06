import React from 'react';
import Layout from '../components/Layout';

function NuestraHistoria() {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        {/* Contenido del lado izquierdo (sidebar), si lo hubiera */}
                    </div>

                    <div className="col-sm-8">
                        <h4><p className="text-success">Usted está en / Mi Empresa - Nuestra Historia.</p></h4>
                        <hr />
                        <h1 style={{ fontWeight: 'bold', fontSize: '4rem' }}>Nuestra Historia</h1>
                        <p>
                            <div align="justify">
                                <font face="arial" size="5" color="black">
                                    La Clínica Veterinaria El Nuevo Horizonte abrió sus puertas el cinco (5) de noviembre de 2001 atendida por el propietario Médico veterinario Dr. Jaime Enrique Sanchez y una asistente. La Clínica fue proyectada y organizada para ofrecerles los servicios a clientes de todos los estratos sociales de la ciudad. A partir de esa importante fecha la Clínica se empezó a llenar de clientes quienes día a día han visto crecer nuestra empresa.<br /><br />

                                    La Clínica Veterinaria El Nuevo Horizonte fue creada con el fin de ofrecerle a la ciudad servicios que no se ofrecían y de acuerdo a la experiencia adquirida por parte del fundador en dos Clínicas Dr. Jaime Sanchez cuales trabajó y en donde se adquirió un aprendizaje muy importante, desde el punto de vista científico y administrativo, el cual se ha venido aplicando y ha sido parte de la clave del éxito de nuestra Empresa.<br /><br />

                                    Durante los 5 años de trayectoria hemos visto crecimiento y nos sentimos orgullosos de ofrecer cada día servicios de mejor calidad apoyados en la actualización científica permanente y en la adquisición de tecnología de punta para uso veterinario. La Clínica abrió sus puertas con un (1) Veterinario y una asistente; hoy se cuenta con más de tres (3) veterinarios acompañados de el resto del equipo de trabajo, que más que un equipo, es una familia trabajando por el bienestar de los pacientes y por la satisfacción de los clientes.<br /><br />

                                    No se podría terminar sin mencionar algo que ha sido motivo de satisfacción para la Clínica Veterinaria El Nuevo Horizonte y es el hecho de ser siempre desde el primer día hasta hoy, pionera en todo, de ser un modelo a seguir. La ciencia no se detiene, por eso cada día se cuenta con más medios y equipos, razón por la cual permanentemente se renuevan para estar al día con la tecnología que es de gran ayuda.<br /><br />

                                    Por último, vale la pena mencionar que dentro de los progresos, hemos pasado desde hace algunos años a la sistematización de la Clínica que nos permite llevar las historias Clínicas de los pacientes de una manera muy organizada y permite mantener permanente comunicación con los clientes vía Internet.
                                </font>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NuestraHistoria;
