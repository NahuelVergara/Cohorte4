import express from 'express';
import {connectDB} from './src/config/dbConfig.mjs';
import {router} from './src/routes/superHeroeRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// conexion MongoDB
connectDB();

// Rutas
app.use('/api', router);

// Manejo de error rutas no definidas
app.use((req, res) => {
    res.status(404).send({mensaje: 'Ruta no encontrada'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

