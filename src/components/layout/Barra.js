import React, { useContext,useEffect  } from 'react'
import AuthContext from '../../context/autenticacion/authContext'


const Barra = () => {

    
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario, cerrarSesion  } = authContext;   

    useEffect(() => {
        usuarioAutenticado();
    }, []);



    return (
        <header className='app-header'>
            {usuario &&
                <p className='nombre-usuario'>Hola <span>{ usuario.nombre }</span></p>
            }
            
            <nav className='nav-principal'>
                <button
                    className="btn btn-blank cerrar-session"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
}

export default Barra;