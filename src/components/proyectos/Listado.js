import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'


const ListadoProyectos = () =>{

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext

    useEffect(() => {
        obtenerProyectos();
    },[])

    // revisar si proyectos tiene conenido
    if (proyectos && proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;



    return (
        <ul className='listado-proyectos'>
            {proyectos.map(proyecto => (
                <Proyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                >

                </Proyecto>
            ))}
        </ul>
    )
}



export default ListadoProyectos