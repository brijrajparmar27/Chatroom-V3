import { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import RightPanel from "../../Components/RightPanel/RightPanel";
import useNotifReciever from "../../Hooks/useNotifReciever";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const { ObserveLastMsg, ObserveLastOpn } = useNotifReciever();

  useEffect(() => {
    !user && navigate("/authpage");
  }, [user]);

  useEffect(() => {
    ObserveLastMsg();
    ObserveLastOpn();
  }, [])

  return (
    <div className="home">
      <Header user={user} />

      <LeftPanel showChat={showChat} setShowChat={setShowChat} />

      <RightPanel showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};
export default Home;
