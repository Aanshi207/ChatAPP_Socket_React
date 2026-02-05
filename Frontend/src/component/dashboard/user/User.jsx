import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import SearchAutocomplete from "./SearchAutocomplete";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/login/signinSlice";

function User({ onSelectUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const theme = useTheme();

  const md = useMediaQuery(theme.breakpoints.up("md")); 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { user } = useSelector((state) => state.signin);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    onSelectUser(user);
    setSearchText("");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: { xs: 1.5, sm: 2, md: 2.5 },
        backgroundColor: "background.paper",
        boxShadow: {
          xs: "none",
          sm: "none",
          md: "2px 0 8px rgba(0, 0, 0, 0.1)",
        },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, md: 3 }, 
          px: { xs: 0.5, sm: 0 }, 
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700, 
            color: "primary.main",
            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Live Chat
        </Typography>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {md ? (
            <>
              <Tooltip  arrow>
                <Avatar
                src={user?.profilePic}
                onClick={handleProfileClick}
                  sx={{
                    bgcolor: "primary.main",
                    width: { xs: 32, sm: 35, md: 40 },
                    height: { xs: 32, sm: 35, md: 40 },
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: (theme) =>
                        `0 4px 12px ${theme.palette.primary.light}`,
                    },
                  }}
                >
                  {!user?.profilePic && user?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              </Tooltip>

              <Tooltip  arrow>
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{
                    color: "error.main",
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "error.light",
                      color: "white", 
                    },
                  }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (<>
            <IconButton onClick={handleOpen} size="small">
              <MoreVertIcon />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => { handleClose(); handleProfileClick(); }}>
              <ListItemIcon >
                <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={user?.name || "Profile"} />
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText sx={{ color: 'error.main' }} primary="Logout" />
            </MenuItem>
          </Menu>
          </>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <SearchAutocomplete
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <UserList
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUser?._id}
          searchText={searchText}
        />
      </Box>
    </Box>
  );
}

export default User;
