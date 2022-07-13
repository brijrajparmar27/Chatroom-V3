import { useContext } from "react";
import { RoomContext } from "../Context/RoomContext";

const useRoomContext = () => {
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);
  return { currentRoom, setCurrentRoom };
};
export default useRoomContext;
