import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMessageThunk,
  fetchMessages,
  receiveSocketDelete,
  receiveSocketMessage,
  receiveSocketUpdate,
} from "../../../features/chat/chatSlice";
import { useSocket } from "../../../hooks/useSocket";

function Messages({
  selectedUser,
  setEditingId,
  setEditValue,
}) {
  const dispatch = useDispatch();
  const socket = useSocket();
  const scrollRef = useRef(null);

  const { user } = useSelector((state) => state.signin);
  const { messages, messagesLoading } = useSelector((state) => state.chat);

  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(fetchMessages(selectedUser._id));
    }
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const isFromSelected = newMessage.senderId === selectedUser?._id;
      const isToSelected = newMessage.receiverId === selectedUser?._id;

      if (isFromSelected || isToSelected) {
        dispatch(receiveSocketMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, dispatch, selectedUser?._id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("updatedMessage", (updatedMsg) =>
    //   {
    //   console.log("Socket Event Received: updatedMessage", updatedMsg);
    //   const action = receiveSocketUpdate(updatedMsg);
    //   dispatch(action);
    //   console.log("Action Dispatched to Redux:", action);
    // }
      
      dispatch(receiveSocketUpdate(updatedMsg)),
      
    );
    socket.on("deletedMessage", (deletedMsg) =>
      dispatch(receiveSocketDelete(deletedMsg)),
    );

    return () => {
      socket.off("updatedMessage");
      socket.off("deletedMessage");
    };
  }, [dispatch, socket]);

  const handleDelete = (msgId) => {
    dispatch(deleteMessageThunk({ id: msgId, rid: selectedUser._id }));
  };

  const handleUpdate = (msg) => {
    setEditingId(msg._id);
    setEditValue(msg.text);
  };

  if (!selectedUser) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          Select a user to start chatting
        </Typography>
      </Box>
    );
  }

  if (messagesLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundImage: "url('/chatLight.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {messages.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          No messages yet. Say hi!
        </Typography>
      ) : (
        messages.map((msg, index) => {
          const msgSenderId =
            typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
          const isMe = String(msgSenderId) === String(user?._id);

          const displayName = isMe
            ? user?.name || "Me"
            : selectedUser?.name || "User";

          return (
            <Box
              key={msg._id || index}
              sx={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              {msg.image ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: !isMe ? "row" : "row-reverse",
                    alignItems: "center",
                    "&:hover .hover-box": {
                      visibility: isMe ? "visible" : "hidden",
                      opacity: 1,
                    },
                  }}
                  gap={1}
                >
                  <Box
                    component="img"
                    src={msg.image}
                    alt="Sent image"
                    sx={{
                      maxWidth: { xs: "35%", md: "30%" },
                      borderRadius: "12px",
                      display: "block",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                  />
                  <Box
                    className="hover-box"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      visibility: "hidden",
                      opacity: 0,
                      p: msg.image ? 0.5 : 1.5,
                      bgcolor: "background.default",
                      borderRadius: 5,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                      alignItems: "center",
                      height: "fit-content",
                    }}
                  >
                    <IconButton
                      onClick={() => handleDelete(msg._id)}
                      size="small"
                      sx={{ p: 0 }}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: !isMe ? "row-reverse" : "row",
                    justifyContent:'flex-end',
                    alignContent: "center",
                    alignItems: "center",
                    "&:hover .hover-box": {
                      visibility: isMe ? "visible" : "hidden",
                      opacity: 1,
                    },
                  }}
                  gap={1}
                >
                  <Box
                    className="hover-box"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      visibility: "hidden",
                      opacity: 0,
                      p: msg.image ? 0.5 : 1.5,
                      bgcolor: "background.default",
                      borderRadius: 5,
                      justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                      alignItems: "center",
                      height: "fit-content",
                    }}
                  >
                    <Grid container spacing={5} px={1}>
                      <Grid item size={6}>
                        <IconButton
                          onClick={() => handleDelete(msg._id)}
                          size="small"
                          sx={{ p: 0 }}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Grid>
                      <Grid item size={6}>
                        <IconButton
                          onClick={() => handleUpdate(msg)}
                          size="small"
                          sx={{ p: 0 }}
                        >
                          <EditIcon sx={{ color: "text.secondary" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: msg.image ? 0.5 : 1.5,
                      maxWidth: { xs: "85%", sm: "70%" },
                      borderRadius: isMe
                        ? "16px 16px 2px 16px"
                        : "16px 16px 16px 2px",
                      bgcolor: isMe ? "primary.main" : "background.paper",
                      color: isMe ? "white" : "text.primary",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        mb: 0.5,
                        fontWeight: "bold",
                      }}
                    >
                      {displayName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ wordBreak: "break-word", lineHeight: 2 }}
                      >
                        {msg.text}
                      </Typography>

                      {/* <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.7rem",
                          flexShrink: 0,
                          alignSelf: "flex-end",
                        }}
                      >
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString(
                              [],
                              timeOptions,
                            )
                          : "Sending..."}
                      </Typography> */}
                    </Box>
                  </Paper>
                </Box>
              )}
            </Box>
          );
        })
      )}
      <Box ref={scrollRef} />
    </Box>
  );
}

export default Messages;

{
  /*scrollIntoView :- આ એક JavaScript ફંક્શન છે જે તે ચોક્કસ એલિમેન્ટને સ્ક્રીન પર ખેંચી લાવે છે. */
}
{
  /*behavior: "smooth": આ પ્રોપર્ટીને કારણે સ્ક્ર્રોલિંગ એકદમ ઝટકા સાથે નહીં, પણ ધીમેથી અને સ્મૂધલી થાય છે. યુઝરને દેખાશે કે ચેટ લિસ્ટ ધીરેથી નીચે સરકી રહ્યું છે.*/
}

{
  /*
  1. useEffect ના અંતમાં [messages] લખેલું છે, જેનો અર્થ છે કે: 
  જ્યારે પણ messages નામના સ્ટેટમાં ફેરફાર થશે (એટલે કે નવો મેસેજ આવશે કે જૂના મેસેજ લોડ થશે), ત્યારે આ useEffect અંદરનો કોડ રન થશે.
  2. scrollRef.current : 
  તમે ચેટ લિસ્ટના સૌથી નીચેના ભાગમાં એક ખાલી <div> રાખ્યો હશે જેને આ scrollRef આપેલું હશે. 
*/
}
