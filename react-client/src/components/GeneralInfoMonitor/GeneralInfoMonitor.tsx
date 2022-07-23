import { ListItemSubtitle, ListItemTitle, StyledBox, StyledList, StyledListItem } from './GeneralMonitor.styled';
import { PerformanceData } from '../../typings/typings';
import React from 'react';

type Props = {
  performanceData: PerformanceData;
};

const GeneralInfoMonitor: React.FC<Props> = ({ performanceData }) => {
  return (
    <StyledBox>
      <StyledList>
        <StyledListItem>
          <ListItemTitle>
            Operating System
          </ListItemTitle>

          <ListItemSubtitle>
            Type: {performanceData.osType}
          </ListItemSubtitle>
        </StyledListItem>

        <StyledListItem>
          <ListItemTitle>
            Time Online
          </ListItemTitle>

          <ListItemSubtitle>
            {(performanceData.uptime / 60).toFixed(0)} minutes
          </ListItemSubtitle>
        </StyledListItem>

        <StyledListItem>
          <ListItemTitle>
            Processor Information
          </ListItemTitle>

          <ListItemSubtitle>
            Type: {performanceData.cpuModel}
          </ListItemSubtitle>

          <ListItemSubtitle>
            Number of Cores: {performanceData.numberOfCores}
          </ListItemSubtitle>

          <ListItemSubtitle>
            Clock speed: {performanceData.cpuSpeed} MHz
          </ListItemSubtitle>
        </StyledListItem>
      </StyledList>
    </StyledBox>
  );
};

export default GeneralInfoMonitor;
