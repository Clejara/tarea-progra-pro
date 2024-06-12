import React, { useState, useEffect } from 'react';

function EditConsulta({ codigo, onEdit }) {
  const [formData, setFormData] = useState({
    fechaconsulta: '',
    horaconsulta: '',
    medico_tratante: '',
    nro_clinica: '',
    rut: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/consultas/${codigo}`);
        if (!response.ok) {
          throw new Error('Error de servidor');
        }
        const data = await response.json();
        setFormData({
          fechaconsulta: data.fechaconsulta,
          horaconsulta: data.horaconsulta,
          medico_tratante: data.medico_tratante,
          nro_clinica: data.nro_clinica,
          rut: data.rut
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchConsulta();
  }, [codigo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/consultas/${codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Consulta Actualizada:', result);
      onEdit();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fechaconsulta"
        placeholder="fechaconsulta"
        value={formData.fechaconsulta}
        onChange={handleChange}
      />
      <input
        type="text"
        name="horaconsulta"
        placeholder="horaconsulta"
        value={formData.horaconsulta}
        onChange={handleChange}
      />
      <input
        type="text"
        name="medico_tratante"
        placeholder="medico_tratante"
        value={formData.medico_tratante}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nro_clinica"
        placeholder="nro_clinica"
        value={formData.nro_clinica}
        onChange={handleChange}
      />

      <input
        type="text"
        name="rut"
        placeholder="Rut Paciente"
        value={formData.rut}
        onChange={handleChange}
        required
      />
      <button type="submit">Editar Consulta</button>
    </form>
  );
}

export default EditConsulta;
