import {obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30, agregarSuperHeroe, actualizarSuperHeroe, eliminarSuperHeroe, eliminarSuperHeroePorNombre} from '../services/superHeroesServices.mjs'
import {renderizarSuperheroe, renderizarListaSuperheroes} from '../view/responseView.mjs'
import mongoose from 'mongoose'

export async function obtenerSuperHeroePorIdController(req, res) {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                mensaje: 'ID inválido',
                detalle: 'El parámetro id debe ser un ObjectId de MongoDB'
            });
        }
        const superheroe = await obtenerSuperHeroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }

        const superHeroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superHeroeFormateado);
    }catch(error){
        res.status(500).send({mensaje: 'Error al obtener el superhéroe', error: error.message});
    }
}

export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener los superhéroes', error: error.message});
    }
}

export async function buscarSuperHeroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({mensaje: 'No se encontraron superhéroes con el atributo y valor especificados'});
        }
        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al buscar superhéroes', error: error.message});
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req, res) {
    try{
        const superheroes = await obtenerSuperHeroesMayoresDe30();
        if(superheroes.length === 0){
            return res.status(404).send({mensaje: 'No se encontraron superhéroes mayores de 30 años'});
        }
        const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superHeroesFormateados);
    }catch(error){
        res.status(500).send({mensaje: 'Error al obtener superhéroes mayores de 30 años', error: error.message});
    }
}

export async function agregarSuperHeroeController(req, res) {
    try {
        const datos = req.body;
        const creado = await agregarSuperHeroe(datos);
        const respuesta = renderizarSuperheroe(creado);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al agregar el superhéroe', error: error.message});
    }
}

export async function actualizarSuperHeroeController(req, res) {
    try{
        const {id} = req.params;
        const datosActualizados = req.body;
        const actualizado = await actualizarSuperHeroe(id, datosActualizados);
        if(!actualizado){
            return res.status(404).send({mensaje: 'Superhéroe no encontrado para actualizar'});
        }
        const respuesta = renderizarSuperheroe(actualizado);
        res.status(200).json(respuesta);
    }catch(error){
        res.status(500).send({mensaje: 'Error al actualizar el superhéroe', error: error.message});
    }
}

export async function eliminarSuperHeroeController(req, res) {
    try {
        const { id } = req.params;
        const heroeEliminado = await eliminarSuperHeroe(id);
        if (!heroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar' });
        }
        const respuesta = renderizarSuperheroe(heroeEliminado);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export async function eliminarSuperHeroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const heroeEliminado = await eliminarSuperHeroePorNombre(nombre);
        if (!heroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar por nombre' });
        }
        const respuesta = renderizarSuperheroe(heroeEliminado);
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe por nombre', error: error.message });
    }
}