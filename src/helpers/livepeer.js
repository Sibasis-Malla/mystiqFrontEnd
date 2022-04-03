import axios from "axios";
import { db } from "../helpers/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const fetchData = async(APIkey,id) => {
  try {
    const response = await axios.get(`https://streamapiv1.herokuapp.com/api/stream/${APIkey}`);
    if(response){
      console.log(response.data);
      // console.log("addshfhcuihf");
      const streamKey = response.data.streamKey;
    const playbackId = response.data.playbackId;
     localStorage.setItem("streamKey", streamKey);
      localStorage.setItem("playbackId", playbackId);
      const q = query(collection(db, "data"), where("id", "==", id));
      const docGet = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doci) => {
          console.log(doc.id);
          const docRef = doc(db, "data", doci.id);
          updateDoc(docRef, {
            playbackId: playbackId,
          }).then(() => {
            console.log("Updated");
          });
        });
      };
      docGet();
    }
  } catch (error) {
    console.log(error);
  }
  
}


async function request(APIkey) {
  await axios
    .post("https://livepeer.com/api/asset/request-upload", {
      headers: {
        "Access-Control-Allow-Origin":"https://livepeer.com/api/stream",
        "content-type": "application/json",
        "authorization": `Bearer ${APIkey}`,
      },
    })
    .then((response) => {
      console.log(response);
    });
}
export { fetchData, request };
