export type PerformanceData = {
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
