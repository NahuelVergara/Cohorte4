import { EventEmitter } from 'events';

// crear una instancia
const emisor = new EventEmitter();

// definir un evento
emisor.on('Saludo', (nombre) => {
    console.log(`Hola, ${nombre}`);
})

// emitir el evento
emisor.emit('saludo', 'Mundo');