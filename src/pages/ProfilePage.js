import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import ProfilePosts from "../components/ProfilePosts";
import ProfileFollowers from "../components/ProfileFollowers";
import ProfileFollowing from "../components/ProfileFollowing";
import app from "../firebase";

function ProfilePage() {
  const authObj = useSelector((state) => state && state.authObj);
  const userFollowing = useSelector((state) => state && state.userFollowing);

  const [selectedTab, setSelectedTab] = useState("posts");
  const [postObjs, setPostObjs] = useState([]);
  const [userFollowCount, setUserFollowCount] = useState(0);
  const [userFollowerArr, setUserFollowerArr] = useState([]);

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
      setPostObjs(currentPosts);
      let followCount = 0;
      const followerArr = [];
      const userQuerySnapshot = await getDocs(collection(db, "users"));
      userQuerySnapshot.forEach((doc) => {
        const eleUserFollowList = doc.data().userFollowing || [];
        if (
          doc.data().uid !== authObj.uid &&
          eleUserFollowList.includes(authObj.uid)
        ) {
          followCount += 1;
          followerArr.push({ ...doc.data(), uid: doc.id });
        }
      });
      console.log(followerArr);
      setUserFollowCount(followCount);
      setUserFollowerArr(followerArr);
    }
    getUserPosts();
  }, [authObj]);

  return (
    <div className="lg:max-w-[600px] w-full mt-10">
      <div className="flex flex-col">
        {/* Profile pic and stats */}
        <div className="flex flex-row items-center">
          <div className="rounded-full h-36 w-36 border-2 border-gray-400"></div>
          <div className="flex flex-col ml-20">
            <div className="text-gray-600 text-2xl">
              {authObj?.displayName && authObj.displayName}
            </div>
            <div className="flex flex-row mt-4 gap-4">
              <div className="text-gray-400 text-xl">
                Posts: {postObjs.length > 0 && postObjs.length}
              </div>
              <div className="text-gray-400 text-xl">
                Followers: {userFollowCount}
              </div>
              <div className="text-gray-400 text-xl">
                Following: {userFollowing.length > 0 ? userFollowing.length : 0}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-row justify-center w-full mt-14 border-t-2 border-gray-200 px-6">
          <div
            className={
              selectedTab === "posts"
                ? "px-14 py-4 text-gray-600 cursor-pointer font-bold"
                : "px-14 py-4 text-gray-600 cursor-pointer"
            }
            onClick={() => setSelectedTab("posts")}
          >
            Posts
          </div>
          <div
            className={
              selectedTab === "followers"
                ? "px-14 py-4 text-gray-600 cursor-pointer font-bold"
                : "px-14 py-4 text-gray-600 cursor-pointer"
            }
            onClick={() => setSelectedTab("followers")}
          >
            Followers
          </div>
          <div
            className={
              selectedTab === "following"
                ? "px-14 py-4 text-gray-600 cursor-pointer font-bold"
                : "px-14 py-4 text-gray-600 cursor-pointer"
            }
            onClick={() => setSelectedTab("following")}
          >
            Following
          </div>
        </div>

        {/* Tab content */}
        {selectedTab === "posts" && <ProfilePosts posts={postObjs} />}
        {selectedTab === "followers" && (
          <ProfileFollowers followers={userFollowerArr} />
        )}
        {selectedTab === "following" && <ProfileFollowing />}
      </div>
    </div>
  );
}

export default ProfilePage;
