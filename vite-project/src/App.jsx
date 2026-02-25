import { useState } from "react";
import "./App.css";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage("main");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  return (
    <div className="app-container">
      {page === "main" ? (
        <Main user={user} onLogout={handleLogout} />
      ) : page === "login" ? (
        <Login
          onSignupClick={() => setPage("register")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Register onLoginClick={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
