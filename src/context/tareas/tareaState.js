import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'
import * as types from '../../types'


const TareaState = props => {


    const initialState = {
        tareas: [
            { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            { nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            { nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            { nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            { nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            { nombre: 'Elegir Colores', estado: false, proyectoId: 3},
            { nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            { nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 2},
        ],
        tareasproyecto:null
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

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto : state.tareasproyecto,
                obtenerTareas
                
            }}
        >
            {props.children}
        </TareaContext.Provider>

    )
}

export default TareaState;