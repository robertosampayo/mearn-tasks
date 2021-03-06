import React, { useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoTareas = () => {



    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext

    const tareasContext = useContext(tareaContext);
    const { tareasproyecto  } = tareasContext

    

    
    // Array distructuring
    const [proyectoActual] = proyecto;



    const onClickEliminar = (e) => {
        e.preventDefault();
        eliminarProyecto(proyectoActual._id);
    }
    if (!proyecto) {
        return <h2>Selecciona un proyecto</h2>;
    }

    return (
        
        <>
        {proyectoActual &&

            <>
            
                <h2>Proyecto: {proyectoActual.nombre}</h2>

                <ul className='listado-tareas'>
                    {tareasproyecto && tareasproyecto.length === 0
                        ? (<li className='tarea'><p>No hay tareas</p></li>)

                        : 
                        <TransitionGroup>
                            {tareasproyecto.map(tarea => (
                                <CSSTransition 
                                    key={tarea.id}
                                    timeout={200}
                                    classNames='tarea'>
                                    <Tarea                                     
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    
                    }
                
                </ul>
                <button onClick={e => onClickEliminar(e)} type='button' className='btn btn-primario'>
                    Eliminar Proyecto &times;
                </button>
            
            </>



        }
        </>

    );
}

export default ListadoTareas;