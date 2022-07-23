import React from 'react';
import CpuMonitor from '../CpuMonitor/CpuMonitor';
import GeneralInfoMonitor from '../GeneralInfoMonitor/GeneralInfoMonitor';
import MemoryMonitor from '../MemoryMonitor/MemoryMonitor';

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