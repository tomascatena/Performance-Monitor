import { getCpuAverage } from './getCpuAverage';

export const getCpuLoad = (): Promise<number> => {
  return new Promise((resolve) => {
    const start = getCpuAverage();

    setTimeout(() => {
      const end = getCpuAverage();

      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;

      // Percentage of CPU used
      const percentage = Math.floor((1 - idleDiff / totalDiff) * 100);

      resolve(percentage);
    }, 100);
  });
};
