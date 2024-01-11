import React from "react";

import PostCard from "./PostCard";

function ProfilePosts(props) {
  return (
    <div className="w-full">
      {props.posts?.length > 0 ? (
        <PostCard posts={props.posts} />
      ) : (
        <div className="flex justify-center items-center mt-14 text-xl text-gray-400">
          You have no posts
        </div>
      )}
    </div>
  );
}

export default ProfilePosts;
