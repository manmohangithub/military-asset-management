import { useState } from "react";
import API from "../api";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}