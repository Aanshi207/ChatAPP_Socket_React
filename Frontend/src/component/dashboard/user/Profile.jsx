import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Paper,
  Stack,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../../../features/profile/profileSlice";

const ProfileDetail = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value || "Not provided"}
    </Typography>
  </Box>
);

function Profile() {
  const [imagePreview, setImagPreview] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.signin);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setImagPreview(URL.createObjectURL(file));
      setIsEdited(true);
    }
  };

  const handleSave = () => {
    if (profilePicFile) {
      const formData = new FormData();
      formData.append("profilePic", profilePicFile);

      dispatch(updateProfilePic(formData));
    }
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 5 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => window.history.back()}
            aria-label="close"
            sx={{
              color: "text.secondary",
              transition: "0.2s",
              "&:hover": { color: "text.main", bgcolor: "error.lighter" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 4,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}
                >
                  User Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your personal information and account settings.
                </Typography>
              </Box>
              <Box>
                {isEdited && (
                  <Button
                    variant="contained"
                    disabled={loading}
                    sx={{ backgroundColor: "primary.light" }}
                    onClick={handleSave}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                )}
              </Box>
            </Box>
            <Divider sx={{ mt: 3, borderStyle: "dashed" }} />
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  borderColor: "primary.main",

                  bgcolor: "grey.50",
                }}
              >
                <label htmlFor="avatar-upload-input">
                  <Avatar
                    src={imagePreview || user?.profilePic || "/Avatar.jpg"}
                    alt={user?.name}
                    sx={{
                      width: 180,
                      height: 180,
                      mx: "auto",
                      mb: 3,
                      border: "6px solid",
                      borderColor: "white",
                      boxShadow: 3,
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    {!imagePreview &&
                      !user?.profilePic &&
                      user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </label>

                <input
                  accept="image/*"
                  id="avatar-upload-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                {error && (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                )}

                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {user?.name || "Username"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {user?.role || "Member"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    px: 2,
                    py: 0.5,
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                    borderRadius: 10,
                  }}
                >
                  Active Account
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                variant="outlined"
                sx={{ p: 4, borderRadius: 4, borderColor: "primary.main" }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}
                >
                  Account Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ProfileDetail label="Full Name" value={user?.name} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ProfileDetail label="Email Address" value={user?.email} />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderStyle: "dashed" }} />

                
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default Profile;
