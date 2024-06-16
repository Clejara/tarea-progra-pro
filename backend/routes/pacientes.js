const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/pacientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Pacientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/pacientes/:rut', async (req, res) => {
    const { rut } = req.params;
    try {
      const result = await pool.query('SELECT * FROM Pacientes WHERE rut = $1', [rut]);
      if (result.rows.length === 0) {
        return res.status(404).send('Paciente no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error de servidor');
    }
  });
  

router.post('/pacientes', async (req, res) => {
  const { rut, nombre, direccion, telefono } = req.body;
  try {
    const newPaciente = await pool.query(
      'INSERT INTO Pacientes (rut, nombre, direccion, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [rut, nombre, direccion, telefono]
    );
    res.json(newPaciente.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

router.put('/pacientes/:rut', async (req, res) => {
  const { rut } = req.params;
  const { nombre, direccion, telefono } = req.body;
  try {
    const updatePaciente = await pool.query(
      'UPDATE Pacientes SET nombre = $1, direccion = $2, telefono = $3 WHERE rut = $4 RETURNING *',
      [nombre, direccion, telefono, rut]
    );
    if (updatePaciente.rows.length === 0) {
      return res.status(404).send('Paciente no encontrado');
    }
    res.json(updatePaciente.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});


router.delete('/pacientes/:rut', async (req, res) => {
  const { rut } = req.params;
  try {
    const deletePaciente = await pool.query(
      'DELETE FROM Pacientes WHERE rut = $1 RETURNING *',
      [rut]
    );
    if (deletePaciente.rowCount === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente borrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

module.exports = router;
