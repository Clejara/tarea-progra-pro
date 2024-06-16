import React, { useState } from 'react';
import EditConsulta from './EditConsulta';
import RemoveConsulta from './RemoveConsulta';

function ViewConsultas({ consultas, loading, error, onDeleteComplete}) {
  const [editing, setEditing] = useState(null);


  const handleEdit = (codigo) => {
    setEditing(codigo);
  };

  const handleEditComplete = () => {
    setEditing(null);
    onDeleteComplete();
  };

  const handleDeleteComplete = () => {
    onDeleteComplete();
 };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Consultas</h2>
      {editing ? (
        <EditConsulta codigo={editing} onEdit={handleEditComplete} />
      ) : (
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.codigo}>
              <strong>Codigo:</strong> {consulta.codigo} <br />
              <strong>Fecha Consulta:</strong> {consulta.fechaconsulta} <br />
              <strong>Hora Consulta:</strong> {consulta.horaconsulta} <br />
              <strong>Medico Tratante:</strong> {consulta.medico_tratante} <br />
              <strong>Numero de clinica:</strong> {consulta.nro_clinica} <br />
              <strong>Rut Paciente:</strong> {consulta.rut} <br />
              <button onClick={() => handleEdit(consulta.codigo)}>Editar</button>
              <RemoveConsulta codigo={consulta.codigo} onDeleteComplete={handleDeleteComplete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewConsultas;
