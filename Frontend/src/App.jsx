import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container, Box, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Signin from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import SocketContextProvider from "./context/SocketContextProvider";
import { lightTheme } from "./Theme";
import Dashboard from "./component/dashboard/Dashboard";
import Profile from "./component/dashboard/user/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { checkUserAuth } from "./features/login/signinSlice";
import SigninSkeleton from "./component/auth/SigninSkeleton";

const App = () => {
  const theme = lightTheme;
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.signin);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SocketContextProvider>
        {loading ? (
          
          <SigninSkeleton />
        )  : (<BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>)}
      </SocketContextProvider>
    </ThemeProvider>
  );
};

export default App;
