import React, { useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const ListadoTareas = () => {



    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext

    const tareasContext = useContext(tareaContext);
    const { tareasproyecto  } = tareasContext

    if (!proyecto) {
        return <h2>Selecciona un proyecto</h2>;
    }

    // Array distructuring
    const [proyectoActual] = proyecto;

    const onClickEliminar = (e) => {
        e.preventDefault();
        eliminarProyecto(proyectoActual.id);
    }

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasproyecto && tareasproyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)

                    : tareasproyecto.map(tarea => (
                        <Tarea 
                            tarea={tarea}
                        />
                    ))
                }
            
            </ul>
            <button onClick={e => onClickEliminar(e)} type='button' className='btn btn-eliminar'>
                Eliminar Proyecto &times;
            </button>
        </>
    );
}

export default ListadoTareas;