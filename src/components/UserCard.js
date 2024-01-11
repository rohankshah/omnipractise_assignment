import React from "react";

function UserCard(props) {
  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-8 border-b-2 border-gray-200">
      <div className="flex flex-row items-center">
        <div
          className="rounded-full h-20 w-20 border-2 border-gray-400"
          //   alt="profile_pic"
        ></div>
        <div className="ml-8 flex flex-col">
          <div className="mb-2 text-gray-500 text-xl">{props.userName}</div>
          <div className="text-gray-400 text-sm">Following: 200</div>
        </div>
      </div>
      <div className="rounded px-6 py-2 w-fit bg-pink-600 text-white cursor-pointer">
        Follow
      </div>
    </div>
  );
}

export default UserCard;
