import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        // acciones del Reducer
        case types.MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case types.OCULTAR_ALERTA:
            return {
                alerta: null
            }
        default:
            return state;
    }
}