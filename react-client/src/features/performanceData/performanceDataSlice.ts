import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PerformanceData } from '../../typings/typings';

export interface PerformanceDataState {
  performanceData: PerformanceData | null;
}

const initialState: PerformanceDataState = {
  performanceData: null,
};

export const performanceData = createSlice({
  name: 'performanceData',
  initialState,
  reducers: {
    setPerformanceData: (state, action: PayloadAction<PerformanceData>) => {
      state.performanceData = action.payload;
    },
  },
});

export const performanceDataActions = performanceData.actions;

export default performanceData.reducer;
