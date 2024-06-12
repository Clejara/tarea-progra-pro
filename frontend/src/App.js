
import React from 'react';
import CreatePaciente from './components/CreatePaciente';
import ViewPacientes from './components/ViewPacientes';

import CreateConsulta from './components/CreateConsulta';
import ViewConsultas from './components/ViewConsultas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido al sistema de administración de Pacientes y Consultas</h1>
      </header>
      <main>
        <CreatePaciente />
        <ViewPacientes />
        <CreateConsulta />
        <ViewConsultas />
      </main>
    </div>
  );
}

export default App;
