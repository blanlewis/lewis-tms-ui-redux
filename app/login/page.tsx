"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            isLogin(
              loginId: "${loginId}"
              password: "${password}"
            )
          }
        `,
      }),
    });

    const data = await response.json();

    console.log("Login response:", data);
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Login ID"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}