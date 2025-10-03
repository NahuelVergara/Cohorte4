import express from 'express';
import { obtenerSuperheroesPorIdController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller } from './controllers/superheroesController.mjs';

const app = express();
const PORT = 3005;

// Rutas
app.get('/superheroes/id/:id', obtenerSuperheroesPorIdController);
app.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);
app.get('/superheroes/edad/mayorA30', obtenerSuperheroesMayoresDe30Controller);

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})