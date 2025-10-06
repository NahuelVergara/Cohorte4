import path, { dirname } from 'path';

// definir ruta
const filePath = './data/example.txt';

// obtener directorio
const dirName = path.dirname(filePath);
console.log('Directorio base:', dirName);

// nombre del archivo sin extensión
const baseName = path.basename(filePath, '.txt');
console.log('Nombre del archivo sin extensión:', baseName);

// extension del archivo
const extName = path.extname(filePath);
console.log('Extensión del archivo:', extName);

// crear ruta
const newPath = path.join('/user', 'docs', 'newFile.txt');
console.log('Nueva ruta: ', newPath);