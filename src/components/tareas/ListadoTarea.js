import React from 'react'
import Tarea from './Tarea'

const ListadoTareas = () => {

    const tareasProyecto = [
        { nombre: 'Elegir Plataforma', estado: true},
        { nombre: 'Elegir Colores', estado: false},
        { nombre: 'Elegir Plataforma de pago', estado: false},
        { nombre: 'Elegir Hosting', estado: true},
    ]

    return (
        <>
            <h2>Proyecto: Tienda Virtual</h2>

            <ul className='listado-tareas'>
                {tareasProyecto.length === 0
                    ? (<li className='tarea'><p>No hay tareas</p></li>)

                    : tareasProyecto.map(tarea => (
                        <tarea 
                            tarea={tarea}
                        />
                    ))
                }
            }
            </ul>
        </>
    );
}

export default ListadoTareas;