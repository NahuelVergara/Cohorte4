import express from 'express';
import {obtenerSuperHeroePorIdController, obtenerTodosLosSuperHeroesController, buscarSuperHeroesPorAtributoController, obtenerSuperHeroesMayoresDe30Controller, agregarSuperHeroeController, eliminarSuperHeroeController, eliminarSuperHeroePorNombreController, mostrarFormularioAgregarController, mostrarFormularioEditarController, editarSuperHeroeController} from '../controllers/superHeroesController.mjs';
import { validateSuperHeroe } from '../../../practico_2/validationRules.mjs'
import { handleValidationErrors } from '../../../practico_2/errorMiddleware.mjs';


export const router = express.Router();

const normalizarPoderes = (req, _res, next) => {
  const v = req.body?.poderes;
  if (typeof v === 'string') {
    req.body.poderes = v.split(',').map(s => s.trim()).filter(Boolean);
  }
  next();
};

router.get('/mayores-30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/agregar', mostrarFormularioAgregarController);
router.post('/agregar', normalizarPoderes, validateSuperHeroe(), handleValidationErrors, agregarSuperHeroeController);
router.get('/:id/editar', mostrarFormularioEditarController);
router.put('/:id/editar', normalizarPoderes, validateSuperHeroe(), handleValidationErrors, editarSuperHeroeController);
router.get('/buscar/:atributo/:valor', buscarSuperHeroesPorAtributoController);
router.get('/:id', obtenerSuperHeroePorIdController);
router.get('', obtenerTodosLosSuperHeroesController);
// router.put('/actualizar/:id', actualizarSuperHeroeController);
router.delete('/eliminar/:id', eliminarSuperHeroeController);
router.delete('/eliminar/nombre/:nombre', eliminarSuperHeroePorNombreController);





// export default router;

