import { PerformanceData } from '../typings/typings';
import { Socket, io } from 'socket.io-client';
import { performanceDataActions } from '../features/performanceData/performanceDataSlice';
import { store } from '../app/store';

let socket: Socket;

export const connectWithSocketServer = () => {
  socket = io('http://127.0.0.1:8181');

  socket.on('connect', () => {
    socket.emit('client-auth', 'ui-client-key');
  });

  socket.on('performance-data', (data: PerformanceData) => {
    store.dispatch(performanceDataActions.setPerformanceData(data));
  });
};
