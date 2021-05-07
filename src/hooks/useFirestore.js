import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
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
  }, [collection]);
  return { data };
};

export default useFirestore;
