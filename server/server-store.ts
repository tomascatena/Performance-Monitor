import { Worker } from 'cluster';
import { Server } from 'socket.io';

let io: Server;
let workers: Worker[] = [];

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

export default {
  setSocketServerInstance,
  getSocketServerInstance,
  setWorker,
  getWorkers,
};
