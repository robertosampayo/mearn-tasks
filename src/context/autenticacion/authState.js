import React, { useReducer } from 'react'
import authContext from './authContext';
import authReducer from './authReducer'
import * as types from '../../types'
import { uuid } from 'uuidv4'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true

    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(authReducer, initialState)

    // Serie de funciones 
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);

            dispatch ({
                type: types.REGISTRO_EXISTOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: types.REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: Funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta= await clienteAxios.get('/api/auth');

            dispatch({
                type: types.OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.error(error.response);
            dispatch({
                type: types.LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión 
    const iniciarSesion = async datos => {

        try {
            const respuesta = await clienteAxios.post(`/api/auth`, datos);
            dispatch({
                type: types.LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();

        } catch(error) {
            
            console.log (error);
            const alerta = {
                msg: error.response.data.msg ?? error.response ?? error,
                categoria: 'alerta-error'
            }

            dispatch({
                type: types.LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: types.CERRAR_SESSION
        });
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado ,
                cerrarSesion       
            }}
        >
            {props.children}
        </authContext.Provider>

    )
}

export default AuthState;