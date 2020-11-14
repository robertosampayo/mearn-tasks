import React from 'react'
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyecto from '../proyectos/Listado'

const Sidebar = () => {
    return (
        <aside>
            <h1>MEARN<span>Tasks</span></h1>
            <NuevoProyecto />
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyecto />
            </div>
        </aside>
    )
}

export default Sidebar