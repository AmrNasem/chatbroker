import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatURL } from "../utils/constants";

const initialState = {
  loading: true,
  error: null,
  currentChat: null,
  messages: null,
  socket: null,
  onlineUsers: null,
  unreadMessages: [],
  lastMessage: null,
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
      const { chat, lastMessage } = action.payload;
      state.currentChat = chat;
      state.lastMessage = lastMessage || chat.lastMessage;
      state.loading = true;
    },
    closeChat(state) {
      state.currentChat = null;
      state.messages = null;
    },
    receiveMessage(state, action) {
      const msg = action.payload;
      if (state.messages) {
        state.messages.push(msg);
        state.lastMessage = msg;
      } else state.unreadMessages.push(msg);
    },
    sendMessage(state, action) {
      const msg = action.payload;
      state.messages.push(msg);
      state.lastMessage = msg;
    },
    connectSocket(state, action) {
      const socket = action.payload;
      state.socket = socket;
      socket.connect();
    },
    disconnectSocket(state) {
      state.socket.disconnect();
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
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
        state.unreadMessages = state.unreadMessages.filter(
          (message) => !state.currentChat.members.includes(message.senderId)
        );
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  openChat,
  closeChat,
  sendMessage,
  receiveMessage,
  connectSocket,
  disconnectSocket,
  setOnlineUsers,
} = messages.actions;
export default messages.reducer;
