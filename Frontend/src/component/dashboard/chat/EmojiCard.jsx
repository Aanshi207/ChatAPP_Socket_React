import { Box, Card, CardActionArea, Grid, Skeleton, Typography, TextField, InputAdornment } from "@mui/material";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

function EmojiCard({ onSelect }) {
  const { emojisData, status } = useSelector((state) => state.emojis);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmojis = useMemo(() => {
    const list = Array.isArray(emojisData) ? emojisData : [];
    if (!searchTerm) return list.slice(0, 20); 
    
    return list.filter(item => 
      item.unicodeName.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 200);
  }, [emojisData, searchTerm]);

  if (status === "loading") {
    return (
      <Grid container spacing={1} sx={{ p: 2 }}>
        {[...Array(18)].map((_, i) => (
          <Grid item xs={2} key={i}>
            <Skeleton variant="rounded" height={40} width="100%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ width: 300, display: "flex", flexDirection: "column" }}>
      {/* Search Bar */}
      <Box sx={{ p: 1, borderBottom: "1px solid #eee" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
      </Box>

      {/* Emoji Grid */}
      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          p: 1,
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "10px" },
        }}
      >
        <Grid container spacing={0.5}>
          {filteredEmojis.map((item) => (
            <Grid item xs={2.4} key={item.slug}> 
              <CardActionArea
                sx={{ 
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "action.hover" } 
                }}
                onClick={() => onSelect && onSelect(item.character)}
              >
                <Typography fontSize="1.4rem" title={item.unicodeName}>
                  {item.character}
                </Typography>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
        
        {filteredEmojis.length === 0 && (
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}>
            No emojis found
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default EmojiCard;
