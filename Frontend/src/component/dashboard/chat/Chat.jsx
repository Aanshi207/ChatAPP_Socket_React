import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
 
function Chat({ selectedUser }) {

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        backgroundColor: "background.default",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <Header selectedUser={selectedUser} />
      </Box>

      {/* Messages Container */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Messages selectedUser={selectedUser}
          setEditingId={setEditingId}
          editValue={editValue}
          setEditValue={setEditValue}
         />
      </Box>

      {/* Send Message Input */}
      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <SendMessage selectedUser={selectedUser}
          editingId={editingId}
          setEditingId={setEditingId}
          editValue={editValue}
          setEditValue={setEditValue}
         />
      </Box>
    </Box>
  );
}

export default Chat;
