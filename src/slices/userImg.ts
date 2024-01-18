import {createSlice} from '@reduxjs/toolkit';
const initialState = '';
const userImgSlice = createSlice({
  name: 'userImg',
  initialState,
  reducers: {
    setUserImg: (state, {payload}) => {
      return payload;
    },
    clearUserImg: () => {
      return '';
    },
  },
});

const {reducer, actions} = userImgSlice;
export const {setUserImg, clearUserImg} = actions;
export default reducer;
