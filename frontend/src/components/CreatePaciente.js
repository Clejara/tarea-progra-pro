
import React, { useState } from 'react';

function CreatePaciente() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    direccion: '',
    telefono: '',
  });

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
      const response = await fetch('http://localhost:5000/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Paciente creado:', result);
      window.location.href = window.location.pathname;
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="rut">RUT:</label>
          <input type="text" id="rut" name="rut" value={formData.rut} onChange={handleChange} required />
        </div>
        <div className="form-input">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-input">
          <label htmlFor="direccion">Direccion:</label>
          <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label htmlFor="telefono">Telefono:</label>
          <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <button className="form-submit" type="submit">Crear Paciente</button>
      </form>
    </div>
  );
}

export default CreatePaciente;
