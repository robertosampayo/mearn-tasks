import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        case types.TAREAS_PROYECTO:
            return {
                ... state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
            }

        default:
            return state;
    }
}