import "./RightPanel.css";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import useRoomContext from "../../Hooks/useRoomContext";
import useCollection from "../../Hooks/useCollection";
import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import Bubble from "../Bubble/Bubble";

const RightPanel = () => {
  const { currentRoom } = useRoomContext();
  const { chats, Send } = useCollection(currentRoom.roomid);
  const { user } = useAuthContext();
  const [textmsg, setTextmsg] = useState(false);
  const [textImg, setTextImg] = useState(false);

  const date = new Date();

  const createJson = ({ image, text }) => {
    const dataJson = {
      timestamp: new Date(),
      uid: user.uid,
      image: image?"url":"",
      text: text?text:"",
      roomid: currentRoom.roomid,
      displayName: user.displayName,
      senderImg: user.photoURL,
    };
    console.log(dataJson);
    return dataJson;
  };

  const handleSend = (e) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    if (!textImg && !msg) {
      return;
    }

    let dataJson = createJson({ image: textImg, text: msg });
    Send(dataJson);
    e.target.reset();
    setTextmsg(false);
    setTextImg(false);
  };

  return (
    <div className="right_panel">
      <div className="chat_box">
        <div className="chat_header">
          <h2>{currentRoom.name}</h2>
        </div>

        <div className="chats_contain scrollbar" id="style-1">
          {chats &&
            chats.map((each) => {
              return <Bubble each={each} />;
            })}
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
              <div className="file_selector_btn">
                <AiOutlinePaperClip
                  style={{ fontSize: "26px" }}
                ></AiOutlinePaperClip>
              </div>
              <button type="submit" className="msg_submit_btn">
                <AiOutlineSend style={{ fontSize: "22px" }}></AiOutlineSend>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
