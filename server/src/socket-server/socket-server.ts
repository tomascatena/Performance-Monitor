import { PerformanceData } from '@/typings/typings';
import { Server as SocketIOServer } from 'socket.io';
import { checkIfMachineInDB } from '@/utils/checkIfMachineInDB';
// import cluster from 'cluster';
import http from 'http';
import serverStore from '@/server-store/server-store';
// import util from 'util';

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.on('connection', (socket) => {
    // console.log('Socket id', socket.id);
    // console.log(`Connected to worker ${cluster?.worker?.id}`);

    socket.on('client-auth', (key) => {
      // console.log(`Client auth key: ${key}`);
      if (key === 'client-key') {
        // console.log('Valid client joined');
        socket.join('clients');
      } else if (key === 'ui-client-key') {
        // console.log('Valid UI client has joined');
        socket.join('ui');
      } else {
        // console.log('Invalid client joined');
        socket.disconnect(true); // terminate the underlying connection
      }
    });

    // A machine has connected to the server.
    // Check to see if new, if so, add it to the list of machines.
    socket.on('init-performance-data', async (performanceData: PerformanceData) => {
      serverStore.setMacAddress(performanceData.macAddress!);

      await checkIfMachineInDB(performanceData);

      // console.log(`Machine ${machine.macAddress} has joined`);
      // console.log(util.inspect(machine, { showHidden: false, depth: null, colors: true }));
    });

    socket.on('performance-data', (performanceData: PerformanceData) => {
      // console.log(`Received performance data from ${serverStore.getMacAddress()}`);

      io.to('ui').emit('performance-data', {
        ...performanceData,
        macAddress: serverStore.getMacAddress(),
      });
    });
  });
};
