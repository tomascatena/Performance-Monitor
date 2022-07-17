/**
 * See https://github.com/elad/node-cluster-socket.io
 */

import cluster from 'cluster';
import net from 'net';
import { app } from './app';
import { registerSocketServer } from './socket-server';
import { netServer } from './net-server';
import { spawnWorkers } from './utils/spawnWorkers';
import { connectRedisAdapter } from './utils/connectRedisAdapter';

const PORT = 8181;

if (cluster.isPrimary) {
  spawnWorkers();

  netServer.listen(PORT);

  console.log(`Master listening on port ${PORT}`);
} else {
  const expressServer = app.listen(0, 'localhost');

  registerSocketServer(expressServer);

  connectRedisAdapter();

  process.on('message', (message: string, connection: net.Socket) => {
    if (message !== 'sticky-session:connection') {
      return;
    }

    expressServer.emit('connection', connection);

    connection.resume();
  });
}
