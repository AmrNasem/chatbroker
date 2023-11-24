import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, categories: null, error: null };

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const res = await fetch("https://api.lepgo.online/api/v1/categories");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const categoriesActions = categories.actions;
export default categories.reducer;
