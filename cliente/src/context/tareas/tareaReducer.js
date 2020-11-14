import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        case types.TAREAS_PROYECTO:
            return {
                ... state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            }
        case types.AGREGAR_TAREA:
            return {
                ... state,
                tareas: [ action.payload, ...state.tareas ]
            }
        case types.VALIDAR_TAREA:
            return {
                ... state,
                errortarea: true
            }
        case types.ELIMINAR_TAREA:
            return {
                ... state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
            }
        case types.ACTUALIZAR_TAREA:
        case types.ESTADO_TAREA:
            return {
                ... state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload :tarea),
                tareaseleccionada:null
            }
        case types.TAREA_ACTUAL:
            return {
                ... state, tareaseleccionada: action.payload
            }      
        case types.LIMPIAR_TAREA:
            return {
                ... state, tareaseleccionada: null
            }          
       
        default:
            return state;
    }
}