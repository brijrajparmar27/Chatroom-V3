import "./RightPanel.css";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import useRoomContext from "../../Hooks/useRoomContext";
import useCollection from "../../Hooks/useCollection";
import { useRef, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import Bubble from "../Bubble/Bubble";
import useImage from "../../Hooks/useImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import useCreateRoom from "../../Hooks/useCreateRoom";

const RightPanel = () => {
  const { currentRoom, setCurrentRoom } = useRoomContext();
  const { chats, Send, loading } = useCollection(currentRoom.roomid);
  const { updateProfilePic, progress } = useImage();
  const { user } = useAuthContext();
  const [textImg, setTextImg] = useState(false);
  const [Url, setUrl] = useState();
  const inputFile = useRef(null);
  const [enableSend, setEnableSend] = useState(true);
  const [popup, setPopup] = useState(false);
  const {deleteRoom} = useCreateRoom();

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onUploadComplete = (url) => {
    setUrl(url);
    setEnableSend(true);
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      setEnableSend(false);
      let imgname = `${currentRoom.roomid}_${user.uid}_${Math.round(
        Math.random() * 100000
      )}`;
      setTextImg(e.target.files[0]);
      updateProfilePic(false, e.target.files[0], user, "ChatImages", imgname, {
        onComplete: onUploadComplete,
      });
    }
  };

  const createJson = ({ image, text }) => {
    const dataJson = {
      timestamp: new Date(),
      uid: user.uid,
      image: image ? Url : "",
      text: text ? text : "",
      roomid: currentRoom.roomid,
      displayName: user.displayName,
      senderImg: user.photoURL,
    };
    return dataJson;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (enableSend) {
      const msg = e.target.msg.value;
      if (!textImg && !msg) {
        return;
      }
      let dataJson = createJson({ image: textImg, text: msg });
      Send(dataJson);
      e.target.reset();
      setTextImg(false);
    }
  };

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
    <div className="right_panel">
      <div className="chat_box">
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

        {!loading && (
          <>
            <div className="chats_contain scrollbar" id="style-1">
              {chats &&
                chats.map((each) => {
                  return <Bubble each={each} key={each.id} />;
                })}

              {!loading && chats && chats.length == 0 && (
                <div className="loader">
                  <lottie-player
                    src="https://assets1.lottiefiles.com/packages/lf20_ydo1amjm.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "50%" }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
              )}
            </div>

            <div className="input_bar_contain">
              <div className="input_bar_box">
                <form
                  onSubmit={(e) => {
                    handleSend(e);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Write a message..."
                    className="msg_textbox"
                    name="msg"
                  />
                  <div className="file_selector_btn" onClick={onButtonClick}>
                    <AiOutlinePaperClip
                      style={{
                        fontSize: "26px",
                        color: textImg ? "blue" : "grey",
                      }}
                    ></AiOutlinePaperClip>
                  </div>
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <button
                    type="submit"
                    className="msg_submit_btn"
                    disabled={enableSend ? false : true}
                  >
                    {enableSend ? (
                      <AiOutlineSend
                        style={{ fontSize: "22px" }}
                      ></AiOutlineSend>
                    ) : (
                      <lottie-player
                        src="https://assets4.lottiefiles.com/private_files/lf30_06kvvo5n.json"
                        background="transparent"
                        speed="1"
                        style={{ width: "30px", height: "30px" }}
                        loop
                        autoplay
                      ></lottie-player>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="loader">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_QpolL2.json"
              background="transparent"
              speed="1"
              style={{ width: "400px", height: "400px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
