import "./ChatHeader.css";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAuthContext from "../../../../Hooks/useAuthContext";
import useCreateRoom from "../../../../Hooks/useCreateRoom";
import useRoomContext from "../../../../Hooks/useRoomContext";

const ChatHeader = () => {
  const [popup, setPopup] = useState(false);
  const { deleteRoom } = useCreateRoom();
  const { currentRoom, setCurrentRoom } = useRoomContext();
  const { user } = useAuthContext();

  const handleDeleteRoom = () => {
    setPopup(false);

    deleteRoom();

    setCurrentRoom({
      name: "General",
      image:
        "https://firebasestorage.googleapis.com/v0/b/chatroom-b93bf.appspot.com/o/RoomImages%2F7XguRtYdQtVWmjph8Gf4.jpg?alt=media&token=6408a3db-f673-4ba0-a141-bfe93ad87e87",
      roomid: "7XguRtYdQtVWmjph8Gf4",
    });
  };

  return (
    <div className="chat_header">
      <div className="header_left">
        <img src={currentRoom.image} className="room_avatar" />
        <h2>{currentRoom.name}</h2>
      </div>
      {popup && (
        <div
          className="backdrop"
          onClick={() => {
            setPopup(false);
          }}
        ></div>
      )}
      <div
        className="room_options"
        onClick={() => {
          setPopup((prev) => !prev);
        }}
      >
        <BsThreeDotsVertical />
      </div>
      {popup && (
        <div className="room_menu">
          <p className="popup_option">Details</p>
          {currentRoom.creator == user.uid && (
            <button className="del_room_btn" onClick={handleDeleteRoom}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default ChatHeader;
