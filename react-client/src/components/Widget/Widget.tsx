import { PerformanceData } from '../../typings/typings';
import { Typography } from '@mui/material';
import CpuMonitor from '../CpuMonitor/CpuMonitor';
import GeneralInfoMonitor from '../GeneralInfoMonitor/GeneralInfoMonitor';
import MemoryMonitor from '../MemoryMonitor/MemoryMonitor';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const Widget: React.FC<Props> = ({ performanceData }) => {
  console.log(performanceData);
  return (
    <>
      <Typography>Widget</Typography>

      <CpuMonitor performanceData={performanceData} />

      <MemoryMonitor performanceData={performanceData} />

      <GeneralInfoMonitor performanceData={performanceData} />
    </>
  );
};

export default Widget;
