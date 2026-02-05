import React, { useState, useMemo } from "react";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

export default function SearchAutocomplete({ searchText, setSearchText }) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search users..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip  arrow>
              <IconButton edge="end" size="small">
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.3s ease",
          backgroundColor: "background.default",
          "& fieldset": {
            borderColor: "primary.main",
            transition: "all 0.3s ease",
          },
          "&:hover fieldset": {
            borderColor: "primary.main",
            borderWidth: "2px",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: "2px",
          },
        },
      }}
    />
  );
}
