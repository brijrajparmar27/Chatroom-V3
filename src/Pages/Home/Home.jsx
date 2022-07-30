import { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import RightPanel from "../../Components/RightPanel/RightPanel";
import useScreenContext from "../../Hooks/useScreenContest";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {size,setSize} = useScreenContext();
  const [showChat, setShowChat] = useState(false);

  console.log(size);

  useEffect(() => {
    !user && navigate("/authpage");
  }, [user]);

  return (
    <div className="home">
      <Header user={user} />

      <LeftPanel  showChat={showChat} setShowChat={setShowChat}/>

      <RightPanel  showChat={showChat} setShowChat={setShowChat}/>
    </div>
  );
};
export default Home;
