import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";
import axios from "axios";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (authToken) => {
    try {
      const response = await fetch(`${backend}/favorites`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      throw error;
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async ({ authToken, favoriteId }) => {
    try {
      await axios.delete(`${backend}/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return favoriteId;
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.list = state.list.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
