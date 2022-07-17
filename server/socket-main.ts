import { Server, Socket } from 'socket.io';

export const socketMain = (io: Server, socket: Socket) => {
  console.log('socketMain', socket.id);
};
