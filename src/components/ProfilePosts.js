import React, { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import app from "../firebase";

import PostCard from "./PostCard";

function ProfilePosts() {
  const authObj = useSelector((state) => state && state.authObj);
  const [postObjs, setPostObjs] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const currentPosts = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === authObj.uid) {
          currentPosts.push({ ...doc.data(), postId: doc.id });
        }
      });
      currentPosts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
      console.log(currentPosts);
      setPostObjs(currentPosts);
    }
    getUserPosts();
  }, [authObj]);

  return (
    <div className="w-full">
      {postObjs.length > 0 ? <PostCard posts={postObjs} /> : <div></div>}
    </div>
  );
}

export default ProfilePosts;
