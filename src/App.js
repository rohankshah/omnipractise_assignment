import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route
          path="/user"
          element={isLogin ? <div>Logged in</div> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
