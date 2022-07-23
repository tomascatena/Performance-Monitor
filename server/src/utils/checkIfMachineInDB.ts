import { PerformanceData } from '@/typings/typings';
import Machine from '@/models/Machine';
import serverStore from '@/server-store/server-store';

export const checkIfMachineInDB = async (performanceData: PerformanceData) => {
  try {
    const machine = await Machine.findOne({
      macAddress: serverStore.getMacAddress(),
    });

    if (!machine) {
      const newMachine = new Machine({
        ...performanceData,
        macAddress: serverStore.getMacAddress(),
      });

      await newMachine.save();

      return newMachine;
    }

    return machine;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
