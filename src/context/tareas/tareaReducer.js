import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        case types.TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }
        case types.AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [ action.payload, ...state.tareasproyecto ]
            }
        case types.VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }
        case types.ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case types.ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload :tarea),
                // tareaseleccionada:null
            }
        case types.TAREA_ACTUAL:
            return {
                ...state, tareaseleccionada: action.payload
            }      
        case types.LIMPIAR_TAREA:
            return {
                ...state, tareaseleccionada: null
            }          
       
        default:
            return state;
    }
}