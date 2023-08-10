const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.json(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    // return res.json(req.body);
  }
  // Continue to JSON Server router
  next()
});

server.post('/orders', (req, res, next) => {
    router.db.get('orders').push(req.body).write();
    const responseObj = {
        message: "Order created successfully",
        name: req.body.name
      };
      res.json(responseObj);
  });

server.use(jsonServer.rewriter({
    '/*': '/$1',
  }))

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})