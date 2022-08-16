import "./RightPanel.css";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import useRoomContext from "../../Hooks/useRoomContext";
import useCollection from "../../Hooks/useCollection";
import { useRef, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import Bubble from "../Bubble/Bubble";
import useImage from "../../Hooks/useImage";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import { SiGodotengine } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import "firebase/firestore";

const RightPanel = ({ setShowChat, showChat }) => {
  const { currentRoom } = useRoomContext();
  const { chats, Send, loading } = useCollection(currentRoom.roomid);
  const { updateProfilePic, progress } = useImage();
  const { user } = useAuthContext();
  const [textImg, setTextImg] = useState(false);
  const [Url, setUrl] = useState();
  const inputFile = useRef(null);
  const [enableSend, setEnableSend] = useState(true);
  const [detailsPopup, setDetailsPopup] = useState(false);

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
      const msg = e.target.msg.value.trim();
      if (!textImg && !msg) {
        return;
      }
      else {
        let dataJson = createJson({ image: textImg, text: msg });
        Send(dataJson);
        e.target.reset();
        setTextImg(false);
      }
    }
  };

  const sideVariant = {
    hide: {
      x: "100%"
    },
    show: {
      x: 0
    },
    close: {
      x: "100%"
    }
  }

  const inputboxVariant = {
    hide: {
      y: "100%"
    },
    show: {
      y: 0
    }
  }

  return (
    <div className={showChat ? "right_panel" : "right_panel hide"}>
      <div className="chat_box">

        <AnimatePresence>
          {detailsPopup && <motion.div className="room_details_contain" variants={sideVariant} initial='hide' animate='show' exit='close'>
            <div className="top_avatar_contain">
              <div className="close_details_page" onClick={() => { setDetailsPopup(false) }}>
                <IoMdClose />
              </div>
              <img src={currentRoom.image} className="top_avatar" />
            </div>
            <div className="details_content_contain">
              <h2 className="room_name">{currentRoom.name}</h2>
              <p>Created by</p>
              {!currentRoom.creatorName && <SiGodotengine style={{ fontSize: "40px", color: "grey" }} />}
              {currentRoom.creatorName && <div className="created_by">
                <img src={currentRoom.creatorImg} className="creator_img" />
                <p className="creator_name">{currentRoom.creatorName}</p>
              </div>}

            </div>
          </motion.div>}
        </AnimatePresence>

        <ChatHeader setDetailsPopup={setDetailsPopup} setShowChat={setShowChat} />

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
              <motion.div className="input_bar_box" variants={inputboxVariant} initial='hide' animate='show'>
                <form
                  onSubmit={(e) => {
                    handleSend(e);
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
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
              </motion.div>
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
