import { useEffect } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import RightPanel from "../../Components/RightPanel/RightPanel";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/authpage");
  }, [user]);

  return (
    <div className="home">
      <Header user={user} />

      <LeftPanel />

      <RightPanel/>
    </div>
  );
};
export default Home;
