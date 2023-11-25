import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories-slice";
import offersSlice from "./offers-slice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    offers: offersSlice,
  },
});

export default store;
