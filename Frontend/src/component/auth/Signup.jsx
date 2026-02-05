import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetSignupState } from "../../features/register/signupSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.signup);

  useEffect(() => {
    if (user) {
      navigate('/');  
      dispatch(resetSignupState());
    }
  }, [user, navigate, dispatch]);

  const handleSignupSubmit = () => {
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      

      {/* LEFT PANEL */}
      <Box
        sx={{
          flex: 0.4,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
          background: "linear-gradient(180deg, #3BC9C9, #8E7CE6)",
          color: "#fff",
        }}
      >
        <img src="/auth.png" alt="Auth" />
      </Box>

      {/* RIGHT PANEL */}
      
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: { xs: "90%", lg: "100%" },
            maxWidth: 700,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            display="block"
            align="center"
            variant="h5"
            sx={{
              background: "linear-gradient(90deg, #3BC9C9, #8E7CE6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SIGN UP HERE
          </Typography>

          <Box mt={3}>
            <TextField
              fullWidth
              sx={{ mt: 4 }}
              label="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              sx={{ mt: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mt: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography color="error.main" mt={2} fontSize={14}>
                {error}
              </Typography>
            )}

            <Button 
              fullWidth
              sx={{
                mt: 6,
                py: 1.2,
                background: "linear-gradient(90deg, #3BC9C9, #8E7CE6)",
              }}
              variant="contained"
              onClick={handleSignupSubmit}
              disabled={loading}
            >
              Continue
            </Button>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
              sx={{ gap: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>

              <Typography
                variant="body2"
                component="span"
                onClick={() => navigate("/")}
                sx={{
                  color: "#8E7CE6",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    textDecoration: "underline",
                    filter: "brightness(1.2)",
                  },
                }}
              >
                Login here
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
