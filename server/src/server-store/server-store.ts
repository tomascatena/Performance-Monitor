import { Server } from 'socket.io';
import { Worker } from 'cluster';

let io: Server;
const workers: Worker[] = [];
let macAddress: string;

const setSocketServerInstance = (server: Server) => {
  io = server;
};

const getSocketServerInstance = () => {
  return io;
};

const setWorker = (worker: Worker, index: number) => {
  workers[index] = worker;
};

const getWorkers = () => {
  return workers;
};

const setMacAddress = (address: string) => {
  macAddress = address;
};

const getMacAddress = () => {
  return macAddress;
};

export default {
  setSocketServerInstance,
  getSocketServerInstance,
  setWorker,
  getWorkers,
  setMacAddress,
  getMacAddress,
};
