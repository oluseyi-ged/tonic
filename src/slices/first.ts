import {createSlice} from '@reduxjs/toolkit';
const initialState = true;
const firstSlice = createSlice({
  name: 'first',
  initialState,
  reducers: {
    setFirst: (state, {payload}) => {
      return payload;
    },
    clearFirst: () => {
      return false;
    },
  },
});

const {reducer, actions} = firstSlice;
export const {setFirst, clearFirst} = actions;
export default reducer;
