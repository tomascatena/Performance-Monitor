import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { PerformanceData } from '../../typings/typings';
import CpuMonitor from '../CircularMonitor/CpuMonitor';
import GeneralInfoMonitor from '../GeneralInfoMonitor/GeneralInfoMonitor';
import MemoryMonitor from '../CircularMonitor/MemoryMonitor';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const Widget: React.FC<Props> = ({ performanceData }) => {
  return (
    <Card
      elevation={4}
    >
      <Typography
        textAlign='center'
        fontWeight='light'
        sx={{
          fontSize: '2rem',
          padding: '1rem',
        }}
      >
        Performance data for machine with mac address: {performanceData.macAddress}
      </Typography>

      <Divider variant='middle' />

      <CardContent>
        <Box sx={{ flexGrow: 1, padding: '1rem 0' }}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <CpuMonitor performanceData={performanceData} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <MemoryMonitor performanceData={performanceData} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >
              <GeneralInfoMonitor performanceData={performanceData} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Widget;
