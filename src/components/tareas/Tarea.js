import React, { useContext } from 'react'
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ({tarea}) => {

    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto  } = proyectosContext

    // Extraer tareas y guardar tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual  } = tareasContext;

    const [ proyectoActual ] = proyecto;

    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id);
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        cambiarEstadoTarea(tarea);
    }

    // Agreaga una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }


    return (<li className='tarea'>
        <p>{tarea.nombre}</p>
        <div className='estado'>
            {tarea.estado ? 
            
                (   
                    <button 
                        type='button' 
                        className='completo'
                        onClick={() => cambiarEstado(tarea) }
                    >
                        Completo
                    </button>
                )
                :
                (
                    <button 
                        type='button' 
                        className='incompleto'
                        onClick={() => cambiarEstado(tarea) }
                    >
                        Incompleto
                    </button>
                    
                )

            }
        </div>

        <div className='acciones'>
            <button
                type='button'
                className='btn btn-primario'
                onClick={() => seleccionarTarea(tarea)}
            >
                Editar
            </button>

            <button
                type='button'
                className='btn btn-secundario'
                onClick={ e => { e.preventDefault(); tareaEliminar(tarea.id);} }
            >
                Eliminar
            </button>
        </div>
    </li>)
}

export default Tarea