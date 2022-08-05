import { firestore, storage } from "../Firebase/config";
import useRoomContext from "./useRoomContext";

const useCreateRoom = () => {
  
  const { currentRoom } = useRoomContext();

  const createRoom = async (newDoc) => {
    try {
      const ref = firestore.collection("rooms");
      await ref.doc().set(newDoc);
    } catch (e) {
      console.log(e);
    }
  };

  const clearRoom = ()=>{
    var chat_del_query = firestore
      .collection("chats")
      .where("roomid", "==", currentRoom.roomid);
    chat_del_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  }

  const clearRoomDP = ()=>{
    var fileRef = storage.refFromURL(currentRoom.image);
    fileRef.delete();
  }

  const deleteRoom = () => {

    clearRoom()
    clearRoomDP();

    var room_del_query = firestore
      .collection("rooms")
      .doc(currentRoom.roomid)
      .delete();

  };

  return { createRoom, deleteRoom, clearRoom, clearRoomDP };
};
export default useCreateRoom;
