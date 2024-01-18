import {createSlice} from '@reduxjs/toolkit';
const initialState: boolean = false;
const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: (state, {payload}) => {
      return payload;
    },
    clearMetrics: () => {
      return false;
    },
  },
});

const {reducer, actions} = metricsSlice;
export const {setMetrics, clearMetrics} = actions;
export default reducer;
