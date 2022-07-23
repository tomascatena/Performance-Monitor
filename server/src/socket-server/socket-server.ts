import { PerformanceData } from '@/typings/typings';
import { Server as SocketIOServer } from 'socket.io';
import { checkIfMachineInDB } from '@/utils/checkIfMachineInDB';
import cluster from 'cluster';
import http from 'http';
import serverStore from '@/server-store/server-store';
import util from 'util';

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  serverStore.setSocketServerInstance(io);

  io.on('connection', (socket) => {
    console.log(`Connected to worker ${cluster?.worker?.id}`);

    socket.on('client-auth', (key) => {
      if (key === 'pelusa') {
        console.log('Valid client joined');
        socket.join('clients');
      } else if (key === 'pelusa2') {
        console.log('Valid UI client has joined');
        socket.join('ui');
      } else {
        console.log('Invalid client joined');
        socket.disconnect(true); // terminate the underlying connection
      }
    });

    // A machine has connected to the server.
    // Check to see if new, if so, add it to the list of machines.
    socket.on('init-performance-data', async (data: PerformanceData) => {
      serverStore.setMacAddress(data.macAddress!);

      const machine = await checkIfMachineInDB(data);

      console.log(`Machine ${machine.macAddress} has joined`);
      console.log(util.inspect(machine, { showHidden: false, depth: null, colors: true }));
    });

    socket.on('performance-data', (data: PerformanceData) => {
      // console.log('Received performance data', data);
    });
  });
};
