import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: []
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.list = state.list.filter((product) => product.productId !== action.payload.productId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
