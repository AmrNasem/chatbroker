import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatURL } from "../utils/constants";

const initialState = {
  loading: true,
  error: null,
  currentChat: null,
  messages: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, userIds }) => {
    try {
      const res = await fetch(`${chatURL}/getAllMessages/${userIds}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطأ في تحميل الرسائل");
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
);

const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    openChat(state, action) {
      const chat = action.payload;
      state.currentChat = chat;
      state.loading = true;
    },
    closeChat(state) {
      state.currentChat = null;
      state.messages = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.payload.messages.reverse();
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openChat, closeChat } = messages.actions;
export default messages.reducer;
