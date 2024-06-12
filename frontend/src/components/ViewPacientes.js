// frontend/src/components/ViewPacientes.js
import React, { useState, useEffect } from 'react';
import EditPaciente from './EditPaciente';

function ViewPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchPacientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pacientes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPacientes(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleEdit = (rut) => {
    setEditing(rut);
  };

  const handleEditComplete = () => {
    setEditing(null);
    fetchPacientes();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewPacientes;
