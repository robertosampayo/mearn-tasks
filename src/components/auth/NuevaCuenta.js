import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'


const NuevaCuenta = (props) => {

    // extraer los valores del context

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {   
        if(autenticado) {
            props.history.push('/proyectos');            
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, props.history, mostrarAlerta])


    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // extraer de usuario
    const { nombre, email, password, confirmar } = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campos vacios
        if( nombre.trim() === '' || 
            email.trim() === ''||
            password.trim() === ''||
            confirmar.trim() === '') {
                mostrarAlerta('Los campos son obligatorios', 'alerta-error');
                return;
        }
        // Password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }
        // Los 2 passwords son iguales
        if (password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;            
        }
        // Pasarlo al action
        registrarUsuario({
            nombre, 
            email,
            password
        });


    }

    return (
        <div className='form-usuario'>
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null

            }
            <div className='contenedor-form sombra-dark'>
                <h1>Obtener Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >


                    <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre</label>
                        <input 
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Tu Nombre'
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            onChange={onChange}
                            value={email}
                        />
                    </div>  

                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input 
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Tu confirmar'
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block'
                        value='Iniciar Sesión' />

                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'> 
                    Volver a Iniciar Sesión
                </Link>
            </div>

        </div>
    )
}

export default NuevaCuenta