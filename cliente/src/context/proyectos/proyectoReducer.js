import * as types from '../../types'

export default (state, action) => {
    switch(action.type) {

        case types.FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario : true
            }
        case types.OBTENER_PROYECTOS:
            // console.log(action.payload);
            return {
                ...state,
                proyectos: action.payload
            }
        case types.AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }    
        case types.VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true
            }                 
        case types.PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }  
        case types.ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }  
        case types.PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }              
        default:
            return state;
    }
}