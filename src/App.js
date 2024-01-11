import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

function App() {
  const navigate = useNavigate();
  const authObj = useSelector((state) => state && state.authObj);

  useEffect(() => {
    if (Object.keys(authObj).length > 0) {
      navigate("/user");
    }
  }, [authObj, navigate]);

  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route
          path="/user"
          element={
            Object.keys(authObj).length > 0 ? (
              <div>Logged in</div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
