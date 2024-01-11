import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-center py-4 shadow-md">
      <div className="flex flex-row justify-between max-w-[1200px] lg:min-w-[1200px] md:w-full">
        <h1 className="text-2xl font-bold text-pink-600">TweetX</h1>
        <ul className="flex flex-row text-gray-400 text-xl gap-6">
          <li>
            <Link to="/">Feed</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <div className="cursor-pointer">Logout</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
