import React, { useReducer } from 'react'
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer'
import * as types from '../../types'
import { uuid } from 'uuidv4'


const AlertaState = props => {

    const alerta = null
    const initialState = {
        alertas: [],

    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertaReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: types.MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        // Despues de 5 segundos desaparece la alerta
        setTimeout(() => {
            dispatch({
                type: types.OCULTAR_ALERTA
            })
        }, 4000);
    }


    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,

                mostrarAlerta,

                
            }}
        >
            {props.children}
        </alertaContext.Provider>

    )
}

export default AlertaState;