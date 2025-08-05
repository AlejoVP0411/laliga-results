const express = require('express');
const cors = require('cors');
const matchRoutes = require('./routes/matchRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/logos', express.static('../public/logos'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
