
import React, { useState, useEffect } from 'react';

function EditPaciente({ rut, onEdit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pacientes/${rut}`);
        if (!response.ok) {
          throw new Error('Error de servidor');
        }
        const data = await response.json();
        setFormData({
          nombre: data.nombre,
          direccion: data.direccion,
          telefono: data.telefono,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [rut]);

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
      const response = await fetch(`http://localhost:5000/api/pacientes/${rut}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Paciente actualizado:', result);
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
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Direccion"
        value={formData.direccion}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telefono"
        placeholder="Telefono"
        value={formData.telefono}
        onChange={handleChange}
      />
      <button type="submit">Editar Paciente</button>
    </form>
  );
}

export default EditPaciente;
