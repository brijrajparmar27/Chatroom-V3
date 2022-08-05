import { createContext, useState } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState({
    name: "General",
    image:
      "https://firebasestorage.googleapis.com/v0/b/chatroom-b93bf.appspot.com/o/RoomImages%2F7XguRtYdQtVWmjph8Gf4.jpg?alt=media&token=6408a3db-f673-4ba0-a141-bfe93ad87e87",
    roomid: "7XguRtYdQtVWmjph8Gf4",
  });
  const [notifications,setNotifications] = useState([])
  return (
    <RoomContext.Provider value={{ currentRoom, setCurrentRoom, notifications, setNotifications }}>
      {children}
    </RoomContext.Provider>
  );
};


