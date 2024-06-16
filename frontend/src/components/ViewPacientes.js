// frontend/src/components/ViewPacientes.js
import React, { useState } from 'react';
import EditPaciente from './EditPaciente';
import RemovePaciente from './RemovePaciente';

function ViewPacientes({ pacientes, onDeleteComplete }) {
  const [editing, setEditing] = useState(null);

  const handleEdit = (rut) => {
    setEditing(rut);
  };

  const handleEditComplete = () => {
    setEditing(null);
    onDeleteComplete();
  };

  return (
    <div>
      <h2>Pacientes List</h2>
      {editing ? (
        <EditPaciente rut={editing} onEdit={handleEditComplete} />
      ) : (
        <ul>
          {pacientes.map((paciente) => (
            <li key={paciente.rut}>
              <strong>RUT:</strong> {paciente.rut} <br />
              <strong>Nombre:</strong> {paciente.nombre} <br />
              <strong>Direccion:</strong> {paciente.direccion} <br />
              <strong>Telefono:</strong> {paciente.telefono} <br />
              <button onClick={() => handleEdit(paciente.rut)}>Edit</button>
              <RemovePaciente rut={paciente.rut} onDeleteComplete={onDeleteComplete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewPacientes;