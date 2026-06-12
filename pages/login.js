import { useState } from "react";
import api from "../lib/api";
import { saveToken } from "../lib/auth";

/**
 * Login page
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { email, password });

    saveToken(res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button className="btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}