import React, { useContext,useEffect  } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Proyecto = ({proyecto}) =>{
    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual  } = proyectosContext

    const tareasContext = useContext(tareaContext);
    const { obtenerTareas  } = tareasContext

    const nodeRef = React.useRef(null);

    // const authContext = useContext(AuthContext);
    // const { usuarioAutenticado, usuario  } = authContext
    // Agregar el proyecto actual

    // useEffect(() => {
    //     usuarioAutenticado();
       
    // }, []);

    const seleccionarProyecto = (id) => {
        proyectoActual(id);
        obtenerTareas(id);
    }


    return (
        
            <li ref={nodeRef}>
                {proyecto && 
                    <button
                        type='button'
                        className='btn btn-gray'
                        onClick={() => seleccionarProyecto(proyecto._id)} 
                        
                    >
                        {proyecto.nombre}
                    </button>

                }
            </li>
        
    )
}



export default Proyecto