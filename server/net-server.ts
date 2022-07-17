import net from 'net';
import serverStore from './server-store';
import farmhash from 'farmhash';
import os from 'os';

const numThreads = os.cpus().length;

const workerIndex = (ip: string, len: number) => {
  return farmhash.fingerprint32(ip) % len;
};

export const netServer = net.createServer({ pauseOnConnect: true }, (connection) => {
  const ip = connection.remoteAddress;

  if (ip) {
    console.log(`${ip} connected`);

    const worker = serverStore.getWorkers()[workerIndex(ip, numThreads)];

    worker.send('sticky-session:connection', connection);
  }
});
