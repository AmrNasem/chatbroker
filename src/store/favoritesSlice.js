import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (authToken) => {
    try {
      const res = await fetch(`${backend}/favorites`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("حدث خطأ ما!");
      const data = await res.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: null,
    status: "loading",
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      if (state.list) state.list.unshift(action.payload);
      else state.list = [action.payload];
    },
    removeFromFavorites: (state, action) => {
      state.list = state.list.filter(
        (product) => product.product_id !== action.payload
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
      });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
