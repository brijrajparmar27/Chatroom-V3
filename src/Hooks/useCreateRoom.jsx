import { firestore } from "../Firebase/config";

const useCreateRoom = ()=>{
    const createRoom = async (newDoc)=>{
        try {
            const ref = firestore.collection("rooms");
            await ref.doc().set(newDoc);
          } catch (e) {
            console.log(e);
          }
    }
    return {createRoom}
}
export default useCreateRoom;