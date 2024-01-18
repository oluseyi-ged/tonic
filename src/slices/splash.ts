import {createSlice} from '@reduxjs/toolkit';
const initialState = false;
const splashSlice = createSlice({
  name: 'splash',
  initialState,
  reducers: {
    setSplash: (state, {payload}) => {
      return payload;
    },
    clearSplash: () => {
      return false;
    },
  },
});

const {reducer, actions} = splashSlice;
export const {setSplash, clearSplash} = actions;
export default reducer;
