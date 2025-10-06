import fs from 'fs';

// Clase Superheroe
class Superheroe {
    constructor(id, nombreSuperheroe, nombreReal, nombreSociedad, edad, planetaOrigen, debilidad, poder, habilidadEspecial, aliado, enemigo) {
        this.id = id;
        this.nombreSuperheroe = nombreSuperheroe;
        this.nombreReal = nombreReal;
        this.nombreSociedad = nombreSociedad;
        this.edad = edad;
        this.planetaOrigen = planetaOrigen;
        this.debilidad = debilidad;
        this.poder = poder;
        this.habilidadEspecial = habilidadEspecial;
        this.aliado = aliado;
        this.enemigo = enemigo;
    }
}

// Funcion leer y ordenar
export function leerSuperheroes(ruta){
    const datos = fs.readFileSync(ruta, 'utf-8');
    const superheroesArray = JSON.parse(datos);

    const superheroes = superheroesArray.map( hero => new Superheroe(hero.id, hero.nombreSuperheroe, hero.nombreReal, hero.nombreSociedad, hero.edad, hero.planetaOrigen, hero.debilidad, hero.poder, hero.habilidadEspecial, hero.aliado, hero.enemigo));

    // Ordenar por nombre
    superheroes.sort((a,b) => a.nombreSuperheroe.localeCompare(b.nombreSuperheroe));

    return superheroes;
}

export function agregarSuperheroes(rutaOriginal, rutaNuevos) {
    const datosOriginales = fs.readFileSync(rutaOriginal, 'utf-8');
    const datosNuevos = fs.readFileSync(rutaNuevos, 'utf-8');

    const superheroesOriginales = JSON.parse(datosOriginales);
    const nuevosSuperheroes = JSON.parse(datosNuevos);

    // Instanciar los nuevos superheroes
    const instanciaNuevos = nuevosSuperheroes.map(hero => new Superheroe(hero.id, hero.nombreSuperheroe, hero.nombreReal, hero.nombreSociedad, hero.edad, hero.planetaOrigen, hero.debilidad, hero.poder, hero.habilidadEspecial, hero.aliado, hero.enemigo));

    // Combinar lista
    const listaActualizada = [...superheroesOriginales, ...instanciaNuevos];

    // Guardar lista
    fs.writeFileSync(rutaOriginal, JSON.stringify(listaActualizada, null, 2), 'utf-8');
    console.log('Superhéroes agregados correctamente.');
}