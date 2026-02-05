import { Avatar, Box, IconButton, Typography, Tooltip, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ selectedUser }) {
  const { onlineUsers } = useSelector((state) => state.chat);
  const isUserOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  const handleBack = () => {
     {/*ADD BACK TO USERLIST FUNCTIONALITY FOR XS TO SM SIZE*/}
  }

  return (
    <>
      {selectedUser &&( <Box
        sx={{
          p: { xs: 1.5, sm: 2, md: 2.5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "background.paper",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          display="flex"
          gap={{ xs: 1, sm: 1.5, md: 2 }}
          alignItems="center"
          minWidth={0}
        >

          
          <Avatar
          src={selectedUser?.profilePic}
            sx={{
              ml:1,
              bgcolor: "primary.main",
              width: { xs: 35, sm: 40, md: 45 },
              height: { xs: 35, sm: 40, md: 45 },
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
             {!selectedUser?.profilePic }
          </Avatar>
          <Box display="flex" flexDirection="column" minWidth={0}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.125rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {selectedUser?.name }
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isUserOnline ? "success.main" : "text.secondary",
                fontWeight: 500,
                fontSize: { xs: "0.7rem", md: "0.75rem" },
              }}
            >
              { isUserOnline
                  ? "● Online"
                  : "○ Offline"}
            </Typography>
          </Box>
        </Box>
        {/* <Tooltip  arrow>
          <Button
          onClick={handleBack}
            size="small"
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "primary.light",
              },
            }}
          >
            <MoreHorizIcon />
          </Button>
        </Tooltip> */}
      </Box>)}
    </>
  );
}

export default Header;
