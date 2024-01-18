import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  existing: <any>{},
};
const existingSlice = createSlice({
  name: 'existing',
  initialState,
  reducers: {
    setExisting: (state, action) => {
      return {...state, existing: action.payload};
    },
    clearExisting: () => {
      return {existing: {}};
    },
  },
});

const {reducer, actions} = existingSlice;
export const {setExisting, clearExisting} = actions;
export default reducer;
