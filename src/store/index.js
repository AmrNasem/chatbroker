import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories-slice";
import offersSlice from "./offers-slice";
import productsSlice from "./products-slice";
import authSlice from "./auth-slice";
import chatSlice from "./chat-slice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    offers: offersSlice,
    products: productsSlice,
    auth: authSlice,
    chats: chatSlice,
  },
});

export default store;
