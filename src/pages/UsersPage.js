import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../actions/user-actions";
import UserCard from "../components/UserCard";

function UsersPage() {
  const allFetchedUsers = useSelector((state) => state && state.allUsers);
  const userFollowing = useSelector((state) => state && state.userFollowing);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [currUserFollowing, setCurrUserFollowing] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allFetchedUsers.length > 0) {
      setAllUsers(allFetchedUsers);
      console.log(allFetchedUsers);
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
