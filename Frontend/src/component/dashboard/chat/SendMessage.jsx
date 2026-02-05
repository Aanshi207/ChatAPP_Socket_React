import {
  Box,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import { useSelector, useDispatch } from "react-redux";
import {
  postMessage,
  updateMessageThunk,
} from "../../../features/chat/chatSlice";

function SendMessage({
  selectedUser,
  editingId,
  setEditingId,
  editValue,
  setEditValue,
}) {
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.signin);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSendMessage = () => {
    if (!user || !selectedUser) return;

    if (editingId) {
      if (!editValue.trim()) return;

      dispatch(
        updateMessageThunk({
          id: editingId,
          text: editValue.trim(),
          rid: selectedUser._id,
        }),
      );
      setEditingId(null);
      setEditValue("");
      return;
    }

    if (!message.trim() && !imageFile) return;

    const data = new FormData();
    data.append("text", message.trim());

    if (imageFile) {
      data.append("image", imageFile);
    }

    dispatch(postMessage({ id: selectedUser._id, formData: data }));

    setMessage("");
    clearImage();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const canSend =
    (editingId ? editValue?.trim() : message?.trim()) || imageFile;

  if (!selectedUser) return null;

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        alignItems: "flex-end",
        gap: 1.5,
        backgroundColor: "background.paper",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" gap={1}>
        <Tooltip arrow>
          <IconButton
            size="small"
            sx={{
              transition: "all 0.3s ease",
              "&:hover": { color: "primary.main" },
            }}
          >
            <SentimentSatisfiedAltOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow>
          <IconButton
            component="label"
            size="small"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            <AttachmentOutlinedIcon />
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        size="small"
        multiline
        maxRows={4}
        placeholder={editingId ? "Editing message..." : "Type your message..."}
        value={editingId ? editValue : message}
        onChange={(e) =>
          editingId ? setEditValue(e.target.value) : setMessage(e.target.value)
        }
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: previewUrl && (
            <InputAdornment position="start">
              <Avatar
                src={previewUrl}
                variant="rounded"
                sx={{ width: 45, height: 45, border: "1px solid #ddd" }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "background.default",
            alignItems: "center",
          },
        }}
      />

      <Tooltip arrow>
        <IconButton
          onClick={handleSendMessage}
          disabled={!canSend}
          size="small"
          sx={{
            color: canSend ? "primary.main" : "text.disabled",
            transition: "all 0.3s ease",
            mb: 0.5,
          }}
        >
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default SendMessage;

// InputProps (Capital 'I'): આ પ્રોપર્ટી MUI ના ખાસ કોમ્પોનન્ટ (જેમ કે OutlinedInput) માટે વપરાય છે. જો તમારે ઇનપુટ બોક્સમાં ચિહ્ન (Icon) ઉમેરવા હોય કે તેની સ્ટાઇલ બદલવી હોય, તો આનો ઉપયોગ થાય છે.
// inputProps (Lowercase 'i'): આ પ્રોપર્ટી સીધી HTML ના <input> ટેગ પર લાગુ પડે છે. જો તમારે લખાણની મર્યાદા (MaxLength) નક્કી કરવી હોય કે પેટર્ન (Pattern) આપવી હોય, તો આનો ઉપયોગ થાય છે
{
  /* <TextField
        label="Price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
      /> 
      */
}
