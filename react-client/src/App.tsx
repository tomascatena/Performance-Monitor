import { connectWithSocketServer } from './utils/socketConnection';
import { useAppSelector } from './app/hooks';
import React from 'react';

const App = () => {
  React.useEffect(() => {
    connectWithSocketServer();
  }, []);

  const { performanceData } = useAppSelector(state => state.performanceData);

  console.log(performanceData);

  return (
    <div>
      <h1>Performance Data</h1>
    </div>
  );
};

export default App;
