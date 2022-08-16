import { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import RightPanel from "../../Components/RightPanel/RightPanel";
import useNotifReciever from "../../Hooks/useNotifReciever";
import { motion } from "framer-motion";

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

  const pageVariant = {
    hide: {
      x: "-100vw",
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    },
    show: {
      x: 0,
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    },
    exit: {
      x: "-100vw",
      transition: {
        type: "spring", duration: 0.5, ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div className="home"
      variants={pageVariant} initial='hide' animate='show'
      exit='exit'>

      <Header user={user} />

      <LeftPanel showChat={showChat} setShowChat={setShowChat} />

      <RightPanel showChat={showChat} setShowChat={setShowChat} />

    </motion.div>
  );
};
export default Home;
