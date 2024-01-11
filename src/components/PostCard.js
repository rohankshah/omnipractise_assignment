import React, { useState } from "react";
import moment from "moment";

function PostCard(props) {
  return (
    <>
      {props.posts.map((post) => {
        return (
          <div
            key={post.postId}
            className="relative flex flex-row w-full justify-between py-4 shadow-md px-6 rounded-md mb-6"
          >
            <div className="rounded-full h-14 w-14 border-2 border-gray-400"></div>
            <div className="flex flex-col w-[86%]">
              <div className="flex flex-row justify-between items-center">
                <div className="text-xl text-gray-600">{post.name}</div>
                <div>
                  {moment(moment.unix(post.timestamp.seconds)).fromNow()}
                </div>
              </div>
              <div className="text-gray-600 mt-2">{post.postData}</div>
            </div>
            <div className="absolute h-10 w-5 bg-pink-600 rounded-l-full right-[-3.5px] top-8"></div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard;
