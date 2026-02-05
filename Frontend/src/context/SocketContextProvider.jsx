import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import SocketContext from "./SocketContext";
import { setOnlineUsers } from "../features/chat/chatSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.signin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      console.log("Creating socket connection for user:", user._id);
      const socketInstance = io(BASE_URL, {
        reconnection: true,
        query: {
          userId: user._id,
        },
      });

      socketInstance.on("connection", () => {
        console.log("Socket connected successfully!", socketInstance.id);
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      socketInstance.on("onlineUsers", (onlineUsersList) => {
        console.log("Online users list received:", onlineUsersList);
        if (Array.isArray(onlineUsersList)) {
          dispatch(setOnlineUsers(onlineUsersList));
        }
      });

      setSocket(socketInstance);

      return () => {
        console.log("Disconnecting socket");
        socketInstance.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [user, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
