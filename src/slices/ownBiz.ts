import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  ownBiz: <any>{},
};
const ownBizSlice = createSlice({
  name: 'ownBiz',
  initialState,
  reducers: {
    setOwnBiz: (state, action) => {
      return {...state, ownBiz: action.payload};
    },
    clearOwnBiz: () => {
      return {ownBiz: {}};
    },
  },
});

const {reducer, actions} = ownBizSlice;
export const {setOwnBiz, clearOwnBiz} = actions;
export default reducer;
