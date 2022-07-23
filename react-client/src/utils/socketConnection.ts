import { Socket, io } from 'socket.io-client';
import { store } from '../app/store';
import { PerformanceData } from '../typings/typings';
import { performanceDataActions } from '../features/performanceData/performanceDataSlice';

let socket: Socket;

export const connectWithSocketServer = () => {
  socket = io('http://127.0.0.1:8181');

  socket.on('connect', () => {
    console.log('Connecting to socket server...');
    console.log('Socket id', socket.id);

    socket.emit('client-auth', 'ui-client-key');
  });

  socket.on('performance-data', (data: PerformanceData) => {
    console.log(`Received performance data from ${data.macAddress}`);

    store.dispatch(performanceDataActions.setPerformanceData(data));
  });
};
