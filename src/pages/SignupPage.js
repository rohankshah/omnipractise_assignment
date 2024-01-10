import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../actions/login-signup-actions";

function SignupPage() {
  const currUser = useSelector((state) => state && state);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("signup");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userConfirmPass, setUserConfirmPass] = useState("");
  const [userEmailLogin, setUserEmailLogin] = useState("");
  const [userPassLogin, setUserPassLogin] = useState("");

  function createUserAccount() {
    console.log(userName, userEmail, userPass, userConfirmPass);
    if (
      userName !== "" &&
      userEmail !== "" &&
      userPass !== "" &&
      userConfirmPass === userPass
    ) {
      dispatch(signUpUser(userEmail, userPass, userName));
    } else {
      console.log("invalid");
    }
  }

  useEffect(() => {
    console.log(currUser);
  }, [currUser]);

  return (
    <div className="min-h-screen flex justify-center max-w-[1200px] lg:min-w-[1200px]">
      <div className="flex flex-row justify-between w-full py-8">
        <div>
          {/* Name and Login button  */}
          <div className="mb-24">
            <h1 className="text-2xl font-bold text-pink-600 mb-10">TweetX</h1>
            <div
              className="border border-black rounded-2xl px-20 py-3 w-fit cursor-pointer"
              onClick={() => {
                currentTab === "signup"
                  ? setCurrentTab("login")
                  : setCurrentTab("signup");
              }}
            >
              {currentTab === "signup" ? "Login" : "Create Account"}
            </div>
          </div>

          {/* Signup Form  */}
          {currentTab === "signup" ? (
            <div className="w-96">
              <h1 className="text-3xl font-bold text-gray-600 mb-10">
                Create Account
              </h1>
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-6"
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-6"
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-6"
                type="password"
                placeholder="Password"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              />
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-6"
                type="password"
                placeholder="Confirm Password"
                value={userConfirmPass}
                onChange={(e) => setUserConfirmPass(e.target.value)}
              />
              <div className="flex flex-row justify-end items-center">
                <div
                  className="rounded px-6 py-2 w-fit bg-pink-600 text-white cursor-pointer"
                  onClick={() => createUserAccount()}
                >
                  Sign Up
                </div>
              </div>
            </div>
          ) : (
            <div className="w-96">
              <h1 className="text-3xl font-bold text-gray-600 mb-10">Login</h1>
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-6"
                type="text"
                placeholder="Email"
                value={userEmailLogin}
                onChange={(e) => setUserEmailLogin(e.target.value)}
              />
              <input
                className="bg-gray-100 rounded-md w-full py-4 px-5 placeholder-gray-400 focus:outline-none mb-10"
                type="password"
                placeholder="Password"
                value={userPassLogin}
                onChange={(e) => setUserPassLogin(e.target.value)}
              />
              <div className="flex flex-row justify-between items-center">
                <span>Forgot Password?</span>
                <div className="rounded px-6 py-2 w-fit bg-pink-600 text-white cursor-pointer">
                  Login
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="bg-cover w-1/2 h-2/3 bg-center max-w-[60%] mt-11"
          style={{ backgroundImage: 'url("/joyride.svg")' }}
        >
          <p className="text-white">Right</p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
