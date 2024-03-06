import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../utils/general";

const initialState = { user: null, token: null };
const sessionDuration = 60 * 60 * 1000;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      if (!getCookie("userData"))
        setCookie("userData", JSON.stringify({ user, token }), sessionDuration);
      console.log(user);
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    updateUserData(state, action) {
      const newData = { ...state.user, ...action.payload };
      state.user = newData;
      setCookie(
        "userData",
        JSON.stringify({ user: newData, token: state.token }),
        sessionDuration
      );
    },
  },
});

export const { authenticateUser, updateUserData, logout } = authSlice.actions;
export default authSlice.reducer;
