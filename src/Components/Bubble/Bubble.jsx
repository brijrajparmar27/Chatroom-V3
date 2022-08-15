import useAuthContext from "../../Hooks/useAuthContext";
import "./Bubble.css";
import firebase from "firebase";
import "firebase/firestore";
import dpplaceholder from "../../assets/images/avatar.svg";
import {motion} from "framer-motion";

const Bubble = ({ each }) => {

  const { user } = useAuthContext();

  const getTime = ({ minuites }) => {
    let time = new firebase.firestore.Timestamp(
      each.timestamp.seconds,
      each.timestamp.nanoseconds
    ).toDate();
    if (minuites) return time.getMinutes().toString();
    return time.getHours().toString();
  };

  let hours = getTime({minuites:false});
  let mins = getTime({minuites:true});

  const msgVariants = {
    hide:{
      y:"100%"
    },
    show:{
      y:0
    }
  }

  return (
    <>
      {user && (
        <div
          className={
            each.uid == user.uid ? "msg_contain right" : "msg_contain left"
          }
          key={each.id}
        >
          {each.uid !== user.uid && (
            <div className="dp_contain">
              <img src={each.senderImg?each.senderImg:dpplaceholder} className="chat_msg_dp" />
            </div>
          )}
          <motion.div className="msg" variants={msgVariants} initial='hide' animate='show'>
            {each.uid !== user.uid && (
              <p className="sender_name">{each.displayName}</p>
            )}
            {
              each.image !== "" && <img src={each.image} style={{borderRadius:"10px",maxWidth:"250px"}}/>
            }
            <p>{each.text}</p>
            <p className="time">
              {parseInt(hours) % 12 ==0?"01":parseInt(hours) % 12 }:{parseInt(mins) < 10 ? "0" + mins : mins} {hours>12?"PM":"AM"}
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};
export default Bubble;
