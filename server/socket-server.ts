import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import serverStore from './server-store';

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  serverStore.setSocketServerInstance(io);
};
