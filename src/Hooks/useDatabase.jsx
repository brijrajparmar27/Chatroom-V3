import { useEffect ,useState} from "react";
import { firestore } from "../Firebase/config";

const useDatabase = ({ sort }) => {
  const [RoomsList, setRoomsList] = useState();
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (sort) {
      var dataArray = [];
      setLoading(true);
      firestore
        .collection("rooms").where("name",">=",sort).where("name","<=",sort+"\uf8ff")
        .get()
        .then((snapshot) => {
          dataArray = [];
          snapshot.forEach((datum) => {
            dataArray.push({ ...datum.data(), roomid: datum.id });
          });
          setRoomsList(dataArray);
          setLoading(false);
        });
    }else{ 
      fetchRooms();
    }

  }, [sort]);

  const fetchRooms = () => {
 
    let dataArray = [];
    setLoading(true);
    firestore
      .collection("rooms")
      .get()
      .then((snapshot) => {
        dataArray = [];
        snapshot.forEach((datum) => {
          dataArray.push({ ...datum.data(), roomid: datum.id });
        });
        setRoomsList(dataArray);
        setLoading(false);
      });

  };

  return { fetchRooms ,RoomsList, loading};
};

export default useDatabase;
