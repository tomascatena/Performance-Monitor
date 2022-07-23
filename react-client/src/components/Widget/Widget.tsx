import CpuMonitor from '../CpuMonitor/CpuMonitor';
import GeneralInfoMonitor from '../GeneralInfoMonitor/GeneralInfoMonitor';
import MemoryMonitor from '../MemoryMonitor/MemoryMonitor';
import React from 'react';

type Props = {};

const Widget: React.FC<Props> = () => {
  return (
    <>
      <CpuMonitor />

      <MemoryMonitor />

      <GeneralInfoMonitor />
    </>
  );
};

export default Widget;
