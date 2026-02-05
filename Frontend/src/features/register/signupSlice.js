import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/signup`,
      userData,
      {withCredentials:true}
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || "Signup failed");
  }   
});

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers:{
    resetSignupState: (state) =>{
        state.user= null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(signupUser.pending, (state) => {
        state.loading= true;
        state.error =null;
    })
    .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
  }
});

export const {resetSignupState} = signupSlice.actions;
export default signupSlice.reducer;
