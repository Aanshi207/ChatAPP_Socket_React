import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { updateProfilePic } from "../profile/profileSlice"; 

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userData, { withCredentials: true });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
})

export const checkUserAuth = createAsyncThunk(
  "auth/checkUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`, {
        withCredentials: true, 
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Session expired");
    }
  }
);

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    user: null, 
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePic = action.payload.profilePic;
        }
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; 
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  }
});

export default signinSlice.reducer;
