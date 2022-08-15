import "./LeftPanel.css";
import { BsSearch } from "react-icons/bs";
import useDatabase from "../../Hooks/useDatabase";
import { useEffect, useState } from "react";
import useRoomContext from "../../Hooks/useRoomContext";
import { IoIosAdd } from "react-icons/io";
import NewRoom from "../NewRoom/NewRoom";
import useScreenContext from "../../Hooks/useScreenContest";
import { AnimatePresence, motion } from "framer-motion";

const LeftPanel = ({ setShowChat, showChat }) => {
  const [sort, setSort] = useState();
  const { fetchRooms, RoomsList, loading } = useDatabase({ sort });
  const { setCurrentRoom, notifications } = useRoomContext();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const { size } = useScreenContext();

  useEffect(() => {
    fetchRooms();
  }, [notifications]);

  // useEffect(()=>{
  //   // RoomsList && setRooms([...RoomsList.sort((a, b) => b.priority - a.priority)]);
  //   console.log("sorting");
  //   RoomsList && console.log([...RoomsList].sort((a, b) => b.priority - a.priority));
  // },[RoomsList,notifications])

  // useEffect(()=>{
  //   console.log(Rooms);
  // },[Rooms])

  // useEffect(() => {
  //   if (RoomsList && RoomsList.length>0) {
  //     let dataArray = RoomsList;
  //     let sorted = [...dataArray.sort((a, b) => b.priority - a.priority)]
  //     console.log(sorted);
  //     // setRoomsList()
  //   }
  // }, [notifications,RoomsList])

  // // useEffect(()=>{
  // //   console.log(RoomsList);
  // // },[RoomsList])

  return (
    <div className={showChat ? "left_panel hide" : "left_panel"}>

      {showAddRoom && <NewRoom setShowAddRoom={setShowAddRoom} />}

      <h2>Rooms</h2>
      <div className="left_bar">
        <div className="search_contain">
          <BsSearch style={{ color: "grey" }}></BsSearch>
          <input
            type="text"
            className="room_search_bar"
            onChange={(e) => {
              setSort(e.target.value.trim());
            }}
          />
        </div>
        <button
          className="add_room_btn"
          onClick={() => {
            setShowAddRoom(true);
          }}
        >
          <IoIosAdd />
        </button>
      </div>
      <div className="rooms_contain scrollbar" id="style-1">
        {!loading &&
          RoomsList &&
          RoomsList.map((each, index) => {
            return (
              <div
                className="room_card"
                key={each.roomid}
                onClick={() => {
                  setCurrentRoom(each);
                  if (size[1] < 750) {
                    setShowChat(true);
                  }
                }}
              >
                <img src={each.image} className="room_icon" />
                <h3 className="room_title">{each.name}</h3>
                {
                  notifications.includes(each.roomid) && <div className="notif_dot"></div>
                }
              </div>
            );
          })}
        {loading && (
          <div className="loader">
            <lottie-player
              src="https://assets7.lottiefiles.com/private_files/lf30_fup2uejx.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
        {!loading && RoomsList && RoomsList.length == 0 && (
          <div className="loader">
            <lottie-player
              src="https://assets9.lottiefiles.com/private_files/lf30_gctc76jz.json"
              background="transparent"
              speed="1"
              style={{ width: "200px", height: "200px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
