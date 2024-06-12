
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pacientesRouter = require('./routes/pacientes');
const consultasRouter = require('./routes/consultas');

app.use(cors());
app.use(express.json());
app.use('/api', pacientesRouter);
app.use('/api', consultasRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
