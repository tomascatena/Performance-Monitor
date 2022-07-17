import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import serverStore from './server-store';
import { socketMain } from './socket-handlers';

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  serverStore.setSocketServerInstance(io);

  io.on('connection', (socket) => {
    socketMain(io, socket);
  });
};
