import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { connectWithSocketServer } from './utils/socketConnection';
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box >
        <h1>Performance Data</h1>

        {
          Object.entries(performanceData)?.map(([macAddress, perfData]) => (
            <Widget
              key={macAddress}
              performanceData={perfData}
            />
          ))
        }
      </Box>
    </ThemeProvider>

  );
};

export default App;
