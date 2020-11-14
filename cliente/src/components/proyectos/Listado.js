import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Proyectos from '.'

const ListadoProyectos = () =>{

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext



    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        // console.log('Proyectos:');
        // proyectos.map((proyecto, key) => {
        //     console.log(proyecto._id);
        // });
    }, [proyectos]);

    // revisar si proyectos tiene conenido
    if (proyectos && proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;



    return (
        <ul className='listado-proyectos'>
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