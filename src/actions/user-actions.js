import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase";

function setAllUsers(allUsers) {
  return {
    type: "SET-ALL-USERS",
    payload: allUsers,
  };
}

function fetchAllUsers() {
  return async (dispatch, state) => {
    const currUserUid = state().authObj.uid;
    const db = await getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "users"));
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== currUserUid) {
        allUsers.push({ ...doc.data(), uid: doc.id });
      }
    });
    dispatch(setAllUsers(allUsers));
  };
}

export { fetchAllUsers };
