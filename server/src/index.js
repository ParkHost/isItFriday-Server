const http = require('http');

const app = require('./app');
const sockets = require('./sockets');

const server = http.createServer(app);
sockets(server);

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
