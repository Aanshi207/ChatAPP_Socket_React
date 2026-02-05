import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const updateProfilePic = createAsyncThunk(
  "profile/updateProfilePic",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/auth/profile`, formData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { loading: false, error: null, success: false },
  reducers: {
    resetProfileState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfilePic.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
