import serverStore from '../server-store';
import cluster, { Worker } from 'cluster';
import os from 'os';

const numThreads = os.cpus().length;

const spawn = (index: number) => {
  serverStore.setWorker(cluster.fork(), index);

  serverStore.getWorkers()[index].on('exit', (code, signal) => {
    spawn(index);
  });
};

export const spawnWorkers = () => {
  for (var index = 0; index < numThreads; index++) {
    spawn(index);
  }
};
