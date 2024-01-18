import {createSlice} from '@reduxjs/toolkit';
const initialState = null;
const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrack: (state, {payload}) => {
      return payload;
    },
    clearTrack: () => {
      return null;
    },
  },
});

const {reducer, actions} = trackSlice;
export const {setTrack, clearTrack} = actions;
export default reducer;
