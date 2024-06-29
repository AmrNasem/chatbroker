import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

const initialState = {
  loading: true,
  categories: null,
  error: null,
  currentCategory: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const res = await fetch(`${backend}/categories`);
      if (!res.ok) throw new Error("خطأ في تحميل الفئات");
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
  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
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

export const {setCategory} = categories.actions;
export default categories.reducer;
