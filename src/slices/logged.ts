import {createSlice} from '@reduxjs/toolkit';
const initialState: boolean = false;
const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLogged: (state, {payload}) => {
      return payload;
    },
    clearLogged: () => {
      return false;
    },
  },
});

const {reducer, actions} = loggedSlice;
export const {setLogged, clearLogged} = actions;
export default reducer;
