import "./LeftPanel.css";
import { BsSearch } from "react-icons/bs";

const LeftPanel = () => {
  const count = [1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1];
  return (
    <div className="left_panel">
      <h2>Rooms</h2>
      <div className="search_contain">
        <BsSearch style={{color:"grey"}}></BsSearch>
        <input type="text" className="room_search_bar" />
      </div>
      <div className="rooms_contain scrollbar" id="style-1">
        {count.map((each,index) => {
          return (
            <>
            <div className="room_card">
              <img
                src="https://cdna.artstation.com/p/assets/images/images/036/947/774/smaller_square/ismael-fofana-the-legend-of-zeldaa-breath-of-the-wild-game-poster-design.jpg?1619051673"
                alt=""
                className="room_icon"
              />
              <h3 className="room_title">Zelda</h3>
            </div>
            {/* {index<count.length-1?<hr/>:null} */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default LeftPanel;
