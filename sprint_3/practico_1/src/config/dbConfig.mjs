import mongoose from 'mongoose';

export async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://Grupo-18:grupo18@cursadanodejs.ls9ii.mongodb.net/Node-js')
        console.log('Conexion exitosa a MongoDB')

    }catch(error){
        console.error('Error de conexion a MongoDB', error);
        process.exit(1);
    }
}