import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository{
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor){
        return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    async agregarHeroe(data){
        return await SuperHero.create(data);
    }

    async actualizarHeroe(id, data){
        return await SuperHero.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async eliminarHeroe(id){
        return await SuperHero.findByIdAndDelete(id);
    }

    async eliminarHeroePorNombre(nombre){
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }
}

export default new SuperHeroRepository();
