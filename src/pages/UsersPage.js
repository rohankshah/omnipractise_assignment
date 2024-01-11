import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../actions/user-actions";
import UserCard from "../components/UserCard";

function UsersPage() {
  const allFetchedUsers = useSelector((state) => state && state.allUsers);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    console.log("get all users");
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    if (allFetchedUsers.length > 0) {
      setAllUsers(allFetchedUsers);
      console.log(allFetchedUsers);
    }
  }, [allFetchedUsers]);

  return (
    <div className="lg:max-w-[600px] w-full mt-10">
      {allUsers.length > 0 ? (
        allUsers.map((user) => {
          return <UserCard key={user.uid} userName={user.name} />;
        })
      ) : (
        <div>No other users</div>
      )}
    </div>
  );
}

export default UsersPage;
