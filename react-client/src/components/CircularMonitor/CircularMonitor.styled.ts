import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CircularMonitorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  gap: theme.spacing(2),
}));

export const CircularMonitorLabel = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-45%, -60%)',
  color: '#000',
});

export const CanvasContainer = styled(Box)({
  position: 'relative',
});
