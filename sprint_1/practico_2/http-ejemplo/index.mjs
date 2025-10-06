import http from 'http';

// crear servidor
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola, Mundo');
});

// configurar servidor para el puerto 3000
server.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}/`);
});