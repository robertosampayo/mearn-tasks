import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTarea'
import AuthContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    // Extraer la info de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return (
        <div className='contenedor-app'>
            <Sidebar />

            <div className='seccion-principal'>
            <Barra />
                <main>
                    <FormTarea />
                    <div className='contenedor-tareas'>
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos