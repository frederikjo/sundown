"use client";
import React, { useState } from "react";
import { authenticateUser } from "../services/userServices";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("foo");
    e.preventDefault();
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        setError("");
        setUser(user);
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
