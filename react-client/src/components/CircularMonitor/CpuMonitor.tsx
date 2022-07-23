import { CanvasContainer, CircularMonitorContainer, CircularMonitorLabel } from './CircularMonitor.styled';
import { PerformanceData } from '../../typings/typings';
import { Typography } from '@mui/material';
import React from 'react';
import drawCircle from '../../utils/canvasLoadAnimation';

type Props = {
  performanceData: PerformanceData;
};

const CpuMonitor: React.FC<Props> = ({ performanceData }) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvas.current) {
      drawCircle(canvas.current, performanceData.cpuLoad);
    }
  }, [canvas, performanceData]);

  return (
    <CircularMonitorContainer>
      <Typography variant='h5'>
        CPU Load
      </Typography>

      <CanvasContainer>
        <CircularMonitorLabel>
          {performanceData.cpuLoad}%
        </CircularMonitorLabel>

        <canvas
          ref={canvas}
          height={200}
          width={200}
        />
      </CanvasContainer>
    </CircularMonitorContainer>
  );
};

export default CpuMonitor;
