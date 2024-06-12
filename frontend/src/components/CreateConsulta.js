
import React, { useState } from 'react';

function CreateConsulta() {
  const [formData, setFormData] = useState({
    codigo: '',
    fechaconsulta: '',
    horaconsulta: '',
    medico_tratante: '',
    nro_clinica: '',
    rut: ''
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
      const response = await fetch('http://localhost:5000/api/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Consulta creada:', result);
      window.location.href = window.location.pathname;
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="codigo">Codigo:</label>
          <input type="text" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
        </div>
        <div className="form-input">
          <label htmlFor="fechaconsulta">Fecha consulta:</label>
          <input type="text" id="fechaconsulta" name="fechaconsulta" value={formData.fechaconsulta} onChange={handleChange} required />
        </div>
        <div className="form-input">
          <label htmlFor="horaconsulta">Hora consulta</label>
          <input type="text" id="horaconsulta" name="horaconsulta" value={formData.horaconsulta} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label htmlFor="medico_tratante">Medico tratante:</label>
          <input type="tel" id="medico_tratante" name="medico_tratante" value={formData.medico_tratante} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label htmlFor="nro_clinica">Numero de Clinica:</label>
          <input type="tel" id="nro_clinica" name="nro_clinica" value={formData.nro_clinica} onChange={handleChange} />
        </div>
        <div className="form-input">
          <label htmlFor="rut">Rut Paciente:</label>
          <input type="tel" id="rut" name="rut" value={formData.rut} onChange={handleChange} />
        </div>
        <button className="form-submit" type="submit">Crear Consulta</button>
      </form>
    </div>
  );
}

export default CreateConsulta;
