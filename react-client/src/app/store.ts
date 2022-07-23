import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import performanceDataSlice from '../features/performanceData/performanceDataSlice';

export const store = configureStore({
  reducer: {
    performanceData: performanceDataSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable */
