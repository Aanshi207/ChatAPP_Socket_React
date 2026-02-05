import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import User from "./user/User";
import Chat from "./chat/Chat";

function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          height: "100%",
          margin: 0,
          width: "100%",
        }}
      >
        {/* Users Panel */}
        <Grid
          item
          size={{ xs: 12, sm: 12, md: 5, lg: 3 }}
          sx={{
            width: "100%",
            height: "100%",
            boxShadow: {
              xs: "none",
              sm: "none",
              md: "2px 0 8px rgba(0, 0, 0, 0.1)",
            },
            overflow: "auto",
            display: {
              xs: selectedUser ? "none" : "block",
              sm: selectedUser ? "none" : "block",
              md: "block",
            },
          }}
        >
          <User onSelectUser={handleSelectUser} />
        </Grid>

        {/* Chat Panel */}
        <Grid
          item
          size={{ xs: 12, sm: 12, md: 7, lg: 9 }}
          sx={{
            height: "100%",
            overflow: "auto",
            display: { xs: selectedUser ? "block" : "none", md: "block" },
          }}
        >
          <Chat selectedUser={selectedUser} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
