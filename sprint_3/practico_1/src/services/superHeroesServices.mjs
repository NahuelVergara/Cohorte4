import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperHeroePorId(id){
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperHeroes(){
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperHeroesPorAtributo(atributo, valor){
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperHeroesMayoresDe30(){
    return await superHeroRepository.obtenerMayoresDe30();
}
export async function agregarSuperHeroe(data){
    return await superHeroRepository.agregarHeroe(data);
}

export async function actualizarSuperHeroe(id, data){
    return await superHeroRepository.actualizarHeroe(id, data);
}

export async function eliminarSuperHeroe(id){
    return await superHeroRepository.eliminarHeroe(id);
}

export async function eliminarSuperHeroePorNombre(nombre){
    return await superHeroRepository.eliminarHeroePorNombre(nombre);
}
