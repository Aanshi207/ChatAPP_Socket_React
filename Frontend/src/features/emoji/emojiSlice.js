import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const EMOJI_URL = import.meta.env.VITE_EMOJI_API_KEY; 

export const fetchEmoji = createAsyncThunk(
    'emojis/fetchEmoji',
    async(_, {rejectWithValue}) => {
        try {
            if(!EMOJI_URL){
                throw new Error("VITE_EMOJI_API_KEY is missing! Restart your npm run dev.");
            }
            const response = await axios.get(EMOJI_URL);
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const emojiSlice = createSlice({
  name: "emojis",
  initialState: {
    emojisData: [], 
    status: "idle",
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmoji.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmoji.fulfilled, (state, action) => {
        state.status = "success";
        state.emojisData = action.payload;
      })
      .addCase(fetchEmoji.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      });
  }
});

export default emojiSlice.reducer;
