import { leerSuperheroes, agregarSuperheroes } from "./util.mjs";

const archivoOriginal = './superheroes.txt';
const archivosNuevos = './agregarSuperheroes.txt';

//Agregar nuevos superheroes
agregarSuperheroes(archivoOriginal, archivosNuevos);

// Leer y mostrar lista actualizada
const superheroes = leerSuperheroes(archivoOriginal);
console.log(`Superheroes ordenados por nombre: ${superheroes}`);


