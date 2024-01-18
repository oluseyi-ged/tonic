import {createSlice} from '@reduxjs/toolkit';
const initialState = false;
const directSlice = createSlice({
  name: 'direct',
  initialState,
  reducers: {
    setDirect: (state, {payload}) => {
      return payload;
    },
    clearDirect: () => {
      return false;
    },
  },
});

const {reducer, actions} = directSlice;
export const {setDirect, clearDirect} = actions;
export default reducer;
