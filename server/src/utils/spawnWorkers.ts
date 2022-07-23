import cluster from 'cluster';
import os from 'os';
import serverStore from '@/server-store/server-store';

const numThreads = os.cpus().length;

const spawn = (index: number) => {
  serverStore.setWorker(cluster.fork(), index);

  serverStore.getWorkers()[index].on('exit', (code, signal) => {
    spawn(index);
  });
};

export const spawnWorkers = () => {
  for (let index = 0; index < numThreads; index++) {
    spawn(index);
  }
};
