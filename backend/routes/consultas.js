const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/consultas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Consultas');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

router.get('/consultas/:codigo', async (req, res) => {
    const { codigo } = req.params;
    try {
      const result = await pool.query('SELECT * FROM Consultas WHERE codigo = $1', [codigo]);
      if (result.rows.length === 0) {
        return res.status(404).send('Codigo no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error de servidor');
    }
  });
  

router.post('/consultas', async (req, res) => {
  const { codigo, fechaconsulta, horaconsulta, medico_tratante, nro_clinica, rut } = req.body;
  try {
    const newConsulta = await pool.query(
      'INSERT INTO Consultas (codigo, fechaconsulta, horaconsulta, medico_tratante, nro_clinica, rut) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [codigo, fechaconsulta, horaconsulta, medico_tratante, nro_clinica, rut]
    );
    res.json(newConsulta.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

router.put('/consultas/:codigo', async (req, res) => {
  const { codigo } = req.params;
  const { fechaconsulta, horaconsulta, medico_tratante, nro_clinica, rut } = req.body;
  try {
    const updateConsulta = await pool.query(
      'UPDATE Consultas SET fechaconsulta = $1, horaconsulta = $2, medico_tratante = $3, nro_clinica = $4, rut = $5 WHERE codigo = $6 RETURNING *',
      [fechaconsulta, horaconsulta, medico_tratante, nro_clinica, rut, codigo]
    );
    if (updateConsulta.rows.length === 0) {
      return res.status(404).send('Consulta no encontrada');
    }
    res.json(updateConsulta.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

router.delete('/consultas/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const deleteConsulta = await pool.query(
      'DELETE FROM Consultas WHERE codigo = $1 RETURNING *',
      [codigo]
    );
    if (deleteConsulta.rowCount === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    res.status(200).json({ message: 'Consulta borrada exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});


module.exports = router;
