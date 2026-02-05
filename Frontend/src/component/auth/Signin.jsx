import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/login/signinSlice";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.signin);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLoginSubmit = (event) => {
    event.preventDefault(); 
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  return (
    <Box sx={{ minHeight: "100%", display: "flex" }}>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "background.default" }}>
        <Paper elevation={6} sx={{ width: { xs: "90%", lg: "100%" }, maxWidth: 700, p: 4, borderRadius: 3 }}>
          <Typography display="block" align="center" variant="h5" sx={{ background: "linear-gradient(90deg, #3BC9C9, #8E7CE6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            SIGN IN HERE
          </Typography>

          <Box component="form" onSubmit={handleLoginSubmit} mt={3}>
            <TextField
              fullWidth
              label="Email"
              sx={{ mt: 4 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mt: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error.main" mt={2} fontSize={14}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              sx={{
                mt: 6,
                py: 1.2,
                background: "linear-gradient(90deg, #3BC9C9, #8E7CE6)",
              }}
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Submit"}
            </Button>

            <Box display="flex" justifyContent="center" alignItems="center" mt={4} sx={{ gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Typography
                variant="body2"
                component="span"
                onClick={() => navigate("/signup")}
                sx={{ color: "#8E7CE6", fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
              >
                Sign Up here
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ flex: 0.4,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
          background: "linear-gradient(180deg, #3BC9C9, #8E7CE6)",
          color: "#fff",}}>
        <img src="/auth.png" alt="Auth" />
      </Box>
    </Box>
  );
}
