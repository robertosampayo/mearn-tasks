import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'
import * as types from '../../types'
import {uuid} from 'uuidv4'

const TareaState = props => {


    const initialState = {
        tareas: [
            { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            { id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            { id: 3, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            { id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            { id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            { id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 3},
            { id: 7, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            { id: 8, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 2},
        ],
        tareasproyecto:null,
        errortarea: false,
        tareaseleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // Funciones

    const obtenerTareas = proyectoId => {
        dispatch({
            type: types.TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    // gregar una tarea al proyeo seleccionado
    const agregarTarea = tarea => {
        tarea.id= uuid();
        dispatch({
            type: types.AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Validar y muestra un error en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: types.VALIDAR_TAREA
        })
    }

    // eliminar tarea del proyecto por su id
    const eliminarTarea = tareaId => {
        dispatch({
            type: types.ELIMINAR_TAREA,
            payload: tareaId
        })
    }
    
    // Cambia el estado de tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: types.ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: types.TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: types.ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    // Elimina una tarea
    const limpiarTarea = tarea => {
        dispatch({
            type: types.LIMPIAR_TAREA
        })
    }


    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
                
            }}
        >
            {props.children}
        </TareaContext.Provider>

    )
}

export default TareaState;