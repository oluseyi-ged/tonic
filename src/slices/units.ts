import {createSlice} from '@reduxjs/toolkit';

const initialState: any = [];

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    addOrUpdateUnit: (state, action) => {
      const {id, details, images} = action.payload;
      const index = state.findIndex(item => item.id === id);

      if (index !== -1) {
        // Update existing unit
        const existingUnit = state[index];
        state[index] = {
          ...existingUnit,
          details: {
            ...existingUnit.details,
            ...details, // Update different or missing properties in details
          },
          images: [
            ...existingUnit.images,
            ...images, // Update different or missing properties in images
          ],
        };
      } else {
        // Add new unit
        state.push({
          id,
          details,
          images,
        });
      }
    },
    clearUnits: () => [],
    addUnits: (_, action) => action?.payload,
    deleteUnit: (state, action) => {
      const id = action?.payload;
      const index = state?.findIndex(item => item?.id === id);
      if (index !== -1) {
        state?.splice(index, 1);
      }
    },
  },
});

const {reducer, actions} = unitsSlice;
export const {deleteUnit, addUnits, clearUnits, addOrUpdateUnit} = actions;
export default reducer;
