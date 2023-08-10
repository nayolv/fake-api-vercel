// // See https://github.com/typicode/json-server#module
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     // '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server

// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const middlewares = jsonServer.defaults();

// const fs = require('fs');
// const db = JSON.parse(fs.readFileSync('db.json'));

// server.use(middlewares);
// // Agrega esto antes de server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     // '/blog/:resource/:id/show': '/:resource/:id'
// }));
// server.use(jsonServer.router(db)); // Usar el objeto db en lugar del archivo 'db.json'
// server.listen(3000, () => {
//     console.log('JSON Server is running');
// });

// // Exportar la API del servidor
// module.exports = server;
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router('db.json'); // Usar el archivo db.json como base de datos

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware para guardar los cambios en el archivo db.json
server.use(async (req, res, next) => {
  await next(); // Deja que el enrutador maneje la solicitud primero
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
    // Realiza la escritura en el archivo db.json después de que se hayan manejado las operaciones
    await router.db.write();
  }
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
