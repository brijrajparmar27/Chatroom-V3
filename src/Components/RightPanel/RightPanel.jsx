import "./RightPanel.css";
import { AiOutlinePaperClip,AiOutlineSend } from "react-icons/ai";

const RightPanel = () => {
  return <div className="right_panel">
    <div className="chat_box">
        <div className="chat_header">
            <h2>Zelda</h2>
        </div>
        <div className="chats_contain">

        </div>
        <div className="input_bar_contain">
          <div className="input_bar_box">
            <form>
              <input type="text" placeholder="Write a message..." className="msg_textbox"/>
              <div className="file_selector_btn"><AiOutlinePaperClip style={{fontSize:"26px"}}></AiOutlinePaperClip></div>
              <button type="submit" className="msg_submit_btn"><AiOutlineSend style={{fontSize:"22px"}}></AiOutlineSend></button>
            </form>
          </div>
        </div>
    </div>
  </div>;
};

export default RightPanel;
