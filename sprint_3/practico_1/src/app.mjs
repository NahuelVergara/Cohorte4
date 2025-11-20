import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {connectDB} from './config/dbConfig.mjs';
import {router} from './routes/superHeroeRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
// Middleware para formularios (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// conexion MongoDB
connectDB();

// Motor de vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
// Rutas
app.use('/heroes', router);

// Manejo de error rutas no definidas
app.use((req, res) => {
    res.status(404).send({mensaje: 'Ruta no encontrada'});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/heroes`);
});

