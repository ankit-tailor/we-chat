import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useLoadChat = (collection, id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsub = projectFirestore
      .collection("messages")
      .doc(id)
      .collection(collection)
      .orderBy("createdAt")
      .onSnapshot((snap) => {
        let document = [];
        snap.forEach((_doc) => {
          document.push({
            ..._doc.data(),
            id: _doc.id,
          });
        });
        setData(document);
      });
    return () => unsub();
  }, [collection, id]);
  return { data };
};

export default useLoadChat;
