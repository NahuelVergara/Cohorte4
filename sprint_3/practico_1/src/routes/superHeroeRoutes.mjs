import express from 'express';
import {obtenerSuperHeroePorIdController, obtenerTodosLosSuperHeroesController, buscarSuperHeroesPorAtributoController, obtenerSuperHeroesMayoresDe30Controller, agregarSuperHeroeController, actualizarSuperHeroeController, eliminarSuperHeroeController, eliminarSuperHeroePorNombreController} from '../controllers/superHeroesController.mjs';

export const router = express.Router();

router.get('/mayores-30', obtenerSuperHeroesMayoresDe30Controller);
router.post('/agregar', agregarSuperHeroeController);
router.get('/buscar/:atributo/:valor', buscarSuperHeroesPorAtributoController);
router.get('/:id', obtenerSuperHeroePorIdController);
router.get('', obtenerTodosLosSuperHeroesController);
router.put('/actualizar/:id', actualizarSuperHeroeController);
router.delete('/eliminar/:id', eliminarSuperHeroeController);
router.delete('/eliminar/nombre/:nombre', eliminarSuperHeroePorNombreController);




// export default router;

