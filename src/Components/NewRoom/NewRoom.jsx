import "./NewRoom.css";
import { BsFillCloudUploadFill } from "react-icons/bs";

const NewRoom = ({setShowAddRoom}) => {
    const handlePropagation = (e)=>{
        e.stopPropagation();
    }
  return (
    <div className="NewRoom" onClick={()=>{setShowAddRoom(false)}}>
      <div className="card" onClick={(e)=>{handlePropagation(e)}}>
        <div className="room_anim">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_2cghrrpi.json"
            style={{ width: "80%" }}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="add_room_form">
          <h3 className="card_title">Room Details</h3>
          <form>
            <p>Room Name</p>
            <input type="text" className="room_name_inp" />
            <p>Upload Profile Picture</p>
            <div className="file_pick_contain">
                <BsFillCloudUploadFill/>
            </div>
            <button className="room_submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
