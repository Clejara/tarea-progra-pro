
import React from 'react';
import CreatePaciente from './components/CreatePaciente';
import CreateConsulta from './components/CreateConsulta';
import ViewPacientes from './components/ViewPacientes';
import ViewConsultas from './components/ViewConsultas';
import usePacientesConsultas from './usePacientesConsultas';


function App() {
  const { pacientes, consultas, loading, error, fetchPacientes, fetchConsultas } = usePacientesConsultas();
  const handleDeleteComplete = () => {
    fetchPacientes();
    fetchConsultas();
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido al sistema de administración de Pacientes y Consultas</h1>
      </header>
      <main>
        <CreatePaciente />
        <CreateConsulta />
        <ViewPacientes pacientes={pacientes} onDeleteComplete={handleDeleteComplete} />
        <ViewConsultas consultas={consultas} loading={loading} error={error} onDeleteComplete={handleDeleteComplete}/>
      </main>
    </div>
  );
}

export default App;
