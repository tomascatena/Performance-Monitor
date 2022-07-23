import { PerformanceData } from '../../typings/typings';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const MemoryMonitor: React.FC<Props> = () => {
  return (
    <div>MemoryMonitor</div>
  );
};

export default MemoryMonitor;
