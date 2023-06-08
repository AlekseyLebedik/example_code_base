/* eslint-disable */
const path = require('path');
const jsonServer = require('json-server');

const dbPath = path.join(__dirname, 'db.json');

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ bodyParser: true });

// Rendering adapters
router.render = (req, res) => {
  const { data, query } = res.locals;

  // Format list API
  if (req.method === 'GET' && Array.isArray(data)) {
    const nextPageToken = data.length > 0 ? parseInt(query._page) + 1 : null;

    res.json({
      nextPageToken: nextPageToken,
      q: query.q || '',
      data: data,
    });
  }
};

server.use(middlewares);
server.use(require('./middlewares'));

server.get('/authorize/', require('./routes/authorize'));
server.get('/healthcheck/', require('./routes/healthcheck'));
server.use('/api/v2/', require('./routes/api_v2'));
server.use('/api/v2/titles/3001/envs/cert/', router);

server.listen(5000, () => {
  console.log('API Server is running');
  console.log('URL: http://localhost:5000');
});
