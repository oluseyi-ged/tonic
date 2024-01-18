import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  byAcct: false,
};
const byAcctSlice = createSlice({
  name: 'byAcct',
  initialState,
  reducers: {
    setByAcct: (state, action) => {
      return {...state, byAcct: action.payload};
    },
    clearByAcct: () => {
      return {byAcct: false};
    },
  },
});

const {reducer, actions} = byAcctSlice;
export const {setByAcct, clearByAcct} = actions;
export default reducer;
