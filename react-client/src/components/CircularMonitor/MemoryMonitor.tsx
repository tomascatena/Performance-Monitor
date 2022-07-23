import { Box, Typography } from '@mui/material';
import { CanvasContainer, CircularMonitorContainer, CircularMonitorLabel } from './CircularMonitor.styled';
import { PerformanceData } from '../../typings/typings';
import React from 'react';
import drawCircle from '../../utils/canvasLoadAnimation';

type Props = {
  performanceData: PerformanceData;
};

const MemoryMonitor: React.FC<Props> = ({ performanceData }) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  const formattedMemory = (byte: number) => {
    return `${(byte / 1024 / 1024 / 1024).toFixed(2)} GB`;
  };

  React.useEffect(() => {
    if (canvas.current) {
      drawCircle(canvas.current, performanceData.memoryUsage);
    }
  }, [canvas, performanceData]);

  return (
    <CircularMonitorContainer>
      <Typography variant='h5'>
        Memory Usage
      </Typography>

      <CanvasContainer>
        <CircularMonitorLabel>
          {performanceData.memoryUsage}%
        </CircularMonitorLabel>

        <canvas
          ref={canvas}
          height={200}
          width={200}
        />
      </CanvasContainer>

      <Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'light',
          }}
        >
          Total memory: {formattedMemory(performanceData.totalMemory)}
        </Typography>

        <Typography
          variant='h6'
          sx={{
            fontWeight: 'light',
          }}
        >
          Free memory: {formattedMemory(performanceData.freeMemory)}
        </Typography>
      </Box>
    </CircularMonitorContainer>
  );
};

export default MemoryMonitor;
