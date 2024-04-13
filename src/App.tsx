import { useState } from "react";
import "./App.css";
import SignIn from "./components/auth/SignIn.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {
  const token = localStorage.getItem("token");
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : showSignUp ? (
        <SignUp setIsLoggedIn={setIsLoggedIn} setShowSignUp={setShowSignUp} />
      ) : (
        <SignIn setIsLoggedIn={setIsLoggedIn} setShowSignUp={setShowSignUp} />
      )}
    </>
  );
}

export default App;
