import {createSlice} from '@reduxjs/toolkit';
const initialState = {};
const fauxSlice = createSlice({
  name: 'faux',
  initialState,
  reducers: {
    setFaux: (state, {payload}) => {
      return payload;
    },
    clearFaux: () => {
      return {};
    },
  },
});

const {reducer, actions} = fauxSlice;
export const {setFaux, clearFaux} = actions;
export default reducer;
