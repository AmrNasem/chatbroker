import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../App";

const initialState = { loading: false, user: null, token: null, error: null };

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (endpoint, body) => {
    try {
      const res = await fetch(`${backend}/${endpoint}`, {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
