import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

const initialState = { loading: true, offers: null, error: null };

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (pageNumber = 1, { rejectWithValue }) => {
    try {
      const res = await fetch(`${backend}/offers?page=${pageNumber}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      return data.offers;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const offersActions = offersSlice.actions;
export default offersSlice.reducer;
