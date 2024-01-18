import {createSlice} from '@reduxjs/toolkit';
const initialState: any = {};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, {payload}) => {
      return payload;
    },
    clearProfile: () => {
      return {};
    },
  },
});

const {reducer, actions} = profileSlice;
export const {setProfile, clearProfile} = actions;
export default reducer;
