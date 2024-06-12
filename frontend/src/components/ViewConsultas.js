import React, { useState, useEffect } from 'react';
import EditConsulta from './EditConsulta';

function ViewConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchConsultas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/consultas');
      if (!response.ok) {
        throw new Error('Error de servidor');
      }
      const data = await response.json();
      console.log(data); 
      setConsultas(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const handleEdit = (codigo) => {
    setEditing(codigo);
  };

  const handleEditComplete = () => {
    setEditing(null);
    fetchConsultas();
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewConsultas;
