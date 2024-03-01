import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backend } from '../App';
import axios from 'axios';

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await axios.get(`${backend}/favorites`);
      return console.log(response.data)
        ;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
