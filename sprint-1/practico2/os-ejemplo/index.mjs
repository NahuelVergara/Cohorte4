import os from 'os';

// arquitectura
console.log('Arquitectura:', os.arch());

// tipo de sistema operativo
console.log('Plataforma:', os.platform());

// cantidad de memoria total
console.log('Memoria total:', os.totalmem());

// cantidad de memoria libre
console.log('Memoria libre:', os.freemem());

// informacion de la CPU
console.log('Informacion de la CPU:', os.cpus());