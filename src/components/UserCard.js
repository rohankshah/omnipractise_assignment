import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { followOtherUser, unfollowOtherUser } from "../actions/user-actions";

function UserCard(props) {
  const dispatch = useDispatch();

  function handleFollowUser(followUid) {
    console.log("handle follow");
    dispatch(followOtherUser(followUid));
  }

  function handleUnfollowUser(followUid) {
    dispatch(unfollowOtherUser(followUid));
  }

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-8 border-b-2 border-gray-200">
      <div className="flex flex-row items-center">
        <div className="rounded-full h-20 w-20 border-2 border-gray-400"></div>
        <div className="ml-8 flex flex-col">
          <div className="mb-2 text-gray-500 text-xl">{props.userName}</div>
          <div className="text-gray-400 text-sm">
            Following: {props.userFollowingCount}
          </div>
        </div>
      </div>
      {props.toggleFollowButton ? (
        <div
          className="rounded px-6 py-2 w-fit text-gray-600 cursor-pointer"
          onClick={() => handleUnfollowUser(props.uid)}
        >
          Following
        </div>
      ) : (
        <div
          className="rounded px-6 py-2 w-fit bg-pink-600 text-white cursor-pointer"
          onClick={() => handleFollowUser(props.uid)}
        >
          Follow
        </div>
      )}
    </div>
  );
}

export default UserCard;
