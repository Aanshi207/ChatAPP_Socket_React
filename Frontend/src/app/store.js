import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/login/signinSlice";
import signupReducer from "../features/register/signupSlice";
import chatReducer from "../features/chat/chatSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
    reducer:{
        signin: signinReducer,
        signup: signupReducer,
        chat: chatReducer,
        profile: profileReducer,
    }
})