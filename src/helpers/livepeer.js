import axios from "axios";
import { db } from "../helpers/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

async function fetchData(APIkey, id) {
  await axios
    .post(
      "https://livepeer.com/api/stream",
      {
        name: "test_stream",
        profiles: [
          {
            name: "720p",
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: "480p",
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: "360p",
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      },
      {
      withCredentials: false,
      },
      {
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${APIkey}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.streamKey);
      localStorage.setItem("streamKey", response.data.streamKey);
      localStorage.setItem("playbackId", response.data.playbackId);
      const q = query(collection(db, "data"), where("id", "==", id));
      const docGet = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doci) => {
          console.log(doc.id);
          const docRef = doc(db, "data", doci.id);
          updateDoc(docRef, {
            playbackId: response.data.playbackId,
          }).then(() => {
            console.log("Updated");
          });
        });
      };
      docGet();

      //console.log('Set at local Storage')
    });
}
async function request(APIkey) {
  await axios
    .post("https://livepeer.com/api/asset/request-upload", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${APIkey}`,
      },
    })
    .then((response) => {
      console.log(response);
    });
}
export { fetchData, request };
