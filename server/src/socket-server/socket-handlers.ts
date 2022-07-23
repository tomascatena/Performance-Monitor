import { Server, Socket } from 'socket.io';
import serverStore from '@/server-store/server-store';
import Machine from '@/models/Machine';

type PerformanceData = {
  osType: string;
  uptime: number;
  freeMemory: number;
  totalMemory: number;
  usedMemory: number;
  memoryUsage: number;
  numberOfCores: number;
  cpuModel: string;
  cpuSpeed: number;
  cpuLoad: number;
  macAddress?: string;
};

const checkIfMachineInDB = async (performanceData: PerformanceData) => {
  try {
    const machine = await Machine.findOne({ macAddress: serverStore.getMacAddress() });

    if (!machine) {
      const newMachine = new Machine({
        ...performanceData,
        macAddress: serverStore.getMacAddress(),
      });

      await newMachine.save();

      return newMachine;
    }

    return machine;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const socketMain = (io: Server, socket: Socket) => {
  console.log('Someone connected', socket.id);

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

    console.log('Machine connected', machine);

    // console.log('init-performance-data', data);
  });

  socket.on('performance-data', (data: PerformanceData) => {
    // console.log('Received performance data', data);
  });
};
