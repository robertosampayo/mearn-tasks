import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext

    // Extraer tareas y guardar tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, 
    actualizarTarea, limpiarTarea } = tareasContext
    
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada])

    // State del formulario
    const [tarea, guardarTarea] = useState({

        nombre: '',
    });
    //  Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // extraer el nombre de la tarea
    const {nombre} = tarea;

    if (!proyecto) {
        return null;
    }

    const [proyectoActual] = proyecto;

    const onSubmitTarea = e => {
        e.preventDefault();

        
        // validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }
        // SI es edicion o si es nueva tarea
        if(tareaseleccionada === null) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            // console.log(tarea);
            agregarTarea(tarea);

        } else {
             // actualizar tarea existente
             actualizarTarea(tarea);

             // Eliminar tarea seleccionadad
             limpiarTarea();
        }

        // Obtener y filtrar tareas actuales
        obtenerTareas(proyectoActual._id);
        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className='formulario'>
            <form onSubmit={onSubmitTarea} >
                <div className='contenedor-input'>
                    <input  type='text' 
                            className='input-text' 
                            placeholder='Nombre Tarea ...'
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input type='submit' 
                    className='btn btn-primario btn-submit btn-block' 
                    value={tareaseleccionada?'Editar Tarea':'Agregar Tarea'} />

                </div>
            </form>

            {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>: null}
        </div>
    )
}

export default FormTarea;