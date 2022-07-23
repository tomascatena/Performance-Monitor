import { PerformanceData } from '../../typings/typings';
import CpuMonitor from '../CpuMonitor/CpuMonitor';
import GeneralInfoMonitor from '../GeneralInfoMonitor/GeneralInfoMonitor';
import MemoryMonitor from '../MemoryMonitor/MemoryMonitor';
import React from 'react';

type Props = {
  performanceData: PerformanceData | null;
};

const Widget: React.FC<Props> = () => {
  return (
    <>
      <h2>Widget</h2>

      <CpuMonitor />

      <MemoryMonitor />

      <GeneralInfoMonitor />
    </>
  );
};

export default Widget;
