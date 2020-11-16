import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        // acciones del Reducer
        case types.LOGIN_EXITOSO:
        case types.REGISTRO_EXISTOSO:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case types.OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }

        

        case types.LOGIN_ERROR:
        case types.CERRAR_SESSION:
        case types.REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}