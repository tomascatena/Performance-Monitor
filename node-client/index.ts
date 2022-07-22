/**
 * The node program that captures local performance data and sends it to the socket.io server.
 *
 * Information about needed about the system (from node.js os module):
 * - CPU usage (current and total)
 * - Memory usage (free and total)
 * - OS type and version
 * - Up time
 * - CPU info (type, number of cores, clock speed)
 */

import os from 'os';
import util from 'util';
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

// CPU average
// Get milliseconds in each mode
const cpuAverage = () => {
  let idleMs = 0;
  let totalMs = 0;

  os.cpus().forEach((core) => {
    const { idle, user, nice, sys, irq } = core.times;

    idleMs += idle;
    totalMs += user + nice + sys + irq + idle;
  });

  return {
    idle: idleMs / os.cpus().length,
    total: totalMs / os.cpus().length,

    // Calculate the average
    average: Math.floor((idleMs / totalMs) * 100) / 100,

    // Calculate the percentage
    percentage: Math.floor((idleMs / totalMs) * 100),

    // Calculate the percentage of total time
    percentageOfTotal: Math.floor((idleMs / totalMs) * 100) / 100,
  };
};

const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();

    setTimeout(() => {
      const end = cpuAverage();

      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      // Percentage of CPU used
      const percentage = Math.floor((1 - idleDiff / totalDiff) * 100);

      resolve(percentage);
    }, 100);
  });
};

const performanceData = () => {
  return new Promise(async (resolve, reject) => {
    // System information
    const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
    const uptime = os.uptime();

    // Memory
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = Math.floor((usedMemory / totalMemory) * 100) / 100;

    // CPU
    const numberOfCores = os.cpus().length;
    const cpuInfo = os.cpus()[0];
    const cpuModel = cpuInfo.model;
    const cpuSpeed = cpuInfo.speed;
    const cpuLoad = await getCpuLoad();

    resolve({
      osType,
      uptime,
      freeMemory,
      totalMemory,
      usedMemory,
      memoryUsage,
      numberOfCores,
      cpuModel,
      cpuSpeed,
      cpuLoad,
    });
  });
};

performanceData().then((data) => {
  console.log(util.inspect(data, { depth: null }));
});

console.log(util.inspect(cpuAverage(), { showHidden: false, depth: null, colors: true }));
