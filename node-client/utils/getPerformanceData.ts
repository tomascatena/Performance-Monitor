import { getCpuLoad } from './getCpuLoad';
import os from 'os';

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
};

export const getPerformanceData = (): Promise<PerformanceData> => {
  return new Promise(async (resolve) => {
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
