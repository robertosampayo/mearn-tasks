import React, { useReducer } from 'react'
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer'
import * as types from '../../types'
import clienteAxios from '../../config/axios'
import { uuid } from 'uuidv4'


const ProyectoState = props => {



    const initialState = {
        proyectos: [],
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: types.FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos =  async () => {
        try {

                const resultado = await clienteAxios.get('/api/proyectos');

                dispatch({
                    type: types.OBTENER_PROYECTOS,
                    payload: resultado.data.proyectos

                });

        } catch (error) {
            console.log(error);
        }
    }

    const agregarProyecto = async (proyecto) => {
        try {

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);

            // Insertar el proyecto en el state
            dispatch({
                type: types.AGREGAR_PROYECTO,
                payload: resultado.data

            });
                
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarError = () => {
        dispatch({
            type: types.VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto que el usuario dio click

    const proyectoActual = proyectoId => {
        dispatch({
            type: types.PROYECTO_ACTUAL,
            payload: proyectoId           
        })
    }

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: types.ELIMINAR_PROYECTO,
            payload: proyectoId           
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
                
            }}
        >
            {props.children}
        </proyectoContext.Provider>

    )
}

export default ProyectoState;