import React, { useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {


    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({

        nombre: ''
    })
    const { nombre } = proyecto

    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        // Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        } 
        // Agregar el state
        agregarProyecto(proyecto);
        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        })

    }




    return (
        <>
        
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={(e) => { e.preventDefault(); mostrarFormulario(); }}
            >
                Nuevo Proyecto
            </button>

            {
                formulario?
                (
                    <form className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitProyecto}>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Nombre Proyecto'
                        name='nombre'
                        value={nombre}
                        onChange={onChangeProyecto}
                        
                    />
                    <input 
                        type='submit'
                        className='btn btn-primario btn-block'
                        value='Agregar Proyecto'
                        
                    />
    
                    </form>
                ):
                null
            }
            { errorformulario ? 
            <p className='mensaje error'>El nombre del Proyecto es obligatorio</p>: null }
        </>
    )
}

export default NuevoProyecto