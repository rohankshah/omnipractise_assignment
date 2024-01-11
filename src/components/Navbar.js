import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutUser } from "../actions/login-signup-actions";

function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  function handleSignOut() {
    dispatch(signOutUser());
  }

  return (
    <div className="w-full flex items-center justify-center py-4 shadow-md">
      <div className="flex flex-row justify-between max-w-[1200px] lg:min-w-[1200px] md:w-full">
        <h1 className="text-2xl font-bold text-pink-600">TweetX</h1>
        <ul className="flex flex-row text-gray-400 text-xl gap-6">
          <li>
            <Link to="/" className={pathname === "/" ? "font-bold" : ""}>
              Feed
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={pathname === "/users" ? "font-bold" : ""}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={pathname === "/profile" ? "font-bold" : ""}
            >
              Profile
            </Link>
          </li>
          <li>
            <div className="cursor-pointer" onClick={() => handleSignOut()}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
