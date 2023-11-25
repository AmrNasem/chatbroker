import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

const initialState = { loading: false, offers: null, error: null };

export const fetchOffers = createAsyncThunk("offers/fetchOffers", async () => {
  try {
    const res = await fetch(`${backend}/offers`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
});

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const offersActions = offersSlice.actions;

export default offersSlice.reducer;
