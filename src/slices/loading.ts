import {createSlice} from '@reduxjs/toolkit';
const initialState = false;
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      return payload;
    },
    clearLoading: () => {
      return false;
    },
  },
});

const {reducer, actions} = loadingSlice;
export const {setLoading, clearLoading} = actions;
export default reducer;
