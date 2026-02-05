import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.signin);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
