import { PerformanceData } from '../../typings/typings';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const CpuMonitor: React.FC<Props> = () => {
  return (
    <div>CpuMonitor</div>
  );
};

export default CpuMonitor;
