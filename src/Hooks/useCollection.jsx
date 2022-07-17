import { useEffect, useState } from "react"
import { firestore } from "../Firebase/config"

const useCollection = (roomid)=>{
    const [chats,setChats] = useState();

    useEffect(()=>{
        const unsub = firestore.collection("chats").where("roomid","==",roomid).orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
            let docs=[];
            snapshot.docs.forEach((each)=>{
                console.log(each.data());
                docs.push({...each.data(),id:each.id});
            })
            setChats(docs);
        })
        return ()=>unsub();
    },[roomid])

    const Send = async (newDoc) => {
        try {
          const ref = firestore.collection("chats");
          await ref.doc().set(newDoc);
        } catch (e) {
          console.log(e);
        }
      };

    return {chats,Send}
}

export default useCollection