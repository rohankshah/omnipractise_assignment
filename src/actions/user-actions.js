import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import app from "../firebase";

function setAllUsers(allUsers) {
  return {
    type: "SET-ALL-USERS",
    payload: allUsers,
  };
}

function setUserFollowing(userFollowing) {
  return {
    type: "SET-USER-FOLLOWING",
    payload: userFollowing,
  };
}

function setUserFollow(followUid) {
  return {
    type: "SET-USER-FOLLOW",
    payload: followUid,
  };
}

function setUserUnfollow(followUid) {
  return {
    type: "SET-USER-UNFOLLOW",
    payload: followUid,
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

    const currUserRef = doc(db, "users", currUserUid);
    const currUserSnap = await getDoc(currUserRef);
    if (currUserSnap.exists()) {
      if (currUserSnap.data().userFollowing) {
        const userFollowing = currUserSnap.data().userFollowing;
        console.log("here");
        dispatch(setUserFollowing(userFollowing));
      }
    }
  };
}

function followOtherUser(followUid) {
  return (dispatch, state) => {
    const currUserUid = state().authObj.uid;
    const db = getFirestore(app);
    const userRef = doc(db, "users", currUserUid);
    updateDoc(userRef, {
      userFollowing: arrayUnion(followUid),
    })
      .then(() => dispatch(setUserFollow(followUid)))
      .catch((error) => console.log(error));
  };
}

function unfollowOtherUser(followUid) {
  return (dispatch, state) => {
    const currUserUid = state().authObj.uid;
    const db = getFirestore(app);
    const userRef = doc(db, "users", currUserUid);
    updateDoc(userRef, {
      userFollowing: arrayRemove(followUid),
    })
      .then(() => dispatch(setUserUnfollow(followUid)))
      .catch((error) => console.log(error));
  };
}

function publishNewPost(newPost) {
  return (dispatch, state) => {
    const currUserUid = state().authObj.uid;
    const currUserDisplayName = state().authObj.displayName;
    console.log(state().authObj);
    const db = getFirestore(app);
    addDoc(collection(db, "posts"), {
      name: currUserDisplayName,
      uid: currUserUid,
      postData: newPost,
      timestamp: Timestamp.fromDate(new Date()),
    })
      .then(() => console.log("Publish success"))
      .catch((error) => console.log(error));
  };
}

export {
  fetchAllUsers,
  followOtherUser,
  setUserFollow,
  unfollowOtherUser,
  publishNewPost,
};
