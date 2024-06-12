const { Pool } = require('pg');

//Reemplazar sus credenciales y nombre de la BD aqui
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TareaPrograPro',
  password: 'postgres',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Conexion a BD exitosa');
});

module.exports = pool;