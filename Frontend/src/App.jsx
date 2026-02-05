import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";

import Signin from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import SocketContextProvider from "./context/SocketContextProvider";
import { lightTheme } from "./Theme";
import Dashboard from "./component/dashboard/Dashboard";
import Profile from "./component/dashboard/user/Profile";
import { checkUserAuth } from "./features/login/signinSlice";

const App = () => {
  const theme = lightTheme;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SocketContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </SocketContextProvider>
    </ThemeProvider>
  );
};

export default App;
