import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ListadoProyectos = () =>{

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} =alertaContext

    useEffect(() => {
        if(mensaje) {
            mostrarAlerta(mensaje.msj, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje]);


    // revisar si proyectos tiene conenido
    if (proyectos && proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;



    return (
        <ul className='listado-proyectos'>

            { alerta ? ( <div className={`${alerta.categoria}`}>{alerta.msg}</div>) : null}

            { proyectos && proyectos.length > 0 &&
                <TransitionGroup>

                { proyectos.map((proyecto, key) => {
                    
                    // console.log(proyecto);
                    return <CSSTransition 
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'

                    >
                        <Proyecto
                            
                            proyecto={proyecto}
                        >

                        </Proyecto>
                    </CSSTransition>
                }
                
                
                )}

            </TransitionGroup>

            }

        </ul>
    )
}



export default ListadoProyectos