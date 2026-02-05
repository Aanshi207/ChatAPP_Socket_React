import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const API_URL = `${BASE_URL}/chat`;

export const fetchAllUsers = createAsyncThunk(
  "chat/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/sendmessage/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error sending message",
      );
    }
  },
);

export const updateMessageThunk = createAsyncThunk(
  "chat/updateMessage",
  async ({ id, rid, text }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/updatemessage/${id}/${rid}`,
        { text },
        { withCredentials: true },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update",
      );
    }
  },
);

export const deleteMessageThunk = createAsyncThunk(
  "chat/deleteMessage",
  async ({ id, rid }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/deletemessage/${id}/${rid}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete",
      );
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    messages: [],
    onlineUsers: [],
    usersLoading: false,
    messagesLoading: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    receiveSocketMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    receiveSocketUpdate: (state, action) => {
      const index = state.messages.findIndex(
        (m) => m._id === action.payload._id,
      );
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    receiveSocketDelete: (state, action) => {
      state.messages = state.messages.filter(
        (m) => m._id !== action.payload._id,
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })

      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messagesLoading = false;
        state.messages = action.payload;
      })

      .addCase(updateMessageThunk.fulfilled, (state, action) => {
        const updatedMsg = action.payload;
        const index = state.messages.findIndex((m) => m._id === updatedMsg._id);
        if (index !== -1) {
          state.messages[index] = updatedMsg;
        }
      })

      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload,
        );
      });
  },
});

export const { clearMessages, setOnlineUsers, receiveSocketMessage, receiveSocketUpdate, receiveSocketDelete } =
  chatSlice.actions;
export default chatSlice.reducer;
