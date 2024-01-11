import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function ProfileFollowing(props) {
  const allFetchedUsers = useSelector((state) => state && state.allUsers);
  const userFollowing = useSelector((state) => state && state.userFollowing);
  const [currUserFollowing, setCurrUserFollowing] = useState([]);

  useEffect(() => {
    if (allFetchedUsers.length > 0) {
      console.log(allFetchedUsers);
      setCurrUserFollowing(
        allFetchedUsers.filter((ele) => userFollowing.includes(ele.uid))
      );
    }
  }, [allFetchedUsers, userFollowing]);

  return (
    <>
      {userFollowing.length > 0 ? (
        <>
          {currUserFollowing.map((user) => {
            return (
              <UserCard
                key={user.uid}
                userName={user.name}
                uid={user.uid}
                userFollowingCount={user.userFollowing.length}
                toggleFollowButton={
                  userFollowing.includes(user.uid) ? true : false
                }
              />
            );
          })}
        </>
      ) : (
        <div className="flex justify-center items-center mt-14 text-xl text-gray-400">
          Following no users
        </div>
      )}
    </>
  );
}

export default ProfileFollowing;
