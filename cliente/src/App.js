import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos'
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import tokenAuth from './config/token';


// Revisar si tenemos token
const token = localStorage.getItem('token');

if(token){ tokenAuth(token); }

function App() {
  return (
    <AlertaState>
   
      <TareaState>
        <ProyectoState>
          <AuthState>
            <Router>
              <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                  <Route exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </ProyectoState>

      </TareaState>
    </AlertaState>
  );
}

export default App;
