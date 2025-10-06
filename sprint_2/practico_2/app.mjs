import mongoose from 'mongoose';

// const mongoose = require('mongoose');
async function connectDB() {
    try{
        mongoose.connect('mongodb+srv://Grupo-18:grupo18@cursadanodejs.ls9ii.mongodb.net/Node-js')
        console.log('Conexion exitosa a MongoDB')

    }catch(error){
        console.error('Error de conexion a MongoDB', error);
    }

    // .then(() => console.log('Conexion exitosa a MongoDB'))
    // .cath(error => console.error('Error de conexion a MongoDB', error));
}
connectDB();

// Definir el esquema y el modelo
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: {type: Date, default: Date.now},
        cerador: String,
}, {collection: 'Grupo-18'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);


// Insertar un superhéroe
async function insertarSuperHeroe() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 18,
        planetaOrigen: 'Tierra',
        debilidad: 'Sensibilidad a la radiacion',
        poderes: ['Fuerza sobrehumana', 'Agilidad', 'Sentido arácnido'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde', 'Doctor Octopus'],
        creador: 'Martin',
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}
insertarSuperHeroe().catch(error => console.error('Error al insertar superhéroe:', error));


// Actualizar un superhéroe
async function updateSuperhero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: {edad: 26}}
    );
    console.log('Superhéroe actualizado:', result);
}
updateSuperhero('Spiderman').catch(error => console.error('Error al actualizar superhéroe:', error));

// Eliminar un superhéroe
async function deleteSuperhero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superhéroe eliminado:', result);
}
deleteSuperhero('Spiderman').catch(error => console.error('Error al eliminar superhéroe:', error));

// Consultar superhéroes
async function findSuperheroes() {
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
}
findSuperheroes().catch(error => console.error('Error al consultar superhéroes:', error));
