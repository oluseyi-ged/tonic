import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  acctLoad: false,
};
const acctLoadSlice = createSlice({
  name: 'acctLoad',
  initialState,
  reducers: {
    setAcctLoad: (state, action) => {
      return {...state, acctLoad: action.payload};
    },
    clearAcctLoad: () => {
      return {acctLoad: false};
    },
  },
});

const {reducer, actions} = acctLoadSlice;
export const {setAcctLoad, clearAcctLoad} = actions;
export default reducer;
