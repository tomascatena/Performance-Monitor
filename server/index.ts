/**
 * See https://github.com/elad/node-cluster-socket.io
 */

import { app } from './app';
import { connectDB } from '@/utils/connectDB';
import { connectRedisAdapter } from '@/utils/connectRedisAdapter';
import { netServer } from '@/net-server/net-server';
import { registerSocketServer } from '@/socket-server/socket-server';
import { spawnWorkers } from '@/utils/spawnWorkers';
import cluster from 'cluster';
import net from 'net';

const PORT = 8181;

if (cluster.isPrimary) {
  spawnWorkers();

  netServer.listen(PORT);

  console.log(`Master listening on port ${PORT}`);
} else {
  const expressServer = app.listen(0, 'localhost');

  connectDB();

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
