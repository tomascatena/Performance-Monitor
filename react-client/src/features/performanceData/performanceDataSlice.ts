import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PerformanceData } from '../../typings/typings';

export interface PerformanceDataState {
  performanceData: { [key: string]: PerformanceData | null };
}

const initialState: PerformanceDataState = {
  performanceData: {},
};

export const performanceData = createSlice({
  name: 'performanceData',
  initialState,
  reducers: {
    setPerformanceData: (state, action: PayloadAction<PerformanceData>) => {
      state.performanceData[action.payload.macAddress!] = action.payload;
    },
  },
});

export const performanceDataActions = performanceData.actions;

export default performanceData.reducer;
