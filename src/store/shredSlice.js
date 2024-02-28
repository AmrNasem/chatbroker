import { createSlice } from '@reduxjs/toolkit';

const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    propToCopy: null,
  },
  reducers: {
    setPropToCopy: (state, action) => {
      state.propToCopy = action.payload;
    },
  },
});

export const { setPropToCopy } = sharedSlice.actions;
export default sharedSlice.reducer;
