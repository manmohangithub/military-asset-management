import React, { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Purchases from "./components/Purchases";
import Transfers from "./components/Transfers";
import Assignments from "./components/Assignments";
import Logs from "./components/Logs";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} logout={logout} />

      <div style={{ flex: 1, padding: 20 }}>
        <button onClick={logout}>Logout</button>

        {page === "dashboard" && <Dashboard />}
        {page === "purchases" && <Purchases />}
        {page === "transfers" && <Transfers />}
        {page === "assignments" && <Assignments />}
        {page === "logs" && <Logs />}
      </div>
    </div>
  );
}