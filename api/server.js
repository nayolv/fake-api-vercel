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
