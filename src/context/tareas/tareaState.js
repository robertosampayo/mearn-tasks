import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'
import * as types from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = props => {


    const initialState = {

        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // Funciones

    const obtenerTareas = async proyecto => {

        try {

            const resultado = await clienteAxios.get('/api/tareas',{params: {proyecto}});
            dispatch({
                type: types.TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })



        } catch (error) {
            console.log(error);

        }



    }

    // gregar una tarea al proyeo seleccionado
    const agregarTarea = async tarea => {

        try {

            await  clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: types.AGREGAR_TAREA, 
                payload: tarea
            })



        } catch (error) {
            console.log(error);

        }
    }

    // Validar y muestra un error en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: types.VALIDAR_TAREA
        })
    }

    // eliminar tarea del proyecto por su id
    const eliminarTarea = async (id, proyecto) => {

        try {

            await  clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
            dispatch({
                type: types.ELIMINAR_TAREA, 
                payload: id
            })



        } catch (error) {
            console.log(error);

        }
    }
    
    // Edita o modifica una tarea
    const actualizarTarea = async tarea => {
       
        try {

            const resultado = await  clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);


            dispatch({
                type: types.ACTUALIZAR_TAREA, 
                payload: resultado.data.tarea
            })



        } catch (error) {
            console.log(error);

        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: types.TAREA_ACTUAL,
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
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
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