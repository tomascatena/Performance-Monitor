import { Box, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledListItem = styled(ListItem)(() => ({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
}));

export const ListItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  color: theme.palette.text.primary,
}));

export const ListItemSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  letterSpacing: '0.04rem',
  color: theme.palette.text.primary,
  paddingLeft: '1rem',
  fontWeight: 100,
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
