import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories-slice";
import offersSlice from "./offers-slice";
import productsSlice from "./products-slice";
import authSlice from "./auth-slice";
import favoritesReducer from "./favoritesSlice";
import sharedReducer from "./shredSlice";
import chatSlice from "./chat-slice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    offers: offersSlice,
    products: productsSlice,
    auth: authSlice,
    favorites: favoritesReducer,
    shared: sharedReducer,
    chats: chatSlice,
  },
});

export default store;
