import { Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { connectWithSocketServer } from './socketConnection/socketConnection';
import { useAppSelector } from './app/hooks';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Widget from './components/Widget/Widget';
import darkTheme from './themes/darkTheme';

const App = () => {
  React.useEffect(() => {
    connectWithSocketServer();
  }, []);

  const { performanceData } = useAppSelector(state => state.performanceData);

  const connectedMachines = Object.keys(performanceData).length;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container>
        <Typography
          fontWeight='fontWeightNormal'
          textAlign='center'
          sx={{
            margin: '1rem 0',
            fontSize: '2.5rem',
          }}
        >
          Performance Data - {connectedMachines} Machine{connectedMachines > 1 ? 's' : ''}
        </Typography>

        {
          Object.entries(performanceData)?.map(([macAddress, perfData]) => (
            <Widget
              key={macAddress}
              performanceData={perfData}
            />
          ))
        }
      </Container>
    </ThemeProvider>

  );
};

export default App;
