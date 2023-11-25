import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

const initialState = {
  loading: false,
  products: null,
  error: null,
  lastPage: null,
  page: 1,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 1) => {
    try {
      const res = await fetch(`${backend}/products?page=${page}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!state.products) state.products = [];
        const newProducts = action.payload;
        state.products = [...state.products, ...newProducts.data];
        state.lastPage = newProducts.meta.last_page;
        state.page++;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
