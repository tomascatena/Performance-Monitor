import os from 'os';

// CPU average
// Get milliseconds in each mode
export const getCpuAverage = () => {
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
