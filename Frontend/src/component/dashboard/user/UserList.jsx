import { Avatar, Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
} from "../../../features/chat/chatSlice";

function UserList({ onSelectUser, selectedUserId, searchText }) {
  const dispatch = useDispatch();
  const { users, onlineUsers } = useSelector((state) => state.chat);
  const { user: currentUser } = useSelector((state) => state.signin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!users || !currentUser) return [];

    return users
      .filter((u) => u._id !== currentUser._id)
      .filter((u) => u.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [users, currentUser, searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {filteredUsers.length ? (
        filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(String(user._id));
          return(
          <Box
            key={user._id}
            onClick={() => onSelectUser(user)}
            sx={{
              p: 1.5,
              borderRadius: 1,
              backgroundColor:
                selectedUserId === user._id
                  ? "primary.light"
                  : "background.default",
              boxShadow:
                selectedUserId === user._id
                  ? "0 4px 12px rgba(59, 201, 201, 0.3)"
                  : "0 2px 4px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&:hover": {
                backgroundColor: "primary.light",
                boxShadow: "0 4px 12px rgba(59, 201, 201, 0.3)",
                transform: "translateX(4px)",
              },
            }}
          >
            <Avatar
            src={user?.profilePic}
              sx={{
                bgcolor: "primary.main",
                width: { xs: 35, sm: 40 },
                height: { xs: 35, sm: 40 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {!user?.profilePic &&
                      user?.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isOnline ? "success.main" : "text.secondary",
                  fontWeight: 600,
                }}
              >
                {isOnline ? "● Online" : ""}
              </Typography>
            </Box>
          </Box>

        )})
      ) : (
        <Box
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary" align="center">
            No users found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
export default UserList;
