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
        // const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        // res.status(200).json(superHeroesFormateados);
        res.status(200).render('dashboard', { superheroes });
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
        // const superHeroesFormateados = renderizarListaSuperheroes(superheroes);
        // res.status(200).json(superHeroesFormateados);
        res.status(200).render('mayores30', { superheroes });
    }catch(error){
        res.status(500).send({mensaje: 'Error al obtener superhéroes mayores de 30 años', error: error.message});
    }
}

export async function agregarSuperHeroeController(req, res) {
    try {
        const datos = req.body;

        const normalizarLista = (v) => {
            if (Array.isArray(v)) return v;
            if (typeof v === 'string' && v.length > 0) return v.split(',').map(s => s.trim()).filter(Boolean);
            return [];
        };

        const valores = {
            nombreSuperHeroe: datos.nombreSuperHeroe?.trim(),
            nombreReal: datos.nombreReal?.trim(),
            edad: Number(datos.edad),
            planetaOrigen: datos.planetaOrigen?.trim(),
            debilidad: datos.debilidad?.trim(),
            poderes: Array.isArray(datos.poderes) ? datos.poderes : normalizarLista(datos.poderes),
            aliados: normalizarLista(datos.aliados),
            enemigos: normalizarLista(datos.enemigos),
        };

        const creado = await agregarSuperHeroe({
            nombreSuperHeroe: valores.nombreSuperHeroe,
            nombreReal: valores.nombreReal,
            edad: valores.edad,
            planetaOrigen: valores.planetaOrigen,
            debilidad: valores.debilidad,
            poderes: valores.poderes,
            aliados: valores.aliados,
            enemigos: valores.enemigos,
        });

        if (datos.fromForm) {
            return res.redirect('/heroes');
        }
        console.log('[POST] Superhéroe creado', { id: creado?._id, nombre: creado?.nombreSuperHeroe });
        const respuesta = renderizarSuperheroe(creado);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('[POST] Error al agregar el superhéroe', { error: error.message });
        res.status(500).send({mensaje: 'Error al agregar el superhéroe', error: error.message});
    }
}

// export async function actualizarSuperHeroeController(req, res) {
//     try{
//         const {id} = req.params;
//         const datosActualizados = req.body;
//         const actualizado = await actualizarSuperHeroe(id, datosActualizados);
//         if(!actualizado){
//             return res.status(404).send({mensaje: 'Superhéroe no encontrado para actualizar'});
//         }
//         const respuesta = renderizarSuperheroe(actualizado);
//         res.status(200).json(respuesta);
//     }catch(error){
//         res.status(500).send({mensaje: 'Error al actualizar el superhéroe', error: error.message});
//     }
// }

export async function eliminarSuperHeroeController(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                mensaje: 'ID inválido',
                detalle: 'El parámetro id debe ser un ObjectId de MongoDB'
            });
        }
        const heroeEliminado = await eliminarSuperHeroe(id);
        if (!heroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para eliminar' });
        }
        console.log('[DELETE] Superhéroe eliminado', { id, nombre: heroeEliminado?.nombreSuperHeroe });
        const respuesta = renderizarSuperheroe(heroeEliminado);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('[DELETE] Error al eliminar el superhéroe', { error: error.message });
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

export async function mostrarFormularioAgregarController(req, res) {
    res.render('addSuperHero', { errors: [], values: {} });
}

export async function mostrarFormularioEditarController(req, res) {
    try {
        const { id } = req.params;
        const hero = await obtenerSuperHeroePorId(id);
        if (!hero) {
            return res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }
        res.render('editSuperHero', { hero });
    } catch (error) {
        res.status(500).send({mensaje: 'Error al mostrar formulario de edición', error: error.message});
    }
}

export async function editarSuperHeroeController(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;
        const actualizado = await actualizarSuperHeroe(id, datos);
        if (!actualizado) {
            return res.status(404).send({mensaje: 'Superhéroe no encontrado para editar'});
        }
        if (datos.fromForm) {
            return res.redirect('/heroes');
        }
        console.log('[PUT] Superhéroe editado', { id, nombre: actualizado?.nombreSuperHeroe });
        const respuesta = renderizarSuperheroe(actualizado);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('[PUT] Error al editar el superhéroe', { error: error.message });
        res.status(500).send({mensaje: 'Error al editar el superhéroe', error: error.message});
    }
}
