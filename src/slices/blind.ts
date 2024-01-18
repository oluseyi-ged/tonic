import {createSlice} from '@reduxjs/toolkit';
const initialState = false;
const blindSlice = createSlice({
  name: 'blind',
  initialState,
  reducers: {
    setBlind: (state, {payload}) => {
      return payload;
    },
    clearBlind: () => {
      return false;
    },
  },
});

const {reducer, actions} = blindSlice;
export const {setBlind, clearBlind} = actions;
export default reducer;
