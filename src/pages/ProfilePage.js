import React, { useState } from "react";
import ProfilePosts from "../components/ProfilePosts";

function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("posts");

  return (
    <div className="lg:max-w-[600px] w-full mt-10">
      <div className="flex flex-col">
        {/* Profile pic and stats */}
        <div className="flex flex-row items-center">
          <div className="rounded-full h-36 w-36 border-2 border-gray-400"></div>
          <div className="flex flex-col ml-20">
            <div className="text-gray-600 text-2xl">Rohan Shah</div>
            <div className="flex flex-row mt-4 gap-4">
              <div className="text-gray-400 text-xl">Posts: 511</div>
              <div className="text-gray-400 text-xl">Posts: 511</div>
              <div className="text-gray-400 text-xl">Posts: 511</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-row justify-center w-full mt-14 border-t-2 border-gray-200 px-6">
          <div
            className="px-14 py-4 text-gray-600 cursor-pointer"
            onClick={() => setSelectedTab("posts")}
          >
            Posts
          </div>
          <div
            className="px-14 py-4 text-gray-600 cursor-pointer"
            onClick={() => setSelectedTab("followers")}
          >
            Followers
          </div>
          <div
            className="px-14 py-4 text-gray-600 cursor-pointer"
            onClick={() => setSelectedTab("following")}
          >
            Following
          </div>
        </div>

        {/* Tab content */}
        {selectedTab === "posts" && <ProfilePosts />}
        {selectedTab === "followers" && <div>Followers</div>}
        {selectedTab === "following" && <div>Following</div>}
      </div>
    </div>
  );
}

export default ProfilePage;
