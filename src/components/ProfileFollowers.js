import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function ProfileFollowers(props) {
  const userFollowing = useSelector((state) => state && state.userFollowing);

  useEffect(() => {
    console.log("userFollowing:", userFollowing);
    console.log("props.followers:", props.followers);
  }, [userFollowing, props.followers]);

  return (
    <>
      {props.followers.length > 0 && userFollowing ? (
        <>
          {props.followers.map((user) => {
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
          No one follows you
        </div>
      )}
    </>
  );
}

export default ProfileFollowers;
