import mongoose from 'mongoose';

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
        creador: String,
}, {collection: 'Grupo-18'});

superheroSchema.index({ nombreSuperHeroe: 1 });
const superHero = mongoose.model('SuperHero', superheroSchema);
export default superHero;
