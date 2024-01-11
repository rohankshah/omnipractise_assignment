import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";

function UsersPage() {
  const allFetchedUsers = useSelector((state) => state && state.allUsers);
  const userFollowing = useSelector((state) => state && state.userFollowing);
  const [allUsers, setAllUsers] = useState([]);
  const [currUserFollowing, setCurrUserFollowing] = useState([]);

  useEffect(() => {
    if (allFetchedUsers.length > 0) {
      setAllUsers(allFetchedUsers);
    }
  }, [allFetchedUsers]);

  useEffect(() => {
    if (userFollowing.length > 0) {
      setCurrUserFollowing(userFollowing);
    }
  }, [userFollowing]);

  return (
    <div className="lg:max-w-[600px] w-full mt-10">
      {allUsers.length > 0 ? (
        allUsers.map((user) => {
          return (
            <UserCard
              key={user.uid}
              userName={user.name}
              uid={user.uid}
              userFollowingCount={user.userFollowing.length}
              toggleFollowButton={
                currUserFollowing.includes(user.uid) ? true : false
              }
            />
          );
        })
      ) : (
        <div>No other users</div>
      )}
    </div>
  );
}

export default UsersPage;
