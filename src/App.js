import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state && state.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  if (!loggedIn) {
    return (
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/account/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route index element={<FeedPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
