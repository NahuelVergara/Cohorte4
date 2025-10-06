import {obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30} from '../services/superHeroesServices.mjs'
import {renderizarSuperheroe, renderizarListaSuperheroes} from '../view/responseView.mjs'

export async function obtenerSuperHeroePorIdController(req, res) {
    try{
        const {id} = req.params;
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
