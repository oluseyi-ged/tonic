import {createSlice} from '@reduxjs/toolkit';
const initialState: boolean = false;
const pinnedSlice = createSlice({
  name: 'pinned',
  initialState,
  reducers: {
    setPinned: (state, {payload}) => {
      return payload;
    },
    clearPinned: () => {
      return false;
    },
  },
});

const {reducer, actions} = pinnedSlice;
export const {setPinned, clearPinned} = actions;
export default reducer;
